const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

// Toggle menu when clicking the burger
burger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent click from bubbling to document

    nav.classList.toggle('nav-active');
    burger.classList.toggle('burger-active');
});

// Close the menu when clicking outside
document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('nav-active');
        burger.classList.remove('burger-active');
    }
});

// Prevent clicks inside the menu from closing it
nav.addEventListener('click', (e) => {
    e.stopPropagation();
});
