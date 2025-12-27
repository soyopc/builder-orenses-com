export function registerSeoBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('seo-head', {
    label: 'SEO Head',
    category: 'SEO / Social',
    content: `
      <head>
        <title>Mi sitio | Orenses</title>
        <meta name="description" content="Describe tu negocio y mejora el SEO." />
        <meta property="og:title" content="Mi sitio" />
        <meta property="og:description" content="Comparte tu sitio con una vista previa atractiva." />
        <meta property="og:image" content="https://picsum.photos/1200/630" />
        <link rel="icon" href="/favicon.ico" />
      </head>
    `
  });

  blockManager.add('seo-social', {
    label: 'Bloque social',
    category: 'SEO / Social',
    content: `
      <section class="section alt">
        <div class="container">
          <h2>Síguenos</h2>
          <div class="social">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </section>
    `
  });
}
