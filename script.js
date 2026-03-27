document.addEventListener('DOMContentLoaded', () => {
    // Referencias DOM
    const contenedor = document.querySelector('.contenedor-horizontal');
    const contenedorScroll = contenedor?.parentElement;
    const estela = document.getElementById('estela-puntero');
    const btnIzq = document.getElementById('nav-izq');
    const btnDer = document.getElementById('nav-der');

    // Validación
    if (!contenedor || !contenedorScroll) {
        console.error("Contenedor no encontrado");
        return;
    }

    // =========================
    // ESTELA DE PUNTERO (Optimizado con Transform)
    // =========================
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let estelaX = mouseX;
    let estelaY = mouseY;
    const factor = 0.15;

    // Solo animar si la estela existe (en móviles está oculta)
    if (estela && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animar() {
            estelaX += (mouseX - estelaX) * factor;
            estelaY += (mouseY - estelaY) * factor;

            // Usamos transform para mejor rendimiento (Hardware Acceleration)
            estela.style.transform = `translate(calc(${estelaX}px - 50%), calc(${estelaY}px - 50%))`;

            requestAnimationFrame(animar);
        }
        animar();
    }

    // =========================
    // SCROLL HORIZONTAL (Solo PC)
    // =========================
    function actualizarFlechas() {
        if (!contenedorScroll || window.innerWidth <= 768) return;

        const margen = 5;
        const maxScroll = contenedorScroll.scrollWidth - contenedorScroll.clientWidth;

        if (btnIzq) {
            btnIzq.style.opacity = contenedorScroll.scrollLeft <= 0 ? '0' : '1';
            btnIzq.style.pointerEvents = contenedorScroll.scrollLeft <= 0 ? 'none' : 'auto';
        }

        if (btnDer) {
            btnDer.style.opacity = contenedorScroll.scrollLeft >= maxScroll - margen ? '0' : '1';
            btnDer.style.pointerEvents = contenedorScroll.scrollLeft >= maxScroll - margen ? 'none' : 'auto';
        }
    }

    // Botones laterales
    btnIzq?.addEventListener('click', () => {
        contenedorScroll.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
    });

    btnDer?.addEventListener('click', () => {
        contenedorScroll.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
    });

    // Rueda del mouse
    contenedorScroll?.addEventListener('wheel', (e) => {
        // Solo aplica scroll horizontal si estamos en PC
        if (window.innerWidth > 768) {
            e.preventDefault();
            contenedorScroll.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Eventos de redimensionamiento y scroll
    contenedorScroll?.addEventListener('scroll', actualizarFlechas);
    window.addEventListener('resize', actualizarFlechas);

    // Setup inicial
    actualizarFlechas();

    // =========================
    // INTERSECTION OBSERVER (Animaciones de entrada)
    // =========================
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optimizacion: dejamos de observar cuando ya se animó
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.oculto').forEach(el => observer.observe(el));
    }
});