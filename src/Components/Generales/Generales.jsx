import React, { useState, useRef, useCallback } from 'react';
import { useNewsContext } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

const Generales = () => {
    const { news } = useNewsContext();
    const [shownNewsCount, setShownNewsCount] = useState(7);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const lastNewsElementRef = useRef();

    // Verificar si 'news' está definido y si 'general' está presente
    const generales = news && news.general ? news.general.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, shownNewsCount) : [];

    // Función para formatear la fecha
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
                <Link to={`/noticia/${noticia.id}`} key={index}>
                    <div className="card-general mb-3">
                        <div className='card-general-img'>
                            {noticia.video ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${noticia.idVideo}`}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                    width="100%"
                                    height="100%"
                                ></iframe>
                            ) : (
                                <img className='img-fluid' src={`http://localhost:5000/${noticia.image}`} alt={noticia.title} />
                            )}
                        </div>
                        <div className='description'>
                            <div className='category'>
                                <div className='h4-category'> <h4>{noticia.categoria}</h4></div>
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
