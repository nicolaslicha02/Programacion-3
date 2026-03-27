document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // REFERENCIAS DOM
    // =========================
    const contenedor = document.querySelector('.contenedor-horizontal');
    const contenedorScroll = contenedor?.parentElement;
    const estela = document.getElementById('estela-puntero');
    const btnIzq = document.getElementById('nav-izq');
    const btnDer = document.getElementById('nav-der');

    // Validación básica
    if (!contenedor || !contenedorScroll) {
        console.error("Contenedor no encontrado");
        return;
    }

    // =========================
    // ESTELA DEL PUNTERO (Optimizada)
    // =========================
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let estelaX = mouseX;
    let estelaY = mouseY;

    const factor = 0.15;

    // Solo en desktop
    if (estela && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animarEstela() {
            estelaX += (mouseX - estelaX) * factor;
            estelaY += (mouseY - estelaY) * factor;

            // Mejor rendimiento (GPU)
            estela.style.transform = `translate(calc(${estelaX}px - 50%), calc(${estelaY}px - 50%))`;

            requestAnimationFrame(animarEstela);
        }

        animarEstela();
    }

    // =========================
    // SCROLL HORIZONTAL
    // =========================
    function actualizarFlechas() {
        if (window.innerWidth <= 768) return;

        const margen = 5;
        const maxScroll = contenedorScroll.scrollWidth - contenedorScroll.clientWidth;

        if (btnIzq) {
            const ocultar = contenedorScroll.scrollLeft <= 0;
            btnIzq.style.opacity = ocultar ? '0' : '1';
            btnIzq.style.pointerEvents = ocultar ? 'none' : 'auto';
        }

        if (btnDer) {
            const ocultar = contenedorScroll.scrollLeft >= maxScroll - margen;
            btnDer.style.opacity = ocultar ? '0' : '1';
            btnDer.style.pointerEvents = ocultar ? 'none' : 'auto';
        }
    }

    // Botones
    btnIzq?.addEventListener('click', () => {
        contenedorScroll.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    });

    btnDer?.addEventListener('click', () => {
        contenedorScroll.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    });

    // Scroll con rueda (solo desktop)
    contenedorScroll.addEventListener('wheel', (e) => {
        if (window.innerWidth > 768) {
            e.preventDefault();
            contenedorScroll.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Eventos
    contenedorScroll.addEventListener('scroll', actualizarFlechas);
    window.addEventListener('resize', actualizarFlechas);

    actualizarFlechas();

    // =========================
    // INTERSECTION OBSERVER
    // =========================
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // optimización
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.oculto').forEach(el => observer.observe(el));
    }
});
