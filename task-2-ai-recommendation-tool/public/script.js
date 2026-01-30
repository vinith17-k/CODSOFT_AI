// State
let currentTab = 'dashboard';

// Init
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    loadDashboardStats();

    // Form Listener
    const form = document.getElementById('recommendationForm');
    if (form) {
        form.addEventListener('submit', handleRecommendationForm);
    }
});

// Navigation
function switchTab(tabId) {
    // Nav Items
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Sections
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));

    const target = document.getElementById(`view-${tabId}`);
    if (target) {
        target.classList.add('active');

        // Dynamic Title
        const titles = {
            'dashboard': 'Dashboard Overview',
            'recommendations': 'AI Recommendations',
            'insights': 'Analytics & Insights'
        };
        document.getElementById('page-title').innerText = titles[tabId];

        // Load data if needed
        if (tabId === 'insights') loadInsights();
    }
}

// Data Fetching
async function loadDashboardStats() {
    try {
        const res = await fetch('/stats');
        const data = await res.json();

        document.getElementById('stat-users').innerText = data.totalUsers.toLocaleString();
        document.getElementById('stat-items').innerText = data.totalItems.toLocaleString();
        document.getElementById('stat-recs').innerText = data.recommendationsGenerated.toLocaleString();
        document.getElementById('stat-match').innerText = data.avgMatchScore + '%';
    } catch (e) {
        console.error("Failed to load stats", e);
    }
}

async function handleRecommendationForm(e) {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const level = document.getElementById('level').value;
    const goal = document.getElementById('goal').value;

    const btn = e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';

    try {
        const res = await fetch('/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, level, goal })
        });

        const items = await res.json();
        renderRecommendations(items);

    } catch (e) {
        alert('Error generating recommendations');
    } finally {
        btn.innerHTML = originalText;
    }
}

function renderRecommendations(items) {
    const placeholder = document.getElementById('results-placeholder');
    const list = document.getElementById('results-list');

    placeholder.classList.add('hidden');
    list.classList.remove('hidden');
    list.innerHTML = '';

    if (items.length === 0) {
        list.innerHTML = '<p>No matches found.</p>';
        return;
    }

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'rec-card';
        el.innerHTML = `
            <span class="match-badge">${item.matchScore}% Match</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="tags">
                <span class="tag"><i class="fa-solid fa-tag"></i> ${item.category}</span>
                <span class="tag"><i class="fa-solid fa-layer-group"></i> ${item.level}</span>
                <span class="tag"><i class="fa-solid fa-bullseye"></i> ${item.goal}</span>
            </div>
        `;
        list.appendChild(el);
    });
}

// Charts
let catChart = null;
let trendChart = null;

async function loadInsights() {
    try {
        const res = await fetch('/insights');
        const data = await res.json();

        renderCategoryChart(data.categories, data.distribution);
        renderTrendChart(data.accuracyTrend);
    } catch (e) {
        console.error(e);
    }
}

function renderCategoryChart(labels, values) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    if (catChart) catChart.destroy();

    catChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

function renderTrendChart(dataPoints) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    if (trendChart) trendChart.destroy();

    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Matching Accuracy (%)',
                data: dataPoints,
                borderColor: '#4f46e5',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(79, 70, 229, 0.1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: false, min: 60, max: 100 }
            }
        }
    });
}

function updateDate() {
    const date = new Date();
    document.getElementById('date-display').innerText = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
