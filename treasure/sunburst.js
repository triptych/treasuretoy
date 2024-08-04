const canvas = document.getElementById('sunburst');
const ctx = canvas.getContext('2d');

export const createSunburst = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const outerRadius = canvas.width / 2;
    const innerRadius = outerRadius / 3;
    const rayCount = 12;

    ctx.save();
    ctx.translate(centerX, centerY);

    const gradient = ctx.createRadialGradient(0, 0, innerRadius, 0, 0, outerRadius);
    gradient.addColorStop(0, 'rgba(255, 215, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

    ctx.fillStyle = gradient;

    for (let i = 0; i < rayCount; i++) {
        ctx.rotate(Math.PI * 2 / rayCount);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(outerRadius, -outerRadius / 8);
        ctx.lineTo(outerRadius, outerRadius / 8);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
};

export const clearSunburst = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};