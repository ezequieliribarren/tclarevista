import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import { useParams } from 'react-router-dom';

const DetailVideosCat = () => {
    const [noticias, setNoticias] = useState([]);
    const { categoria } = useParams();

    useEffect(() => {
        const fetchVideosCat = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api-categorias/${categoria}`);
                if (response.ok) {
                    const data = await response.json();
                    // Filtrar y ordenar las noticias que contienen videos por fecha
                    const noticiasConVideos = data
                        .filter(noticia => noticia.video)
                        .sort((a, b) => new Date(b.date) - new Date(a.date));
                    setNoticias(noticiasConVideos);
                } else {
                    throw new Error('Error al obtener los videos');
                }
            } catch (error) {
                console.error('Error al obtener los videos:', error);
            }
        };
        fetchVideosCat();
    }, [categoria]);

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    // Función para manejar el clic en un video secundario
    const handleVideoClick = (index) => {
        const selectedVideo = noticias[index];
        const updatedNoticias = [selectedVideo, ...noticias.slice(0, index), ...noticias.slice(index + 1)];
        setNoticias(updatedNoticias);
        // Calcular el 10% del alto de la ventana
        const windowHeight = window.innerHeight;
        const scrollPosition = 0.50 * windowHeight;
        // Desplazamiento hacia arriba un 10% del alto de la ventana
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
        // Reproducir el video principal automáticamente
        const videoPrincipal = document.getElementById('videoPrincipal');
        const newVideoUrl = `https://www.youtube.com/embed/${selectedVideo.idVideo}?autoplay=1`;
        videoPrincipal.src = newVideoUrl;
    };

    return (
        <Layout background={categoria} logo={categoria}>
            <main>
                <section>
                    {/* Renderizar el video principal */}
                    {noticias.length > 0 && (
                        <div className="container-fluid">
                            <div className="row container-video-primario">
                                <div className="video-primario" style={{ position: 'relative', width: '80%', paddingTop: '56.25%' }}>
                                    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '90%' }}>
                                        {noticias[0].video ? (
                                     <iframe
                                     id="videoPrincipal"
                                     src={`https://www.youtube.com/embed/${noticias[0].idVideo}?autoplay=1`}
                                     frameBorder="0"
                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                     allowFullScreen
                                     style={{ position: 'absolute', width: '100%', height: '100%', border: 'none', margin: '0', padding: '3rem', zIndex:'1111' }}
                                 ></iframe>
                                 
                                        ) : (
                                            <img className='img-fluid' src={`http://localhost:5000/${noticias[0].image}`} alt={`Imagen principal`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        )}
                                        <div className='description' style={{ position: 'absolute', bottom: '0', left: '2%', padding: '3rem', color: '#fff' }}>
                                            <div className='title-subtitle-video'>
                                                <h2>{noticias[0].title}</h2>
                                                <h3>{formatDate(noticias[0].date)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {noticias.length > 1 && (
                        <div className="container-fluid">
                            <div className="row">
                                {noticias.slice(1).map((noticia, index) => (
                                    <div className="col-md-4 position-relative" key={index}>
                                        <div
                                            className="transparent"
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                zIndex: 1,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => handleVideoClick(index + 1)}
                                        ></div>
                                        <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                                            {noticia.video ? (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${noticia.idVideo}`}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    style={{ position: 'absolute', width: '100%', height: '100%', border: 'none', margin: '0', zIndex: 0 }}
                                                ></iframe>
                                            ) : (
                                                <img className='img-fluid' src={`http://localhost:5000/${noticia.image}`} alt={`Imagen ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            )}
                                            <div className='description-video-generales' style={{ position: 'absolute', bottom: '0', left: '0', padding: '1rem', color: '#fff' }}>
                                                <div className='title-subtitle-video'>
                                                    <h2>{noticia.title}</h2>
                                                    <h3>{formatDate(noticia.date)}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </Layout>
    );
};

export default DetailVideosCat;
