export function registerContentBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('content-services', {
    label: 'Servicios',
    category: 'Contenido',
    content: `
      <section class="section">
        <div class="container">
          <h2>Servicios principales</h2>
          <div class="grid grid-3">
            <div class="card">
              <h3>Diseño web</h3>
              <p>Interfaces modernas y alineadas con tu marca.</p>
            </div>
            <div class="card">
              <h3>Marketing</h3>
              <p>Campañas que convierten con datos y creatividad.</p>
            </div>
            <div class="card">
              <h3>Soporte</h3>
              <p>Te acompañamos en cada actualización.</p>
            </div>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('content-testimonials', {
    label: 'Testimonios',
    category: 'Contenido',
    content: `
      <section class="section alt">
        <div class="container">
          <h2>Clientes felices</h2>
          <div class="grid grid-3">
            <div class="card">
              <p>“Resultados increíbles en pocas semanas.”</p>
              <strong>María López</strong>
            </div>
            <div class="card">
              <p>“El equipo entendió nuestro negocio.”</p>
              <strong>Carlos Pérez</strong>
            </div>
            <div class="card">
              <p>“La web ahora vende por sí sola.”</p>
              <strong>Lucía Gómez</strong>
            </div>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('content-pricing', {
    label: 'Precios',
    category: 'Contenido',
    content: `
      <section class="section">
        <div class="container">
          <h2>Planes flexibles</h2>
          <div class="grid grid-3">
            <div class="card">
              <h3>Starter</h3>
              <p class="price">$19/mes</p>
              <ul class="list">
                <li>Landing page</li>
                <li>Soporte básico</li>
              </ul>
            </div>
            <div class="card highlight">
              <h3>Pro</h3>
              <p class="price">$49/mes</p>
              <ul class="list">
                <li>Web completa</li>
                <li>SEO avanzado</li>
              </ul>
            </div>
            <div class="card">
              <h3>Enterprise</h3>
              <p class="price">$99/mes</p>
              <ul class="list">
                <li>Consultoría</li>
                <li>Automatización</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('content-faq', {
    label: 'FAQ',
    category: 'Contenido',
    content: `
      <section class="section alt">
        <div class="container">
          <h2>Preguntas frecuentes</h2>
          <div class="faq">
            <div class="card">
              <h4>¿Puedo editar mi web luego?</h4>
              <p>Si, puedes volver al editor cuando quieras.</p>
            </div>
            <div class="card">
              <h4>¿Incluye dominio?</h4>
              <p>Integramos tu dominio o te asesoramos con el registro.</p>
            </div>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('content-portfolio', {
    label: 'Portafolio',
    category: 'Contenido',
    content: `
      <section class="section">
        <div class="container">
          <h2>Proyectos recientes</h2>
          <div class="grid grid-3">
            <div class="card">
              <img src="https://picsum.photos/400/280" alt="Proyecto" />
              <h4>Hotel boutique</h4>
            </div>
            <div class="card">
              <img src="https://picsum.photos/401/280" alt="Proyecto" />
              <h4>Restaurante gourmet</h4>
            </div>
            <div class="card">
              <img src="https://picsum.photos/402/280" alt="Proyecto" />
              <h4>Startup SaaS</h4>
            </div>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('content-full-landing', {
    label: 'Landing completa',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero hero-center">
          <div class="container">
            <h1>Landing rápida para tu campaña</h1>
            <p>Captura leads con una propuesta clara y diseño atractivo.</p>
            <a class="btn" href="#">Quiero más clientes</a>
          </div>
        </section>
        <section class="section">
          <div class="container">
            <div class="grid grid-3">
              <div class="card">
                <h3>Velocidad</h3>
                <p>Cargamos rápido en cualquier dispositivo.</p>
              </div>
              <div class="card">
                <h3>Conversión</h3>
                <p>CTAs claros para convertir visitas en ventas.</p>
              </div>
              <div class="card">
                <h3>Soporte</h3>
                <p>Equipo listo para ayudarte 24/7.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    `
  });

  blockManager.add('content-full-services', {
    label: 'Página servicios',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero">
          <div class="container grid grid-2 align-center">
            <div>
              <h1>Servicios que impulsan tu negocio</h1>
              <p>Consultoría, diseño y marketing en un solo lugar.</p>
              <a class="btn" href="#">Agenda una llamada</a>
            </div>
            <img src="https://picsum.photos/640/480?services" alt="Servicios" />
          </div>
        </section>
        <section class="section">
          <div class="container">
            <div class="grid grid-3">
              <div class="card"><h3>Branding</h3><p>Identidad sólida para tu marca.</p></div>
              <div class="card"><h3>Web</h3><p>Diseño y desarrollo a medida.</p></div>
              <div class="card"><h3>Growth</h3><p>Estrategias que generan leads.</p></div>
            </div>
          </div>
        </section>
      </main>
    `
  });

  blockManager.add('content-full-store', {
    label: 'Página tienda simple',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero hero-center">
          <div class="container">
            <h1>Tienda simple para vender más</h1>
            <p>Presenta tus productos con claridad.</p>
            <a class="btn" href="#">Explorar</a>
          </div>
        </section>
        <section class="section">
          <div class="container grid grid-3">
            <div class="card"><img src="https://picsum.photos/400/300?store1" alt="" /><h3>Producto 1</h3><p class="price">$25</p></div>
            <div class="card"><img src="https://picsum.photos/400/300?store2" alt="" /><h3>Producto 2</h3><p class="price">$40</p></div>
            <div class="card"><img src="https://picsum.photos/400/300?store3" alt="" /><h3>Producto 3</h3><p class="price">$60</p></div>
          </div>
        </section>
      </main>
    `
  });

  blockManager.add('content-full-portfolio', {
    label: 'Página portafolio',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero">
          <div class="container">
            <h1>Portafolio creativo</h1>
            <p>Proyectos que hablan por sí solos.</p>
          </div>
        </section>
        <section class="section">
          <div class="container grid grid-3">
            <div class="card"><img src="https://picsum.photos/400/300?port1" alt="" /><h3>Marca 1</h3></div>
            <div class="card"><img src="https://picsum.photos/400/300?port2" alt="" /><h3>Marca 2</h3></div>
            <div class="card"><img src="https://picsum.photos/400/300?port3" alt="" /><h3>Marca 3</h3></div>
          </div>
        </section>
      </main>
    `
  });

  blockManager.add('content-full-restaurant', {
    label: 'Página restaurante',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero hero-center">
          <div class="container">
            <h1>Sabor auténtico</h1>
            <p>Reserva tu mesa y disfruta una experiencia única.</p>
            <a class="btn" href="#">Reservar</a>
          </div>
        </section>
        <section class="section">
          <div class="container grid grid-2">
            <div class="card"><h3>Menú del día</h3><p>Entradas, plato principal y postre.</p></div>
            <div class="card"><h3>Chef</h3><p>Conoce nuestra propuesta gastronómica.</p></div>
          </div>
        </section>
      </main>
    `
  });

  blockManager.add('content-full-realestate', {
    label: 'Página inmobiliaria',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero">
          <div class="container grid grid-2 align-center">
            <div>
              <h1>Encuentra tu próximo hogar</h1>
              <p>Propiedades seleccionadas para ti.</p>
              <a class="btn" href="#">Ver propiedades</a>
            </div>
            <img src="https://picsum.photos/640/480?home" alt="Casa" />
          </div>
        </section>
        <section class="section">
          <div class="container grid grid-3">
            <div class="card"><h3>Casa moderna</h3><p>3 habitaciones, 2 baños.</p></div>
            <div class="card"><h3>Departamento</h3><p>En el corazón de la ciudad.</p></div>
            <div class="card"><h3>Oficina</h3><p>Espacios corporativos flexibles.</p></div>
          </div>
        </section>
      </main>
    `
  });

  blockManager.add('content-full-consulting', {
    label: 'Página consultoría',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero hero-center">
          <div class="container">
            <h1>Consultoría estratégica</h1>
            <p>Decisiones basadas en datos para crecer con confianza.</p>
            <a class="btn" href="#">Solicitar diagnóstico</a>
          </div>
        </section>
        <section class="section alt">
          <div class="container grid grid-3">
            <div class="card"><h3>Diagnóstico</h3><p>Analizamos tu situación actual.</p></div>
            <div class="card"><h3>Plan de acción</h3><p>Definimos prioridades claras.</p></div>
            <div class="card"><h3>Acompañamiento</h3><p>Seguimiento continuo.</p></div>
          </div>
        </section>
      </main>
    `
  });

  blockManager.add('content-full-event', {
    label: 'Página evento',
    category: 'Contenido',
    content: `
      <main>
        <section class="hero hero-center">
          <div class="container">
            <span class="badge">Evento</span>
            <h1>Summit Orenses 2024</h1>
            <p>Conecta con expertos de tecnología y negocios.</p>
            <a class="btn" href="#">Comprar entrada</a>
          </div>
        </section>
        <section class="section">
          <div class="container grid grid-3">
            <div class="card"><h3>Speakers</h3><p>Líderes de la industria.</p></div>
            <div class="card"><h3>Agenda</h3><p>Talleres, charlas y networking.</p></div>
            <div class="card"><h3>Ubicación</h3><p>Centro de convenciones.</p></div>
          </div>
        </section>
      </main>
    `
  });
}
