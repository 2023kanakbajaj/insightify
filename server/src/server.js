require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api.routes');
const scraperRoutes = require('./routes/scraperRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Routes
app.use('/api', scraperRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Insightify API is running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
