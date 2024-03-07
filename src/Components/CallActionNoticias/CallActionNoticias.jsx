import React from 'react';
import { useNewsContext } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

const CallActionNoticias = () => {
  const { news } = useNewsContext();

  // Verificar si 'news' está definido y si hay noticias disponibles
  const noticias = news && news.general ? news.general : [];

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  return (
    <aside id='call-action-noticias'>
      <div className="container-fluid">
        <div className="row title-ultimas-noticias">
          <h3>Últimas Noticias</h3>
        </div>
        <div className="row container-noticias">
          {noticias.map((noticia, index) => (
            <Link to={`/noticia/${noticia.id}`} key={index}>
              <div className="card-ultimas-noticias"
                style={{
                  backgroundImage: `url(http://localhost:5000/${noticia.image})`,
                  backgroundPosition: "center", backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                }}>   <div className="category">
                    <h4 className="h4-category">{noticia.categoria}</h4>
                  </div>
                <div className="card-noticia-details"> 
             
                  <div className="call-action-title-subtitle"> 
                    <h2>{noticia.title}</h2>
                    <h3>{formatDate(noticia.date)}</h3>  
                    <div className="iframe-container">
                      {noticia.video ? (
                        <iframe
                          className="call-action-video"
                          src={`https://www.youtube.com/embed/${noticia.idVideo}`}
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                          width="100%"
                          height="100%"
                        ></iframe>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CallActionNoticias;
