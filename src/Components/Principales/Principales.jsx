import React, { useEffect, useState } from 'react';
import { useNewsContext } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';
import playButton from '../../../public/images/play.png'; // Import the play button image

const Principales = () => {
    const { news } = useNewsContext();
    const [vincular, setVincular] = useState([]);
    const [mostRecentIsPrimaria, setMostRecentIsPrimaria] = useState(true);
    const [mostRecentVincular, setMostRecentVincular] = useState(null);
    const backUrl = "http://localhost:5000";

    useEffect(() => {
        const fetchVincular = async () => {
            try {
                const response = await fetch(`${backUrl}/api-vincular`);
                if (response.ok) {
                    const data = await response.json();
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
        const prioridad = news && news.prioridad ? news.prioridad : {};
        const primariaDate = prioridad.primaria && prioridad.primaria.length > 0 ? new Date(prioridad.primaria[0].date) : null;
        const mostRecentVincularDate = mostRecentVincular ? new Date(mostRecentVincular.date) : null;

        if (primariaDate && mostRecentVincularDate) {
            setMostRecentIsPrimaria(primariaDate > mostRecentVincularDate);
        }
    }, [news, mostRecentVincular]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const secundarias = news && news.prioridad ? news.prioridad.secundaria || [] : [];
    const terciarias = news && news.prioridad ? news.prioridad.terciaria || [] : [];

    return (
        <section className='row' id='principales'>
            <div className="col-lg-8 container-primarias" style={{ display: mostRecentIsPrimaria ? 'block' : 'none' }}>
                {news && news.prioridad && news.prioridad.primaria && news.prioridad.primaria.map((noticia, index) => (
                    <Link to={`/noticia/${noticia.id}/${noticia.param}`} key={index}>
                        <div
                            className="card-primarias mb-3"
                            style={{
                                backgroundImage: `url(${backUrl}/${noticia.image})`,
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
                                {noticia.video && (
                                    <div className="play-button-overlay">
                                        <img src={playButton} alt="Play button" />
                                    </div>
                                )}
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
                        {mostRecentVincular.vivo && (
                            <div className="vivo-vincular">
                                <h4>VIVO</h4>
                            </div>
                        )}
                        <div
                            className="card-primarias mb-3"
                            style={{
                                backgroundImage: `url(${backUrl}/${mostRecentVincular.image})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "top",
                                color: 'white',
                            }}
                        >
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
                        <Link to={`/noticia/${noticia.id}/${noticia.param}`} key={index}>
                            <div
                                className="card-secundarias mb-3"
                                style={{
                                    backgroundImage: `url(${backUrl}/${noticia.image})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: "center",
                                    color: 'white',
                                }}
                            >
                                <div className='category'>
                                    <div className='h4-category'><h4>{noticia.categoria}</h4></div>
                                </div>
                                <div className='news-video'>
                                    {noticia.video && (
                                        <div className="play-button-overlay-2">
                                            <img src={playButton} alt="Play button" />
                                        </div>
                                    )}
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
                        <Link to={`/noticia/${noticia.id}/${noticia.param}`} key={index}>
                            <div
                                className="card-terciarias mb-3"
                                style={{
                                    backgroundImage: `url(${backUrl}/${noticia.image})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: "center",
                                    color: 'white',
                                }}
                            >
                                <div className='category'>
                                    <div className='h4-category'><h4>{noticia.categoria}</h4></div>
                                </div>
                                <div className='news-video'>
                                    {noticia.video && (
                                        <div className="play-button-overlay-2">
                                            <img src={playButton} alt="Play button" />
                                        </div>
                                    )}
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

export default Principales;
