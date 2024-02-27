import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    }, [cat]); // Agregar 'cat' como dependencia para que el useEffect se ejecute cuando cambie la categoría


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
                    <div
                        className="card-primarias mb-3"
                        style={{
                            backgroundImage: `url(http://localhost:5000/${noticias[0].image})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            color: 'white',
                        }}
                    >
                        {/* NO FUNCIONA EL ID Y ESTA MAL POSICIONADO EN POSITION RELATIVE ABSOLUTE, TAPA AL NAV */}
                        {/* <Link to={`/noticia/${noticias.id}`} className='video-link'></Link> */}
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

                )}
            </div>
            <div className="col-md-4">
                <div className="container-secundarias">
                    {noticias.length > 1 && (
                        <div
                            className="card-secundarias mb-3"
                            style={{
                                backgroundImage: `url(http://localhost:5000/${noticias[1].image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                color: 'white', // Color del texto para que sea visible en la imagen de fondo
                            }}
                        >

                            {/* <Link to={`/noticia/${noticias.id}`} className='video-link'></Link> */}
                            <div className='news-video'>
                                {noticias[1].video ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${noticias[1].idVideo}`}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        width="100%"
                                        height="100%"
                                    ></iframe>
                                ) : null}
                            </div>
                            <div className='title-subtitle'>
                                <h3>{noticias[1].title}</h3>
                                <h4>{formatDate(noticias[1].date)}</h4>
                            </div>
                        </div>
                    )}
                </div>
                <div className="container-terciarias">
                    {/* Renderizar la tercera noticia más reciente */}
                    {noticias.length > 2 && (
                        <div
                            className="card-terciarias mb-3"
                            style={{
                                backgroundImage: `url(http://localhost:5000/${noticias[2].image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                color: 'white', // Color del texto para que sea visible en la imagen de fondo
                            }}
                        >

                            {/* <Link to={`/noticia/${noticias.id}`} className='video-link'></Link> */}
                            <div className='news-video'>
                                {noticias[2].video ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${noticias[2].idVideo}`}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        width="100%"
                                        height="100%"
                                    ></iframe>
                                ) : null}
                            </div>
                            <div className='title-subtitle'>
                                <h3>{noticias[2].title}</h3>
                                <h4>{formatDate(noticias[2].date)}</h4>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default PrincipalesCategoria;
