export function registerFormsBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('form-contact', {
    label: 'Formulario contacto',
    category: 'Formularios / Leads / WhatsApp',
    content: `
      <section class="section alt">
        <div class="container">
          <div class="grid grid-2">
            <div>
              <h2>Conversemos</h2>
              <p>Déjanos tu consulta y te respondemos en menos de 24 horas.</p>
            </div>
            <form class="card form">
              <label>Nombre<input type="text" placeholder="Tu nombre" /></label>
              <label>Email<input type="email" placeholder="tu@email.com" /></label>
              <label>Mensaje<textarea rows="4" placeholder="Cuéntanos tu proyecto"></textarea></label>
              <button class="btn" type="submit">Enviar</button>
            </form>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('form-newsletter', {
    label: 'Newsletter',
    category: 'Formularios / Leads / WhatsApp',
    content: `
      <section class="section">
        <div class="container">
          <div class="card subscribe">
            <div>
              <h3>Recibe novedades</h3>
              <p>Consejos de marketing y diseño cada semana.</p>
            </div>
            <form class="subscribe-form">
              <input type="email" placeholder="correo@empresa.com" />
              <button class="btn" type="submit">Suscribirme</button>
            </form>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('whatsapp-cta', {
    label: 'Botón WhatsApp',
    category: 'Formularios / Leads / WhatsApp',
    content: `
      <div class="whatsapp">
        <a class="btn" href="https://wa.me/000000000" target="_blank">Hablar por WhatsApp</a>
      </div>
    `
  });
}
