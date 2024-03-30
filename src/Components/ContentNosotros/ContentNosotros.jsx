import React from 'react'

const ContentNosotros = () => {
  const url = window.location.href;

  const facebookShareUrl = ` https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${encodeURIComponent(url)}`;

  // URL para compartir en Twitter
  const twitterShareUrl = ` https://twitter.com/intent/tweet?original_referer=${(url)}`;

  // URL para compartir en Instagram

  const whatsappUrl = ` whatsapp://send?text=${encodeURIComponent(url)}`;
  return (
    <section className='container-fluid' id='nosotros'>
      <div className="row history">
        <div className="col-md-3 history-logo"><img src="images/logo-history.png" alt="" /></div>
        <div className="col-md-9 history-title-img">
          <div className='history-title'>
            <h2>Nuestra historia</h2></div>
          <div className="images-container">
            <img src="images/nosotros/historia1.png" alt="" /><img src="images/nosotros/historia2.png" alt="" /><img src="images/nosotros/historia3.png" alt="" />
          </div>
        </div>

      </div>
      <div className="row history-description">
        <div className="cuerpo-noticia-detail">
          <div className='compartir-noticia'>
            <div>
              <h4>Compartir:</h4>     <div>
                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer"><img src="images/redes/x-black.png" alt="Compartir en Facebook" /></a>
                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer"><img src="images/redes/x-black.png" alt="Compartir en X" /></a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><img src="images/redes/wp-black.png" alt="Compartir en Whatsapp" /></a>
              </div>
            </div>
          </div>
          <p><strong>TC La Revista nació en 1982 bajo la iniciativa de José Luis Barraza,</strong> quien presentó la primera edición durante la emblemática fecha de Concordia del Turismo Carretera en junio de aquel año. Durante dos décadas, la revista mantuvo una trayectoria ininterrumpida, alcanzando un total de <strong>269 ediciones,</strong> en las cuales participaron más de 40 colaboradores, consolidándola como una de las revistas más influyentes en el ámbito del automovilismo.</p>
          <p> En el año <strong>2001,</strong> la revista evolucionó al pasar de su formato impreso a una <strong> edición radial,</strong>estableciéndose en la emisora AM 890, donde hasta el día de hoy se han transmitido más de <strong>5 mil programas</strong> de TC La Revista Edición Oral.</p>
          <p> Asimismo, en <strong>2011,</strong> TC La Revista dio un paso importante al incorporarse a los <strong>medios digitales,</strong> incluyendo su presencia en la web y en diversas plataformas de redes sociales, llevando así la pasión por el automovilismo a nuevos horizontes.
          </p>
          <p>Tras el lamentable fallecimiento de su fundador en febrero de 2023, la dirección de la publicación pasó a manos de su hijo, <strong>Lucas Gabriel Barraza,</strong> quien continúa el legado de su padre al frente de la revista.
          </p>

        </div>
      </div>
    </section>
  )
}

export default ContentNosotros