import { createSunburst, clearSunburst } from './sunburst.js';
import { generateEmoji } from './emoji.js';
import { updateStats, showStats } from './stats.js';

const treasureChest = document.getElementById('treasure-chest');
const emojiContainer = document.getElementById('emoji-container');
const winMessage = document.getElementById('win-message');
const emojiElement = document.getElementById('emoji');
const countdownElement = document.getElementById('countdown');
const statsButton = document.getElementById('stats-button');
const statsDialog = document.getElementById('stats-dialog');
const closeStatsButton = document.getElementById('close-stats');

const COOLDOWN_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

let lastClickTime = parseInt(localStorage.getItem('lastClickTime')) || 0;

const updateCooldown = () => {
    const currentTime = Date.now();
    const timeLeft = COOLDOWN_TIME - (currentTime - lastClickTime);

    if (timeLeft > 0) {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        setTimeout(updateCooldown, 1000);
    } else {
        countdownElement.textContent = 'Click to Open';
        treasureChest.style.pointerEvents = 'auto';
    }
};

const openTreasureChest = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < COOLDOWN_TIME) {
        alert('Please wait for the cooldown to finish before opening the chest again.');
        return;
    }

    treasureChest.classList.add('open');
    treasureChest.style.pointerEvents = 'none';
    lastClickTime = currentTime;
    localStorage.setItem('lastClickTime', lastClickTime);

    const { emojiChar, coins } = generateEmoji();
    createSunburst();

    // Clear previous content
    winMessage.textContent = '';
    emojiElement.textContent = '';
    
    // Set up the new emoji with initial scale
    emojiElement.textContent = emojiChar;
    emojiElement.style.transform = 'scale(0)';
    emojiContainer.style.display = 'block';

    // Trigger the animation
    setTimeout(() => {
        emojiElement.style.transform = 'scale(1)';
    }, 50);

    // Show the win message after the animation
    setTimeout(() => {
        winMessage.textContent = `You have won a ${emojiChar}`;
        updateStats(emojiChar, coins);
        showStats(); // Update the stats display immediately
    }, 550);

    // Hide the emoji and reset the chest
    setTimeout(() => {
        emojiContainer.style.display = 'none';
        clearSunburst();
        treasureChest.classList.remove('open');
        updateCooldown();
    }, 3000);
};

treasureChest.addEventListener('click', openTreasureChest);
statsButton.addEventListener('click', () => {
    showStats(); // Ensure stats are up-to-date when opening the dialog
    statsDialog.showModal();
});
closeStatsButton.addEventListener('click', () => statsDialog.close());

updateCooldown();
showStats(); // Initialize stats display when the page loads