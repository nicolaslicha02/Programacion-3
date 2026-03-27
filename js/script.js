document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    // Referencias DOM
    const contenedor = document.querySelector('.contenedor-horizontal');
    const contenedorScroll = contenedor?.parentElement;
=======
    const contenedor = document.querySelector('.contenedor-horizontal');
>>>>>>> c116352eade56c2f4bd9d989ffc75c9f85aa681c
    const estela = document.getElementById('estela-puntero');
    const btnIzq = document.getElementById('nav-izq');
    const btnDer = document.getElementById('nav-der');

<<<<<<< HEAD
    // Validación
    if (!contenedor || !contenedorScroll) {
        console.error("Contenedor no encontrado");
        return;
    }

    // =========================
    // ESTELA DE PUNTERO (Optimizado con Transform)
    // =========================
=======
    // Validación principal
    if (!contenedor) return;

    // Control de estela
>>>>>>> c116352eade56c2f4bd9d989ffc75c9f85aa681c
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let estelaX = mouseX;
    let estelaY = mouseY;
<<<<<<< HEAD
    const factor = 0.15;

    // Solo animar si la estela existe (en móviles está oculta)
    if (estela && window.innerWidth > 768) {
=======
    const factorInterpolacion = 0.15;

    if (estela) {
>>>>>>> c116352eade56c2f4bd9d989ffc75c9f85aa681c
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

<<<<<<< HEAD
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
=======
        function animarEstela() {
            estelaX += (mouseX - estelaX) * factorInterpolacion;
            estelaY += (mouseY - estelaY) * factorInterpolacion;
            estela.style.left = estelaX + 'px';
            estela.style.top = estelaY + 'px';
            requestAnimationFrame(animarEstela);
        }
        animarEstela();
    }

    // Lógica para mostrar/ocultar flechas según la posición del scroll
    function gestionarVisibilidadFlechas() {
        const contenedorScroll = contenedor.parentElement;

        if (btnIzq) {
            if (contenedorScroll.scrollLeft <= 0) {
                btnIzq.style.opacity = '0';
                btnIzq.style.pointerEvents = 'none';
            } else {
                btnIzq.style.opacity = '1';
                btnIzq.style.pointerEvents = 'auto';
            }
        }

        if (btnDer) {
            const maxScrollLeft = contenedorScroll.scrollWidth - contenedorScroll.clientWidth;
            if (contenedorScroll.scrollLeft >= maxScrollLeft - 5) {
                btnDer.style.opacity = '0';
                btnDer.style.pointerEvents = 'none';
            } else {
                btnDer.style.opacity = '1';
                btnDer.style.pointerEvents = 'auto';
            }
        }
    }

    // Navegación por botones
    if (btnIzq) {
        btnIzq.addEventListener('click', () => {
            contenedor.parentElement.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
        });
    }

    if (btnDer) {
        btnDer.addEventListener('click', () => {
            contenedor.parentElement.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        });
    }

    // Eventos de scroll
    contenedor.parentElement.addEventListener('scroll', gestionarVisibilidadFlechas);
    window.addEventListener('resize', gestionarVisibilidadFlechas);

    window.addEventListener('wheel', (evento) => {
        evento.preventDefault();
        contenedor.parentElement.scrollLeft += evento.deltaY;
    }, { passive: false });

    // Inicializar estado de las flechas
    gestionarVisibilidadFlechas();

    // Intersection Observer para animaciones de entrada
    if ('IntersectionObserver' in window) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible') 
                }
            });
        }, {
            threshold: 0.15
        });

        const elementosOcultos = document.querySelectorAll('.oculto');
        elementosOcultos.forEach((elemento) => {
            observador.observe(elemento);
        });
>>>>>>> c116352eade56c2f4bd9d989ffc75c9f85aa681c
    }
});