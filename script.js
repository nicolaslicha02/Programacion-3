document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.querySelector('.contenedor-horizontal');
    const estela = document.getElementById('estela-puntero');
    const btnIzq = document.getElementById('nav-izq');
    const btnDer = document.getElementById('nav-der');

    // Validación principal
    if (!contenedor) return;

    // Control de estela
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let estelaX = mouseX;
    let estelaY = mouseY;
    const factorInterpolacion = 0.15;

    if (estela) {
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

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
    }
});