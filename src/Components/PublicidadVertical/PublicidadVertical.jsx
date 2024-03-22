import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PublicidadVertical = ({none}) => {
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
        vertical: true,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,

    };

    return (
        <aside id='publicidad-vertical'>
            <Slider {...settings} className={`slider-publicidad-vertical ${none ? 'none' : ''}`}>
                {publicidades.map((publicidad, index) => (
                    <div key={index} className='publicidad-vertical'>
                        <a href={publicidad.link} target="_blank" rel="noopener noreferrer">
                            <img className='img-fluid' src={`http://localhost:5000/${publicidad.image}`} alt={`Imagen ${index + 1}`} />
                        </a>
                    </div>
                ))}
            </Slider>
            <Slider {...settings} className='slider-publicidad-vertical'>
                {publicidades.map((publicidad, index) => (
                    <div key={index} className='publicidad-vertical'>
                        <a href={publicidad.link} target="_blank" rel="noopener noreferrer">
                            <img className='img-fluid' src={`http://localhost:5000/${publicidad.image}`} alt={`Imagen ${index + 1}`} />
                        </a>
                    </div>
                ))}
            </Slider>
        </aside>
    )
}

export default PublicidadVertical