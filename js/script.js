document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // DOM REFERENCES
    // =========================
    const container = document.querySelector('.horizontal-container');
    const scrollContainer = container?.parentElement;
    const trail = document.getElementById('pointer-trail');
    const btnLeft = document.getElementById('nav-left');
    const btnRight = document.getElementById('nav-right');

    // Basic validation
    if (!container || !scrollContainer) {
        console.error("Container not found");
        return;
    }

    // =========================
    // POINTER TRAIL
    // =========================
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    const factor = 0.15;

    // Only on desktop
    if (trail && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            trailX += (mouseX - trailX) * factor;
            trailY += (mouseY - trailY) * factor;

            // Better performance (GPU)
            trail.style.transform = `translate(calc(${trailX}px - 50%), calc(${trailY}px - 50%))`;

            requestAnimationFrame(animateTrail);
        }

        animateTrail();
    }

    // =========================
    // HORIZONTAL SCROLL
    // =========================
    function updateArrows() {
        if (window.innerWidth <= 768) return;

        const margin = 5;
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (btnLeft) {
            const hide = scrollContainer.scrollLeft <= 0;
            btnLeft.style.opacity = hide ? '0' : '1';
            btnLeft.style.pointerEvents = hide ? 'none' : 'auto';
        }

        if (btnRight) {
            const hide = scrollContainer.scrollLeft >= maxScroll - margin;
            btnRight.style.opacity = hide ? '0' : '1';
            btnRight.style.pointerEvents = hide ? 'none' : 'auto';
        }
    }

    // Buttons
    btnLeft?.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    });

    btnRight?.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    });

    // Mouse wheel scroll (desktop only)
    scrollContainer.addEventListener('wheel', (e) => {
        if (window.innerWidth > 768) {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Events
    scrollContainer.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    updateArrows();

    // =========================
    // INTERSECTION OBSERVER
    // =========================
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // optimization
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
    }
});
