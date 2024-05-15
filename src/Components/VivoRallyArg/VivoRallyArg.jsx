import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';
import { HashLink as Link } from 'react-router-hash-link';
import { useParams } from 'react-router-dom';

const VivoRallyArg = ({contextRally, idFechaSeleccionada}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);




  // Configuración de Slick
  const slickSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  return (
    <div className='contenedor-vivo'>
    <h3 className='h3-sab-dom'>Rally-</h3>
    {loading ? (
        <div className="spinner-container">
          <span style={{ color: "#FE0" }} className="loader-text">Verificando carreras en vivo...</span>
        </div>
    ) : (
      <Slider className='slider-vivo' {...slickSettings}>
        {data.map((item, idx) => (
          // Evitar renderizar el slider si el nombre de la tanda incluye "Grilla"
          !item.tanda.toLowerCase().includes('grilla') && (
            <Link
              to={`/vivo/${item.categoria.toLowerCase()}/${item.tanda}/${item.ip}`}
              className='vivo'
              key={idx}
              data-url={item.url} // Pasar la URL como una propiedad adicional
            >
              <div className='vivo'>
                <div className='contenedor-categoria-vivo'>
                  <div className='contenedor-img-categoria'>
                    <img src={mapTandaCodeToImage(item.categoria)} alt="" />
                  </div>
                  <div>
                    <h3>{mapTandaCodeToFullName(item.categoria)}</h3>
                  </div>
                </div>
                <div className='contenedor-tanda'>
                  {item.tanda && (
                    <div className='tanda'>
                      <div className='tanda-info'>
                        <div>
                          {item.estado === 'vivo' && <img className='titilar' src="images/vivo.png" alt="Estado" />}
                          {item.estado === 'finalizado' && <img src="images/finalizado.png" alt="Estado" />}
                          {item.estado === 'proximo' && "HOY"}
                        </div>
                        {item.tanda.split(' ').map((part, idx) => {
                          let formattedPart = part;
                          if (part === 'Entrenamiento') {
                            formattedPart = 'En.';
                          } else if (part === 'Serie') {
                            formattedPart = 'S.';
                          } else if (part === 'Clasificación') {
                            formattedPart = 'Clas.';
                          }
                          return <h4 key={idx}>{formattedPart}</h4>;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          )
          ))}
        </Slider>
      )}
    </div>
  );
};

export default VivoRallyArg;
