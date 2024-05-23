import React, { useEffect, useState } from 'react';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import { useParams } from 'react-router-dom';
import { useNewsContext } from '../../../Context/Context';
import CallActionNoticias from '../CallActionNoticias/CallActionNoticias';

const NoticiaDetail = () => {
    const { id, categoria } = useParams();
    const { news: initialNews } = useNewsContext();
    const [loading, setLoading] = useState(true);
    const [noticia, setNoticia] = useState(null);
    const [categorias, setCategorias] = useState('');
    const hideHuella = true; // Ocultar Huella en la página de noticias

    useEffect(() => {
        const findNoticia = (noticias) => {
            return noticias.find(noticia => noticia.id === id);
        };

        const allNews = [
            ...initialNews.general || [],
            ...initialNews.prioridad?.primaria || [],
            ...initialNews.prioridad?.secundaria || [],
            ...initialNews.prioridad?.terciaria || [],
        ];

        const noticiaEncontrada = findNoticia(allNews);

        if (noticiaEncontrada) {
            setNoticia(noticiaEncontrada);
            setCategorias(noticiaEncontrada.param); // Establecer la categoría de la noticia encontrada
        } else {
            setNoticia(null);
        }

        setLoading(false);
    }, [initialNews, id]);

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!noticia) {
        return <p>Noticia no encontrada</p>;
    }

    // Reemplazar '#' por '%23' en la URL
    const url = window.location.href.replace(/#/g, '%23');

    // Texto a compartir
    const shareText = `${noticia.title}`;

    // URL para compartir en Facebook
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

    // URL para compartir en Twitter
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(shareText)}`;

    // URL para compartir en WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(url)}`;

    return (
        <Layout background={categoria} logo={categoria} param={categoria} hideHuella={hideHuella}>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <section className="col-lg-8" id='noticia'>
                            <div className="card-noticia-detail">
                                <div className="top-card-noticia-detail">
                                    <div className="container-category">
                                        <div className="category">
                                            <h4 className='h4-category'>{noticia.categoria}</h4>
                                        </div>
                                    </div>
                                    <div className="title-noticia-detail">
                                        <div>
                                            <h2>{noticia.title}</h2>
                                            <h3>{formatDate(noticia.date)}</h3>
                                        </div>
                                    </div>
                                    <div
                                        className="image-noticia-detail"
                                        style={{
                                            backgroundImage: `url(http://localhost:5000/${noticia.image})`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: "top",
                                            color: 'white',
                                        }}
                                    >
                                        <div className='video-noticia-detail'>
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
                                    </div>
                                </div>
                                <div className="cuerpo-noticia-detail">
                                    <div className='compartir-noticia'>
                                        <div>
                                            <h4>Compartir:</h4>
                                            <div>
                                                <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer"><img src="images/redes/x-black.png" alt="Compartir en Facebook" /></a>
                                                <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer"><img src="images/redes/x-black.png" alt="Compartir en Twitter" /></a>
                                                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><img src="images/redes/wp-black.png" alt="Compartir en WhatsApp" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p dangerouslySetInnerHTML={{ __html: noticia.cuerpo }}></p>
                                    </div>
                                    {/* <div className='img-cuerpo-noticia-detail img-fluid'>
                                        <img src={`http://localhost:5000/${noticia.image}`} alt="" />
                                    </div> */}
                                </div>
                            </div>
                        </section>
                        <div className="col-lg-4">
                            <CallActionNoticias />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default NoticiaDetail;
