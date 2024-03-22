import React, { useEffect } from 'react';
import { useNewsContext } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

const Principales = () => {
    const { news } = useNewsContext();

    // Verificar si 'news' está definido y si 'prioridad' está presente
    const prioridad = news && news.prioridad ? news.prioridad : {};
    // Obtener las noticias secundarias y terciarias
    const secundarias = prioridad.secundaria || [];
    const terciarias = prioridad.terciaria || [];

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    return (
        <section className='row' id='principales'>
            <div className="col-lg-8 container-primarias">
                {prioridad.primaria && prioridad.primaria.map((noticia, index) => (
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
