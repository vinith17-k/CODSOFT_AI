const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Helper to read data
const getData = () => {
    const dataPath = path.join(__dirname, 'data.json');
    const rawData = fs.readFileSync(dataPath);
    return JSON.parse(rawData);
};

// --- API Endpoints ---

// 1. GET /stats - Dashboard Metrics
app.get('/stats', (req, res) => {
    const recommendations = getData();
    // Mock metrics
    const stats = {
        totalUsers: 1245,
        totalItems: recommendations.length,
        recommendationsGenerated: 8502,
        avgMatchScore: 88 // percentage
    };
    res.json(stats);
});

// 2. GET /insights - Chart Data
app.get('/insights', (req, res) => {
    const recommendations = getData();

    // Calculate category distribution
    const categoryCount = {};
    recommendations.forEach(item => {
        categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });

    res.json({
        categories: Object.keys(categoryCount),
        distribution: Object.values(categoryCount),
        accuracyTrend: [75, 78, 80, 82, 85, 88, 89] // Mock trend data for last 7 days
    });
});

// 3. POST /recommend - Enhanced Logic
app.post('/recommend', (req, res) => {
    const { category, level, goal } = req.body;
    const allItems = getData();

    console.log("Recommend Request:", { category, level, goal });

    // Calculate Match Score for each item
    const scoredItems = allItems.map(item => {
        let score = 0;
        let maxScore = 3; // 3 criteria: category, level, goal

        if (item.category === category) score += 1;
        if (item.level === level) score += 1;
        if (item.goal === goal) score += 1;

        // Convert to percentage (approx)
        // Bonus for partial category match if we had subcategories, but keep simple for now.
        // Let's weight category higher? 
        // Simple weight: Category=40, Level=30, Goal=30

        let weightedScore = 0;
        if (item.category === category) weightedScore += 40;
        if (item.level === level) weightedScore += 30;
        if (item.goal === goal) weightedScore += 30;

        // Fuzziness: Randomize slightly to simulate "AI" variance
        const variance = Math.floor(Math.random() * 5);

        return {
            ...item,
            matchScore: Math.min(100, weightedScore + variance)
        };
    });

    // Filter and Sort
    // We want items with at least some relevance (e.g. > 0 score)
    const relevantItems = scoredItems
        .filter(item => item.matchScore > 0)
        .sort((a, b) => b.matchScore - a.matchScore);

    // Return top 5
    res.json(relevantItems.slice(0, 5));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
