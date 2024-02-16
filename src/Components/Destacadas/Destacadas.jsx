import React, { useContext } from 'react'
import { useNewsContext } from '../../../Context/Context'

const Destacadas = () => {
    const { news } = useNewsContext();



    return (
        <>
            <h2>Noticias Destacadas</h2>
            {Array.isArray(news.general) && news.general.map((noticia) => (
                <div key={noticia.id}>
                    <h3>{noticia.title}</h3>
                    <p>{noticia.date}</p>
                    <p>{noticia.cuerpo}</p>
                    <img src={`http://localhost:5000/${noticia.image}`} alt="" />
                </div>

            ))}
           
        </>
    );
};

export default Destacadas;