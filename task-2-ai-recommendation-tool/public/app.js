document.getElementById('recommendationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const level = document.getElementById('level').value;
    const goal = document.getElementById('goal').value;

    const resultsArea = document.getElementById('results-area');
    const list = document.getElementById('recommendations-list');

    // Show loading state (optional, but good for UX)
    list.innerHTML = '<p>Loading recommendations...</p>';
    resultsArea.classList.remove('hidden');

    try {
        const response = await fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, level, goal })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const recommendations = await response.json();

        displayRecommendations(recommendations);
    } catch (error) {
        console.error('Error:', error);
        list.innerHTML = '<p style="color: red;">Something went wrong. Please try again.</p>';
    }
});

function displayRecommendations(items) {
    const list = document.getElementById('recommendations-list');
    list.innerHTML = '';

    if (items.length === 0) {
        list.innerHTML = '<p>No specific recommendations found for this combination. Try broader criteria.</p>';
        return;
    }

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="tags">
                <span class="tag">${item.category}</span>
                <span class="tag">${item.level}</span>
                <span class="tag">${item.goal}</span>
            </div>
        `;
        list.appendChild(card);
    });
}
