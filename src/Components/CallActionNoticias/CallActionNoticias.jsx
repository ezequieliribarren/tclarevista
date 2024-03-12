import React, { useState, useRef, useCallback } from 'react';
import { useNewsContext } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

const CallActionNoticias = ({ filterDate }) => {
  const { news } = useNewsContext();
  const [shownNewsCount, setShownNewsCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const lastNewsElementRef = useRef();


  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  const formatDateForComparison = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Agregar un cero inicial si el mes es de un solo dígito
    const day = date.getUTCDate().toString().padStart(2, '0'); // Agregar un cero inicial si el día es de un solo dígito
    return `${year}-${month}-${day}`; // Formato: YYYY-MM-DD
  };

  const handleLoadMore = () => {
    setLoading(true);
    setShownNewsCount(prevCount => prevCount + 5);
    setLoading(false);
  };

  // Verificar si 'news' está definido y si hay noticias disponibles
  let noticias = news && news.general ? news.general : [];

  if (filterDate) {
    const sixDaysAgo = new Date(filterDate);
    sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

    const sixDaysAgoComparisonDate = formatDateForComparison(sixDaysAgo);
    const comparisonDate = formatDateForComparison(filterDate);

    noticias = noticias.filter(noticia => {
      const noticiaDate = formatDateForComparison(noticia.date);
      return noticiaDate >= sixDaysAgoComparisonDate && noticiaDate <= comparisonDate;
    });
  }

  noticias = noticias.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, shownNewsCount);

  const lastNewsElementRefCallback = useCallback(
    (node) => {
      if (loading) return; // Evita cargar más noticias si ya está cargando

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );
  
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
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
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
           <div ref={lastNewsElementRefCallback}></div>
          {loading && (
            <div className="cargando-mas-noticias">
              <div className="spinner-border spinner-xl" style={{ color: '#FE0' }} role="status"></div>
            </div>
          )}
          <div ref={lastNewsElementRef}></div>
        </div>
      </div>
    </aside>
  );
};

export default CallActionNoticias;
