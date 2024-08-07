import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HashLink as Link } from 'react-router-hash-link';
import { useNewsContext } from '../../../Context/Context';
import playButton from '../../../public/images/play.png'; // Importa la imagen del botón de reproducción

const VideosCarousel = () => {
    const { news } = useNewsContext();

    // Verificar si 'news' está definido y si 'general' está presente
    const generales = news && news.general ? news.general : [];

    // Filtrar las noticias que contienen videos
    const videosNews = generales.filter(item => item.video);

    // Tomar las primeras 7 noticias con videos
    const videosToShow = videosNews.slice(0, 7);
    const settings = {
        centerMode: false,
        centerPadding: '0px',
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        dots: false,
        arrows: false,
        preventMovementUntilSwipeScrollTolerance: true,
        swipeScrollTolerance: 50,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    return (
        <div className="row videos-carousel">
            <h2>Videos</h2>
            <Slider className='slider-videos' {...settings}>
                {videosToShow.map((video, index) => (
                    <div key={index}>
                        <Link to={`/noticia/${video.id}`}>
                            <div className='contenedor-videos-carousel'>
                                <div className='videos-carousel-img'>
                                    <img src={video.miniatura} alt={`Video ${index + 1}`} />
                                    <div className="play-button-overlay">
                                        <img src={playButton} alt="Play button" />
                                    </div>
                                </div>
                                <div className="videos-carousel-description">
                                    <h3>{video.title}</h3>
                                    <h4>{formatDate(video.date)}</h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default VideosCarousel;
