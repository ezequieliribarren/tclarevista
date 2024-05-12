import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';
import { HashLink as Link } from 'react-router-hash-link';
import { useParams } from 'react-router-dom';

const Domingo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  // Función para mapear códigos de tanda a nombres completos
  const mapTandaCodeToFullName = (code) => {
    switch (code) {
      case "TC":
        return "Turismo Carretera";
      case "TCP":
        return "TC Pista";
      case "TCPK":
        return "TC Pick Up";
      case "TCPPK":
        return "TC Pista Pickup";
      case "TCM":
        return "TC Mouras";
      case "TCPM":
        return "TC Pista";
      default:
        return code; // Devolver el código original si no coincide con ninguno
    }
  };

  // Función para mapear códigos de tanda a rutas de imágenes
  const mapTandaCodeToImage = (code) => {
    switch (code) {
      case "TC":
        return "images/logos/tc.png";
      case "TCP":
        return "images/logos/tcp.png";
      case "TCPK":
        return "images/logos/tcpk.png";
      case "TCPPK":
        return "images/logos/tcppk.png";
      case "TCM":
        return "images/logos/tcm.png";
      case "TCPM":
        return "images/logos/tcpm.png";
      case "TN 3":
        return "images/logos/tn.png";
        case "TN 2":
          return "images/logos/tn.png";
      default:
        return ""; // Devolver una cadena vacía si no coincide con ninguno
    }
  };

  const normalizeTanda = (tanda) => {
    return tanda.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'http://localhost:5000/ip1menu',
          'http://localhost:5000/ip2menu',
          'http://localhost:5000/ip3menu',
          'http://localhost:5000/ip4menu'
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        const jsonResponses = await Promise.all(responses.map(response => response.json()));

        const allData = jsonResponses.reduce((acc, response, index) => {
          const url = urls[index]; // Obtener la URL correspondiente al índice actual
          response.forEach(item => {
            // Agregar la URL como una propiedad a cada objeto de datos
            item.url = url;
            // Además, asegurémonos de que el objeto tenga una propiedad 'tanda'
            // para evitar errores posteriores
            item.tanda = item.tanda || '';
          });
          return acc.concat(response);
        }, []);


        // Unificar los datos de todos los endpoints en un solo array
        const mergedData = allData.reduce((acc, item) => {
          if (item.title === "Domingo") {
            item.items.forEach(subItem => {
              const newItem = {
                ...subItem,
                categoria: item.categoria
              };
              acc.push(newItem);
            });
          }
          return acc;
        }, []);

        console.log('Datos procesados:', mergedData);


        // Ordenar los datos según el estado
        mergedData.sort((a, b) => {
          if (a.estado === "vivo") return -1;
          if (a.estado === "" && b.estado !== "vivo") return -1;
          return 1;
        });

        setData(mergedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


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
    <h3 className='h3-sab-dom'>Domingo</h3>
    {loading ? (
      <div className="spinner-container">
        <ClipLoader color="#FE0" size={80} />
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

export default Domingo;
