// Helper function to create and append a style element
const createStyle = (css) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
};
// Helper function to create an emoji element
const createEmojiElement = (emoji, size, x, y) => {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.position = 'fixed';
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.fontSize = `${size}px`;
    element.style.userSelect = 'none';
    element.style.zIndex = '9999';
    return element;
};
// rainPoop function
export const rainPoop = (options = {}) => {
    const { emoji = '💩', duration = 5000, density = 200 } = options;
    const emojis = Array.isArray(emoji) ? emoji : [emoji];
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    const animate = () => {
        const size = Math.random() * 30 + 10;
        const x = Math.random() * window.innerWidth;
        const y = -size;
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const element = createEmojiElement(randomEmoji, size, x, y);
        container.appendChild(element);
        const animationDuration = Math.random() * 2 + 1;
        element.animate([
            { transform: 'translateY(0) rotate(0deg)' },
            {
                transform: `translateY(${window.innerHeight + size}px) rotate(${Math.random() * 360}deg)`,
            },
        ], {
            duration: animationDuration * 1000,
            easing: 'linear',
        }).onfinish = () => element.remove();
    };
    const interval = setInterval(animate, 1000 / (density / 5));
    setTimeout(() => {
        clearInterval(interval);
        setTimeout(() => container.remove(), 2000);
    }, duration);
};
// poopetti function
export const poopetti = (options = {}) => {
    // get window width and height
    const windowWidth = window?.innerWidth || 200;
    const windowHeight = window?.innerHeight || 200;
    const defaultRadius = 0.2 * Math.max(windowWidth, windowHeight);
    const { emoji = '💩', duration = 1500, density = 200, radius = defaultRadius, } = options;
    createStyle(`
    @keyframes shake {
      0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
      25% { transform: translate(-65%, -35%) rotate(-15deg); }
      50% { transform: translate(-35%, -65%) rotate(15deg); }
      75% { transform: translate(-65%, -65%) rotate(-15deg); }
    }
    @keyframes grow {
      0% { transform: translate(-50%, -50%) scale(1); }
      90% { transform: translate(-50%, -50%) opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(1.7); opacity: 1; }
    }
    @keyframes burst {
      0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(1) rotate(var(--rotation)); opacity: 1; }
    }
  `);
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.width = '0';
    container.style.height = '0';
    container.style.overflow = 'visible';
    container.style.zIndex = '9999';
    const mainEmoji = document.createElement('div');
    mainEmoji.textContent = emoji;
    mainEmoji.style.position = 'absolute';
    mainEmoji.style.top = '50%';
    mainEmoji.style.left = '50%';
    mainEmoji.style.fontSize = '50px';
    mainEmoji.style.animation = `shake ${duration}ms ease infinite, grow ${duration}ms ease forwards`;
    if (duration === 0) {
        mainEmoji.style.display = 'none';
    }
    container.appendChild(mainEmoji);
    document.body.appendChild(container);
    setTimeout(() => {
        mainEmoji.style.display = 'none';
        for (let i = 0; i < density; i++) {
            const burstEmoji = document.createElement('div');
            burstEmoji.textContent = emoji;
            burstEmoji.style.position = 'absolute';
            burstEmoji.style.top = '50%';
            burstEmoji.style.left = '50%';
            burstEmoji.style.fontSize = `${Math.random() * 20 + 5}px`;
            const angle = Math.random() * Math.PI * 2;
            const distance = radius + Math.random() * (radius * 1.5);
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            const rotation = Math.random() * 720 - 360;
            burstEmoji.style.setProperty('--tx', `${tx}px`);
            burstEmoji.style.setProperty('--ty', `${ty}px`);
            burstEmoji.style.setProperty('--rotation', `${rotation}deg`);
            burstEmoji.style.animation = `burst 800ms ease-out forwards`;
            container.appendChild(burstEmoji);
        }
        setTimeout(() => container.remove(), 1000);
    }, duration);
};
