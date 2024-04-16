import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ClipLoader } from 'react-spinners';

const VivoF1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/f1/live');
        if (response.ok) {
          const responseData = await response.json();
          // Aquí puedes procesar los datos como lo necesites
          setData(responseData); // Por ejemplo, asignar los datos al estado
          setLoading(false); // Marcar el estado como no cargando
        } else {
          console.error('Error al obtener los datos de F1');
          setLoading(false); // Marcar el estado como no cargando en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
        setLoading(false); // Marcar el estado como no cargando en caso de error
      }
    };

    fetchData(); // Llamar a la función fetchData al montar el componente
  }, []); // El segundo parámetro de useEffect es un array vacío, para que la función se ejecute solo una vez al montar el componente

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
    <div className='contenedor-vivo-f1'>
      <h3 className='h3-vivo-f1'>F1</h3>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#FE0" size={80} />
        </div>
      ) : (
        <Slider className='slider-vivo-f1' {...slickSettings}>
          {/* Aquí puedes mapear los datos y renderizar los elementos del slider */}
          {data.map((item, idx) => (
            <div className='vivo-f1' key={idx}>
              {/* Aquí renderiza los elementos del slider utilizando los datos */}
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              {/* Puedes agregar más contenido según tus necesidades */}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default VivoF1;
