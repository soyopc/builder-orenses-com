export function registerHeroBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('hero-split', {
    label: 'Hero split',
    category: 'Hero / Portada / CTA',
    content: `
      <section class="hero">
        <div class="container grid grid-2 align-center">
          <div>
            <span class="badge">Nuevo</span>
            <h1>Impulsa tu negocio con una web profesional</h1>
            <p>Diseños modernos, rápidos y optimizados para móviles.</p>
            <div class="hero-actions">
              <a class="btn" href="#">Comenzar</a>
              <a class="btn ghost" href="#">Ver demo</a>
            </div>
          </div>
          <div>
            <img src="https://picsum.photos/640/520" alt="Hero" />
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('hero-center', {
    label: 'Hero centrado',
    category: 'Hero / Portada / CTA',
    content: `
      <section class="hero hero-center">
        <div class="container">
          <span class="badge">Oferta</span>
          <h1>Tu historia empieza aquí</h1>
          <p>Presenta tu marca con una portada memorable y un llamado claro.</p>
          <a class="btn" href="#">Reservar ahora</a>
        </div>
      </section>
    `
  });

  blockManager.add('cta-banner', {
    label: 'Banner CTA',
    category: 'Hero / Portada / CTA',
    content: `
      <section class="cta">
        <div class="container cta-inner">
          <div>
            <h2>Listo para lanzar tu sitio hoy</h2>
            <p>Configura y publica en minutos con nuestro builder.</p>
          </div>
          <a class="btn" href="#">Publicar</a>
        </div>
      </section>
    `
  });
}
