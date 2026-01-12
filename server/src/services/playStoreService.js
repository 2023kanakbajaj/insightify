const gplay = require('google-play-scraper').default || require('google-play-scraper');
const { queue } = require('./queueService');

/**
 * Extract App ID from a string (URL or Name)
 * If URL, extracts 'id' param.
 * If Name, searches Play Store and returns first result.
 */
async function resolveAppId(term) {
    term = term.trim();

    // Check if it's a full URL
    if (term.includes('play.google.com')) {
        try {
            const url = new URL(term);
            const id = url.searchParams.get('id');
            if (id) return id;
        } catch (e) {
            // invalid url, fall through to search
        }
    }

    // Check if it looks like a package name (com.example.app)
    const packageRegex = /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]*$/i;
    if (packageRegex.test(term)) {
        return term;
    }

    // Otherwise search
    try {
        const results = await queue.add(() => gplay.search({ term, num: 1 }));
        if (results && results.length > 0) {
            return results[0].appId;
        }
    } catch (error) {
        console.error('Search failed:', error);
        throw new Error('Failed to find app');
    }

    throw new Error('App not found');
}

/**
 * Fetch App Details (Metadata)
 */
async function getAppDetails(appId) {
    try {
        // Don't use queue here - it's already called from within a queued job
        return await gplay.app({ appId });
    } catch (error) {
        console.error(`Failed to fetch details for ${appId}:`, error);
        throw error;
    }
}

/**
 * Fetch Reviews
 * Limit to 300 reviews max (3 pages of 100 or similar configuration)
 */
async function getReviews(appId) {
    try {
        // Don't use queue here - it's already called from within a queued job
        const result = await gplay.reviews({
            appId,
            sort: gplay.sort.NEWEST,
            num: 300,
            lang: 'en',
            country: 'us'
        });

        // result is { data: [...], nextPaginationToken: ... }
        return result.data || [];
    } catch (error) {
        console.error(`Failed to fetch reviews for ${appId}:`, error);
        throw error;
    }
}

/**
 * Normalize and Clean Data
 */
function normalizeData(details, reviews) {
    // Normalize Metadata
    const metadata = {
        appId: details.appId,
        title: details.title,
        icon: details.icon,
        summary: details.summary,
        description: details.description,
        score: details.score,
        scoreText: details.scoreText, // e.g. "4.5"
        ratings: details.ratings,
        reviews: details.reviews,
        histogram: details.histogram,
        price: details.price,
        free: details.free,
        currency: details.currency,
        developer: details.developer,
        url: details.url,
        version: details.version || "unknown",
        updated: details.updated,
        genre: details.genre,
        installs: details.installs
    };

    // Normalize Reviews
    const cleanReviews = reviews
        .filter(r => r.text && r.text.trim().length > 0) // Remove empty
        .map(r => ({
            id: r.id,
            userName: r.userName,
            userImage: r.userImage,
            date: r.date, // already a string/date usually
            score: r.score,
            text: r.text.trim(),
            version: r.version || "unknown",
            thumbsUp: r.thumbsUp
        }));

    // Remove duplicates (by id)
    const uniqueReviews = Array.from(new Map(cleanReviews.map(item => [item.id, item])).values());

    return { metadata, reviews: uniqueReviews };
}

module.exports = {
    resolveAppId,
    getAppDetails,
    getReviews,
    normalizeData
};
