const { db } = require('../config/firebase');
const { resolveAppId, getAppDetails, getReviews, normalizeData } = require('../services/playStoreService');
const { addJob } = require('../services/queueService');

const CACHE_DURATION_HOURS = 12;

// Helper to check cache freshness
const isCacheValid = (timestamp) => {
    if (!timestamp) return false;
    const now = new Date();
    const cacheDate = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const diffHours = (now - cacheDate) / (1000 * 60 * 60);
    return diffHours < CACHE_DURATION_HOURS;
};

exports.analyzeApp = async (req, res) => {
    try {
        const { term } = req.body;
        const userId = req.user.uid; // From auth middleware

        if (!term) return res.status(400).json({ error: 'Search term is required' });

        console.log(`[User: ${userId}] Analyzing: ${term}`);

        // 1. Resolve App ID
        const appId = await resolveAppId(term);


        // 2. Check Cache (user-specific)
        try {
            const userAppRef = db.collection('users').doc(userId).collection('apps').doc(appId);
            const appDoc = await userAppRef.get();

            if (appDoc.exists) {
                const data = appDoc.data();
                if (data.cacheInfo && isCacheValid(data.cacheInfo.lastUpdated)) {
                    console.log(`Cache hit for ${appId} (user: ${userId})`);
                    return res.json({
                        status: 'completed',
                        appId,
                        message: 'Data retrieved from cache'
                    });
                }
            }
        } catch (cacheError) {
            console.log(`Cache check failed for ${appId}, will scrape fresh data`);
        }

        // 3. Queue Job if not cached or expired
        // We don't want to wait for the scrape to finish in the request
        // But for simplicity in this demo, accessing the result immediately is often preferred by users.
        // However, the requirements asked for a background job mechanism.
        // let's start the job and return "pending" or "processing".
        // Or, since the user wants to "Visualize all the data", we can return 'processing' and let frontend poll.

        // To avoid concurrent scrapes for the same app, we could check a "status" field in Firestore,
        // but the queue limit helps.

        console.log(`Queueing scrape for ${appId} (user: ${userId})`);

        addJob(async () => {
            try {
                console.log(`📦 Background job started for ${appId} (user: ${userId})`);
                await performScrape(appId, userId);
                console.log(`📦 Background job completed for ${appId}`);
            } catch (err) {
                console.error(`📦 Background job FAILED for ${appId}:`, err.message);
                console.error(`   Stack:`, err.stack);
            }
        });

        return res.json({
            status: 'processing',
            appId,
            message: 'Analysis started'
        });

    } catch (error) {
        console.error('Analyze error:', error);
        return res.status(500).json({ error: error.message });
    }
};

exports.getAppResults = async (req, res) => {
    try {
        const { appId } = req.params;

        // Try to get metadata (handle NOT_FOUND for pending scrapes)
        const userId = req.user.uid; // From auth middleware
        let metaSnap, reviewsSnap;

        try {
            const metaRef = db.collection('users').doc(userId).collection('apps').doc(appId).collection('data').doc('metadata');
            metaSnap = await metaRef.get();
        } catch (firestoreError) {
            // If Firestore throws NOT_FOUND, data isn't ready yet
            return res.status(404).json({ error: 'Data not found or still processing' });
        }

        if (!metaSnap.exists) {
            return res.status(404).json({ error: 'Data not found or still processing' });
        }

        const metadata = metaSnap.data();

        // Get Reviews (also handle NOT_FOUND)
        try {
            const reviewsRef = db.collection('users').doc(userId).collection('apps').doc(appId).collection('data').doc('reviews');
            reviewsSnap = await reviewsRef.get();
        } catch (reviewsError) {
            // Reviews might not exist yet, return empty
            reviewsSnap = null;
        }

        const reviewsData = reviewsSnap?.exists ? reviewsSnap.data() : { list: [] };

        res.json({
            appId,
            metadata,
            reviews: reviewsData.list || []
        });

    } catch (error) {
        console.error('Get results error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Internal function to perform the scrape and save to DB
async function performScrape(appId, userId) {
    console.log(`Starting scrape for ${appId}...`);

    try {
        // Fetch
        console.log(`  → Fetching app details...`);
        const details = await getAppDetails(appId);
        console.log(`  ✓ App details fetched: ${details.title}`);

        console.log(`  → Fetching reviews...`);
        const reviewsList = await getReviews(appId);
        console.log(`  ✓ Reviews fetched: ${reviewsList.length} reviews`);

        // Normalize
        console.log(`  → Normalizing data...`);
        const { metadata, reviews } = normalizeData(details, reviewsList);
        console.log(`  ✓ Data normalized: ${reviews.length} unique reviews`);

        // Batch write to Firestore
        console.log(`  → Saving to Firestore...`);
        const batch = db.batch();
        const appRef = db.collection('users').doc(userId).collection('apps').doc(appId);
        const dataRef = appRef.collection('data');
        const configRef = appRef.collection('config');

        batch.set(dataRef.doc('metadata'), metadata);
        batch.set(dataRef.doc('reviews'), { list: reviews });
        batch.set(configRef.doc('cacheInfo'), {
            lastUpdated: new Date(),
            version: '1.0'
        });

        await batch.commit();
        console.log(`✅ Scrape completed and saved for ${appId}`);

    } catch (error) {
        console.error(`❌ Scrape failed for ${appId}:`, error.message);
        console.error(`   Stack:`, error.stack);
        throw error;
    }
}
