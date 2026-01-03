export function registerUiBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('ui-buttons', {
    label: 'Botones',
    category: 'UI Components',
    content: `
      <div class="ui-row">
        <a class="btn" href="#">Primario</a>
        <a class="btn ghost" href="#">Secundario</a>
        <span class="badge">Nuevo</span>
      </div>
    `
  });

  blockManager.add('ui-alerts', {
    label: 'Alertas',
    category: 'UI Components',
    content: `
      <div class="alert success">Operación completada correctamente.</div>
      <div class="alert warning">Revisa los datos antes de enviar.</div>
      <div class="alert danger">Ocurrió un error, intenta otra vez.</div>
    `
  });

  blockManager.add('ui-tabs', {
    label: 'Tabs',
    category: 'UI Components',
    content: `
      <div class="tabs">
        <div class="tab">Descripción</div>
        <div class="tab">Beneficios</div>
        <div class="tab">Detalles</div>
      </div>
    `
  });

  blockManager.add('ui-modal', {
    label: 'Modal',
    category: 'UI Components',
    content: `
      <div class="modal">
        <div class="card">
          <h3>Mensaje importante</h3>
          <p>Comparte una promoción o anuncio destacado.</p>
          <a class="btn" href="#">Entendido</a>
        </div>
      </div>
    `
  });
}
