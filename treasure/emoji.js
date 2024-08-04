const emojis = [
    '🍎', '🍌', '🍒', '🍕', '🍔', '🍩', '🍭', '🍦',
    '🎈', '🎁', '🎉', '🏆', '💎', '💰', '🔑', '🦄'
];

export const generateEmoji = () => {
    const emojiChar = emojis[Math.floor(Math.random() * emojis.length)];
    const coins = Math.floor(Math.random() * 91) + 10; // Random number between 10 and 100
    return { emojiChar, coins };
};