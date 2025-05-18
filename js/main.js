document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav ul');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
        } else {
            header.style.background = '#fff';
        }
    });

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}); 