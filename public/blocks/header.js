export function registerHeaderBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('header-simple', {
    label: 'Header simple',
    category: 'Headers / Navbars / Menús',
    content: `
      <header class="header">
        <div class="container header-inner">
          <div class="logo">Orenses</div>
          <nav class="nav">
            <a href="#">Inicio</a>
            <a href="#">Servicios</a>
            <a href="#">Contacto</a>
          </nav>
          <a class="btn" href="#">Agendar</a>
        </div>
      </header>
    `
  });

  blockManager.add('header-centered', {
    label: 'Header centrado',
    category: 'Headers / Navbars / Menús',
    content: `
      <header class="header header-centered">
        <div class="container">
          <div class="logo">Marca</div>
          <nav class="nav">
            <a href="#">Inicio</a>
            <a href="#">Portafolio</a>
            <a href="#">Equipo</a>
            <a href="#">Contacto</a>
          </nav>
        </div>
      </header>
    `
  });

  blockManager.add('header-dark', {
    label: 'Header oscuro',
    category: 'Headers / Navbars / Menús',
    content: `
      <header class="header header-dark">
        <div class="container header-inner">
          <div class="logo">Studio</div>
          <nav class="nav">
            <a href="#">Inicio</a>
            <a href="#">Proyectos</a>
            <a href="#">Blog</a>
            <a href="#">Contacto</a>
          </nav>
          <a class="btn" href="#">Cotizar</a>
        </div>
      </header>
    `
  });
}
