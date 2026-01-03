export function registerLayoutBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('layout-section', {
    label: 'Sección base',
    category: 'Layout / Estructura',
    content: `
      <section class="section">
        <div class="container">
          <div class="grid grid-2">
            <div class="col">
              <h2>Título sección</h2>
              <p>Describe tu servicio o producto con claridad.</p>
            </div>
            <div class="col">
              <img src="https://picsum.photos/640/420" alt="" />
            </div>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('layout-two-columns', {
    label: '2 columnas',
    category: 'Layout / Estructura',
    content: `
      <div class="container">
        <div class="grid grid-2">
          <div class="col">Columna 1</div>
          <div class="col">Columna 2</div>
        </div>
      </div>
    `
  });

  blockManager.add('layout-three-columns', {
    label: '3 columnas',
    category: 'Layout / Estructura',
    content: `
      <div class="container">
        <div class="grid grid-3">
          <div class="col">Columna 1</div>
          <div class="col">Columna 2</div>
          <div class="col">Columna 3</div>
        </div>
      </div>
    `
  });
}
