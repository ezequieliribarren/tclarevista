import React, { useEffect, useState, useRef, useCallback } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import playButton from '../../../public/images/play.png'; // Import the play button image

const GeneralesCategoria = ({ cat, filterDate }) => {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shownNewsCount, setShownNewsCount] = useState(7);
    const observer = useRef();

    useEffect(() => {
        const fetchNoticiasCat = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api-categorias/${cat}`);
                if (response.ok) {
                    const data = await response.json();
                    const sortedNoticias = sortNoticiasByDate(data);
                    setNoticias(sortedNoticias);
                } else {
                    throw new Error('Error al obtener las noticias');
                }
            } catch (error) {
                console.error('Error al obtener las noticias:', error);
            }
        };

        fetchNoticiasCat();
    }, [cat]);

    useEffect(() => {
        // Filtrar noticias por fecha si se proporciona filterDate
        if (filterDate) {
            const filteredNoticias = noticias.filter(noticia => {
                const noticiaDate = new Date(noticia.date).toISOString().split('T')[0]; // Formato: YYYY-MM-DD
                return noticiaDate === filterDate.toISOString().split('T')[0];
            });
            setNoticias(filteredNoticias);
        }
    }, [filterDate]);

    const sortNoticiasByDate = (noticias) => {
        return noticias.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const handleObserver = useCallback((node) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && noticias.length > shownNewsCount) {
                setLoading(true);
                setTimeout(() => {
                    setShownNewsCount((prevCount) => prevCount + 7);
                    setLoading(false);
                }, 1000); // Simulando un tiempo de carga
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, shownNewsCount, noticias]);

    return (
        <section>
            {noticias.slice(-shownNewsCount - 3, -3).map((noticia, index) => (
                <Link to={`/noticia/${noticia.id}/${noticia.param}`} key={index}>
                    <div className="card-general mb-3" ref={index === noticias.length - 4 ? handleObserver : null}>
                        <div className='card-general-img'>
                            <img
                                className='img-fluid'
                                src={noticia.video ? noticia.miniatura : `http://localhost:5000/${noticia.image}`}
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
            {loading && (
                <div className="cargando-mas-noticias">
                    <div className="spinner-border spinner-xl" style={{ color: '#FF0' }} role="status"></div>
                </div>
            )}
        </section>
    );
};

export default GeneralesCategoria;
