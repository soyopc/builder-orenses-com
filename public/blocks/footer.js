export function registerFooterBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('footer-basic', {
    label: 'Footer básico',
    category: 'Footers',
    content: `
      <footer class="footer">
        <div class="container footer-grid">
          <div>
            <h3>Orenses</h3>
            <p>Soluciones digitales para negocios modernos.</p>
          </div>
          <div>
            <h4>Enlaces</h4>
            <ul class="list">
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Servicios</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <p>hola@orenses.com</p>
            <p>+34 600 000 000</p>
          </div>
        </div>
      </footer>
    `
  });

  blockManager.add('footer-minimal', {
    label: 'Footer minimal',
    category: 'Footers',
    content: `
      <footer class="footer minimal">
        <div class="container footer-inner">
          <span>© 2024 Orenses</span>
          <div class="social">
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">TikTok</a>
          </div>
        </div>
      </footer>
    `
  });
}
