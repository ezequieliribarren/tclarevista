import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Huella from '../Huella/Huella';

const NavCategoria = ({ background, logo, param }) => {
    // Obtener los parámetros de la URL
    const { categoria } = useParams();
    const location = useLocation();

    // Verificar si la categoría es "tcr", "arg-mundo" o "dakar"
    const isTcr = categoria === "tcr";
    const isArgMundo = categoria === "arg-mundo";
    const isDakar = categoria === "dakar";

    // Construir las URLs para las diferentes secciones de la categoría
    const categoriaUrl = `/${categoria || param}/`;
    const noticiasUrl = `/${categoria || param}/noticias`;
    const videosUrl = isTcr || isArgMundo || isDakar ? null : `/${categoria || param}/videos`;
    const carrerasUrl = isTcr || isArgMundo || isDakar ? null : `/${categoria || param}/carreras`;
    const campeonatoUrl = isTcr || isArgMundo || isDakar ? null : `/${categoria || param}/campeonato`;

    // Estado para mantener el botón activo
    const [activeButton, setActiveButton] = useState('');

    // Función para manejar los clics en los botones
    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    // Actualizar el estado activo cuando cambia la categoría de la URL
    useEffect(() => {
        // Obtener la sección de la URL actual
        const currentSection = location.pathname.split('/')[2];
        // Actualizar el estado activo
        setActiveButton(currentSection);
    }, [location.pathname]);

    return (
        <>
            <nav className="navbar navbar-expand-lg nav-categoria">
                <Link className={`navbar-brand ${activeButton === '' ? '' : 'no-active'}`} to={categoriaUrl} onClick={() => handleButtonClick('')}>
                    <img src={`images/categorias/logos/${logo || param}.png`} alt={`${logo}.png`} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${activeButton === 'noticias' ? 'active' : ''}`}>
                            <Link className="nav-link" to={noticiasUrl} onClick={() => handleButtonClick('noticias')}>
                                <h3>Noticias</h3>
                            </Link>
                        </li>
                        {videosUrl && (
                            <li className={`nav-item ${activeButton === 'videos' ? 'active' : ''}`}>
                                <Link className="nav-link" to={videosUrl} onClick={() => handleButtonClick('videos')}>
                                    <h3>Videos</h3>
                                </Link>
                            </li>
                        )}
                        {carrerasUrl && (
                            <li className={`nav-item ${activeButton === 'carreras' ? 'active' : ''}`}>
                                <Link className="nav-link" to={carrerasUrl} onClick={() => handleButtonClick('carreras')}>
                                    <h3>Carreras</h3>
                                </Link>
                            </li>
                        )}
                        {campeonatoUrl && (
                            <li className={`nav-item ${activeButton === 'campeonato' ? 'active' : ''}`}>
                                <Link className="nav-link" to={campeonatoUrl} onClick={() => handleButtonClick('campeonato')}>
                                    <h3>Campeonato</h3>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            <Huella currentSection={{ videos: videosUrl, carreras: carrerasUrl, campeonato: campeonatoUrl }} />
        </>
    );
}

export default NavCategoria;
