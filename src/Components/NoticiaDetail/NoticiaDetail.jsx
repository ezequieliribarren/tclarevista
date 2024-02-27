import React, { useEffect, useState } from 'react';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import { useParams } from 'react-router-dom';
import { useNewsContext } from '../../../Context/Context';

const NoticiaDetail = () => {
    const { id } = useParams();
    const { news: initialNews } = useNewsContext();
    const [loading, setLoading] = useState(true);
    const [noticia, setNoticia] = useState(null);
    const [categoria, setCategoria] = useState('');

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
            setCategoria(noticiaEncontrada.param); // Establecer la categoría de la noticia encontrada
        } else {
            setNoticia(null);
        }

        setLoading(false);
    }, [initialNews, id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!noticia) {
        return <p>Noticia no encontrada</p>;
    }

    return (
<Layout background={categoria} logo={categoria} param={categoria}>
            <main>
                <h2>{noticia.title}</h2>
                <p>{noticia.cuerpo}</p>
            </main>
        </Layout>
    );
};

export default NoticiaDetail;
