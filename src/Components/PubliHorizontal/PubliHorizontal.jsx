import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PubliHorizontal = () => {
  const [publicidades, setPublicidades] = useState([]);

  useEffect(() => {
    const fetchPublicidades = async () => {
      try {
        const response = await fetch('http://localhost:5000/publicidades');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setPublicidades(data);
        } else {
          throw new Error('Error al obtener las publicidades');
        }
      } catch (error) {
        console.error('Error al obtener las publicidades:', error);
      }
    };

    fetchPublicidades();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Tamaño md
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1000, // Tamaño lg
        settings: {
          slidesToShow: 5
        }
      }
    ]
  };
  return (
    <section>
      <Slider {...settings} className='slider-publicidad-horizontal'>
        {publicidades.map((publicidad, index) => (
          <div key={index} className='publicidad-horizontal'>
            <a href={publicidad.link} target="_blank" rel="noopener noreferrer">
              <img src={`http://localhost:5000/${publicidad.image}`} alt={`Imagen ${index + 1}`} />
            </a>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PubliHorizontal;
