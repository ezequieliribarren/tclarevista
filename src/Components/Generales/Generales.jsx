import React, { useState, useRef } from 'react';
import { useNewsContext } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';
import playButton from '../../../public/images/play.png'; // Import the play button image

const Generales = () => {
    const { news } = useNewsContext();
    const [shownNewsCount, setShownNewsCount] = useState(7);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const lastNewsElementRef = useRef();
    const backUrl = "http://localhost:5000/"; // Ver como agregar la url

    const generales = news && news.general ? news.general.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, shownNewsCount) : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    return (
        <section id='generales'>
            {generales.map((noticia, index) => (
                <Link to={`/noticia/${noticia.id}/${noticia.param}`} key={index}>
                    <div className="card-general mb-3">
                        <div className='card-general-img'>
                            <img
                                className='img-fluid'
                                src={noticia.video ? noticia.miniatura : `${backUrl}/${noticia.image}`}
                                alt={noticia.title}
                            />
                            {noticia.video && (
                                <div className="play-button-overlay">
                                    <img src={playButton} alt="Play button" />
                                </div>
                            )}
                        </div>
                        <div className='description'>
                            <div className='category'>
                                <div className='h4-category'><h4>{noticia.categoria}</h4></div>
                            </div>
                            <div className='title-subtitle'>
                                <h2>{noticia.title}</h2>
                                <h3>{formatDate(noticia.date)}</h3>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    );
};

export default Generales;
