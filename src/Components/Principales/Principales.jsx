import React, { useEffect, useState } from 'react';
import { useNewsContext } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

const Principales = () => {
    const { news } = useNewsContext();
    const [vincular, setVincular] = useState([]);
    const [mostRecentIsPrimaria, setMostRecentIsPrimaria] = useState(true);
    const [mostRecentVincular, setMostRecentVincular] = useState(null);

    useEffect(() => {
        const fetchVincular = async () => {
            try {
                const response = await fetch('http://localhost:5000/api-vincular');
                if (response.ok) {
                    const data = await response.json();
                    // Encontrar la noticia más reciente
                    const mostRecent = data.reduce((prev, current) => {
                        return (new Date(prev.date) > new Date(current.date)) ? prev : current;
                    });
                    setMostRecentVincular(mostRecent);
                } else {
                    throw new Error('Error al obtener vincular');
                }
            } catch (error) {
                console.error('Error al obtener vincular:', error);
            }
        };

        fetchVincular();
    }, []);


    useEffect(() => {
        // Verificar si 'news' está definido y si 'prioridad' está presente
        const prioridad = news && news.prioridad ? news.prioridad : {};
        // Obtener la fecha de la noticia primaria
        const primariaDate = prioridad.primaria && prioridad.primaria.length > 0 ? new Date(prioridad.primaria[0].date) : null;
        // Obtener la fecha de la noticia más reciente en vincular
        const mostRecentVincularDate = mostRecentVincular ? new Date(mostRecentVincular.date) : null;

        // Comparar las fechas y determinar cuál es más reciente
        if (primariaDate && mostRecentVincularDate) {
            setMostRecentIsPrimaria(primariaDate > mostRecentVincularDate);
        }
    }, [news, mostRecentVincular]);

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const secundarias = news && news.prioridad ? news.prioridad.secundaria || [] : [];
    const terciarias = news && news.prioridad ? news.prioridad.terciaria || [] : [];
    return (
        <section className='row' id='principales'>
            <div className="col-lg-8 container-primarias" style={{ display: mostRecentIsPrimaria ? 'block' : 'none' }}>
                {news && news.prioridad && news.prioridad.primaria && news.prioridad.primaria.map((noticia, index) => (
                    <Link to={`/noticia/${noticia.id}`} key={index}>
                        <div
                            className="card-primarias mb-3"
                            key={index}
                            style={{
                                backgroundImage: `url(http://localhost:5000/${noticia.image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "top",
                                color: 'white',
                            }}
                        >
                            <div className='category'>
                                <div className='h4-category'><h4>{noticia.categoria}</h4></div>
                            </div>
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
                                <h2>{noticia.title}</h2>
                                <h3>{formatDate(noticia.date)}</h3>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
            <div className="col-lg-8 container-primarias" style={{ display: mostRecentIsPrimaria ? 'none' : 'block' }}>
                {mostRecentVincular && (
                    <Link to={mostRecentVincular.link}>
                        <div
                            className="card-primarias mb-3"
                            style={{
                                backgroundImage: `url(http://localhost:5000/${mostRecentVincular.image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "top",
                                color: 'white',
                            }}
                        >   
                            <div className='news-video'>
                                {mostRecentVincular.video && (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${mostRecentVincular.idVideo}`}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        width="100%"
                                        height="100%"
                                    ></iframe>
                                )}
                            </div>

                            <div className='title-subtitle'>
                                <h2>{mostRecentVincular.title}</h2>
                            </div>

                        </div>
                    </Link>

                )}
            </div>
            <div className="col-lg-4">
                <div className="container-secundarias">
                    {secundarias.map((noticia, index) => (
                        <Link to={`/noticia/${noticia.id}`} key={index}>

                            <div
                                className="card-secundarias mb-3"
                                key={index}
                                style={{
                                    backgroundImage: `url(http://localhost:5000/${noticia.image})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: "center",
                                    color: 'white', // Color del texto para que sea visible en la imagen de fondo
                                }}
                            >
                                <div className='category'>
                                    <div className='h4-category'><h4>{noticia.categoria}</h4></div>
                                </div>
                                {/* <Link to={`/noticia/${noticia.id}`} className='video-link'></Link> */}
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
                    {terciarias.map((noticia, index) => (
                        <Link to={`/noticia/${noticia.id}`} key={index}>
                            <div
                                className="card-terciarias mb-3"
                                key={index}
                                style={{
                                    backgroundImage: `url(http://localhost:5000/${noticia.image})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: "center",
                                    color: 'white',
                                }}
                            >
                                <div className='category'>
                                    <div className='h4-category'><h4>{noticia.categoria}</h4></div>
                                </div>

                                {/* <Link to={`/noticia/${noticia.id}`} className='video-link'></Link> */}
                                <div className='news-video'>
                                    {noticia.video ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${noticia.idVideo}`}
                                            frameborder="0"
                                            width="100%"
                                            height="100%"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
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
    )

}

export default Principales;
