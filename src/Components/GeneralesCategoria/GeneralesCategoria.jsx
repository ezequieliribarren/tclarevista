import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const GeneralesCategoria = ({ cat }) => {
    const [noticias, setNoticias] = useState([]);
    const [shownNewsCount, setShownNewsCount] = useState(7); // Contador para mostrar las noticias

    useEffect(() => {
        const fetchNoticiasCat = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api-categorias/${cat}`);
                if (response.ok) {
                    const data = await response.json();
                    // Ordenar las noticias por fecha de forma descendente
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
        const month = date.getMonth() + 1; // Los meses comienzan desde 0
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
    };

    const handleLoadMore = () => {
        setShownNewsCount(prevCount => prevCount + 7); // Aumentar el contador para mostrar más noticias
    };

    return (
        <section>
            {noticias.slice(3, shownNewsCount + 3).map((noticia, index) => (
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
                                <img className='img-fluid' src={`http://localhost:5000/${noticia.image}`} alt={`Imagen ${index + 1}`} />
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
            {noticias.length > shownNewsCount && 
              <div className='ver-mas'><button onClick={handleLoadMore}>VER MÁS NOTICIAS</button></div> 
            }
        </section> 
    );
};

export default GeneralesCategoria;
