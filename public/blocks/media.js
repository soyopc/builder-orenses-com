export function registerMediaBlocks(editor) {
  const blockManager = editor.BlockManager;

  blockManager.add('media-gallery', {
    label: 'Galería',
    category: 'Media',
    content: `
      <section class="section">
        <div class="container">
          <h2>Galería</h2>
          <div class="grid grid-3 gallery">
            <img src="https://picsum.photos/400/300?1" alt="" />
            <img src="https://picsum.photos/400/300?2" alt="" />
            <img src="https://picsum.photos/400/300?3" alt="" />
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('media-video', {
    label: 'Video',
    category: 'Media',
    content: `
      <section class="section alt">
        <div class="container">
          <h2>Video destacado</h2>
          <div class="video">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </section>
    `
  });

  blockManager.add('media-map', {
    label: 'Mapa',
    category: 'Media',
    content: `
      <section class="section">
        <div class="container">
          <h2>Cómo llegar</h2>
          <div class="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8438219551705!2d144.9537363153167!3d-37.8162797797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1fd81%3A0xf57741ee21aef9c4!2sVictoria%20Harbour!5e0!3m2!1sen!2sau!4v1649892181123!5m2!1sen!2sau"
              width="100%"
              height="360"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    `
  });
}
