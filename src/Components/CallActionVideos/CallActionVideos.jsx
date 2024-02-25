import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CallActionVideos = () => {
  const [videos, setPublicidades] = useState([]);
  const { videoId } = useParams();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api-videos/videos');
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setPublicidades(data);
        } else {
          throw new Error('Error al obtener los videos');
        }
      } catch (error) {
        console.error('Error al obtener los videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses comienzan desde 0
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  return (
    <section id='call-action-videos'>
      <Slider {...settings} className='slider-videos'>
        {videos.map((video, index) => (
          <div key={index} className='video-container'>
            <Link to={`/video/${video.id}`} className='video-link'>
              <div className='video-overlay'></div>
            </Link>
            <div className='card-video'>
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(video.url)}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className='description-video'>
                <h3>{video.title}</h3>
                <h4>{formatDate(video.date)}</h4> {/* Formatear la fecha aquí */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

// Función para extraer el ID del video de la URL de YouTube
const getYouTubeId = (url) => {
  const match = url.match(/[?&]v=([^&]+)/);
  return match && match[1];
};

export default CallActionVideos;
