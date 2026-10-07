// REFA-EXPRESS - comportamiento de la página
  // Menú móvil
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      navToggle.setAttribute('aria-expanded', nav.classList.contains('nav--open'));
    });

    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('nav--open'));
    });
  }

  // Año automático
  document.getElementById('year').textContent = new Date().getFullYear();

  // Botón volver arriba
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('back-to-top--visible', window.scrollY > 400);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Formulario: prepara el pedido en WhatsApp
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const vehiculo = document.getElementById('vehiculo').value.trim();
    const pieza = document.getElementById('pieza').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    const texto = `Hola REFA-EXPRESS, soy ${nombre}.
Teléfono: ${telefono}
Vehículo: ${vehiculo}
Refacción que necesito: ${pieza}
${mensaje ? `Mensaje: ${mensaje}` : ''}`;

    const whatsappURL = `https://wa.me/${document.getElementById('destino').value}?text=${encodeURIComponent(texto)}`;
    window.open(whatsappURL, '_blank', 'noopener');
  });
  // Resalta el enlace del menú según la sección visible
  const links = [...document.querySelectorAll('.nav__link')];
  const byId = Object.fromEntries(links.map(l => [l.getAttribute('href').slice(1), l]));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && byId[e.target.id]) {
        links.forEach(l => l.classList.remove('active'));
        byId[e.target.id].classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(byId).forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
