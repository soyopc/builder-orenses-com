export function registerEcommerceBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('ecom-products', {
    label: 'Productos',
    category: 'E-commerce visual',
    content: `
      <section class="section">
        <div class="container">
          <h2>Tienda destacada</h2>
          <div class="grid grid-3">
            <div class="card">
              <img src="https://picsum.photos/400/320?4" alt="Producto" />
              <h3>Producto 1</h3>
              <p class="price">$29</p>
              <a class="btn" href="#">Añadir</a>
            </div>
            <div class="card">
              <img src="https://picsum.photos/401/320?5" alt="Producto" />
              <h3>Producto 2</h3>
              <p class="price">$49</p>
              <a class="btn" href="#">Añadir</a>
            </div>
            <div class="card">
              <img src="https://picsum.photos/402/320?6" alt="Producto" />
              <h3>Producto 3</h3>
              <p class="price">$89</p>
              <a class="btn" href="#">Añadir</a>
            </div>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('ecom-cart', {
    label: 'Resumen compra',
    category: 'E-commerce visual',
    content: `
      <section class="section alt">
        <div class="container">
          <div class="card cart">
            <h3>Resumen de compra</h3>
            <div class="cart-item">
              <span>Producto 1</span>
              <strong>$29</strong>
            </div>
            <div class="cart-item">
              <span>Producto 2</span>
              <strong>$49</strong>
            </div>
            <div class="cart-total">
              <span>Total</span>
              <strong>$78</strong>
            </div>
            <a class="btn" href="#">Finalizar</a>
          </div>
        </div>
      </section>
    `
  });
}
