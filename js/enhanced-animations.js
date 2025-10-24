// enhanced-animations.js

// Smooth scrolling effect
const smoothScroll = (target) => {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
};

// Interactive effect on hover
const addHoverEffect = (element) => {
    const elem = document.querySelector(element);
    if (elem) {
        elem.addEventListener('mouseenter', () => {
            elem.style.transform = 'scale(1.05)';
            elem.style.transition = 'transform 0.3s ease';
        });
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'scale(1)';
        });
    }
};

// Initialize animations
const initAnimations = () => {
    addHoverEffect('.interactive-element'); // Example class
};

// Document ready
document.addEventListener('DOMContentLoaded', initAnimations);