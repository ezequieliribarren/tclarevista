import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';

const PrincipalesCategoria = ({ cat }) => {
    const [noticias, setNoticias] = useState([]);

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

    // Función para ordenar las noticias por fecha de forma descendente
    const sortNoticiasByDate = (noticias) => {
        return noticias.sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    return (
        <section className='row' id='principalesCategorias'>
            <div className="col-md-8 container-primarias">
                {noticias.length > 0 && (
                    <Link to={`/noticia/${noticias[0].id}`} key={0}>
                        <div
                            className="card-primarias mb-3"
                            style={{
                                backgroundImage: `url(http://localhost:5000/${noticias[0].image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                color: 'white',
                            }}
                        >
                            <div className='news-video'>
                                {noticias[0].video ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${noticias[0].idVideo}`}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        width="100%"
                                        height="100%"
                                    ></iframe>
                                ) : null}
                            </div>
                            <div className='title-subtitle'>
                                <h2>{noticias[0].title}</h2>
                                <h3>{formatDate(noticias[0].date)}</h3>
                            </div>
                        </div>
                    </Link>
                )}
            </div>
            <div className="col-md-4">
                <div className="container-secundarias">
                    {noticias.slice(1, 2).map((noticia, index) => (
                        <Link to={`/noticia/${noticia.id}`} key={index + 1}>
                            <div
                                className="card-secundarias mb-3"
                                style={{
                                    backgroundImage: `url(http://localhost:5000/${noticia.image})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    color: 'white',
                                }}
                            >
                                <div className='news-video'>
                                    {noticia.video ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${noticia.idVideo}`}
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                            width="100%"
                                            height="90%"
                                        ></iframe>
                                    ) : null}
                                </div>
                                <div className='title-subtitle'>
                                    <h3>{noticia.title}</h3>
                                    <h4>{formatDate(noticia.date)}</h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="container-terciarias">
                {noticias.slice(2, 3).map((noticia, index) => (
                        <Link to={`/noticia/${noticia.id}`} key={index + 3}>
                            <div
                                className="card-terciarias mb-3"
                                style={{
                                    backgroundImage: `url(http://localhost:5000/${noticia.image})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    color: 'white',
                                }}
                            >
                                <div className='news-video'>
                                    {noticia.video ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${noticia.idVideo}`}
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                            width="100%"
                                            height="100%"
                                        ></iframe>
                                    ) : null}
                                </div>
                                <div className='title-subtitle'>
                                    <h3>{noticia.title}</h3>
                                    <h4>{formatDate(noticia.date)}</h4>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PrincipalesCategoria;
