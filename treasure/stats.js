const statsContent = document.getElementById('stats-content');

const getStats = () => {
    return JSON.parse(localStorage.getItem('treasureStats')) || { emojis: {}, totalCoins: 0 };
};

const saveStats = (stats) => {
    localStorage.setItem('treasureStats', JSON.stringify(stats));
};

export const updateStats = (emoji, coins) => {
    const stats = getStats();
    stats.emojis[emoji] = (stats.emojis[emoji] || 0) + 1;
    stats.totalCoins += coins;
    saveStats(stats);
};

export const showStats = () => {
    const stats = getStats();
    let content = `<p>Total Coins: ${stats.totalCoins}</p><h3>Emojis Collected:</h3>`;

    const sortedEmojis = Object.entries(stats.emojis).sort((a, b) => b[1] - a[1]);

    for (const [emoji, count] of sortedEmojis) {
        content += `<p>${emoji} ${count > 1 ? `(${count}x)` : ''}</p>`;
    }

    statsContent.innerHTML = content;
};

// Initialize stats display
showStats();