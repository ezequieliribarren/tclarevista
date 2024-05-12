import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Huella from '../Huella/Huella';

const NavCategoria = ({ background, logo, param, hideHuella }) => {
    // Obtener los parámetros de la URL
    const { categoria } = useParams();
    const location = useLocation();

    // Verificar si la categoría es "tcr", "arg-mundo" o "dakar"
    const isTcr = categoria === "tcr";
    const isArgMundo = categoria === "arg-mundo";
    const isDakar = categoria === "dakar";

    // Si es alguna de estas categorías, no renderiza la barra de navegación
    if (isTcr || isArgMundo || isDakar) {
        return null;
    }

    // Construir las URLs para las diferentes secciones de la categoría
    const categoriaUrl = `/${categoria || param}/`;
    const noticiasUrl = `/${categoria || param}/noticias`;
    const videosUrl = `/${categoria || param}/videos`;
    const carrerasUrl = `/${categoria || param}/carreras`;
    const campeonatoUrl = `/${categoria || param}/campeonato`;
    const campeonatoUrlTc2000 = `/${categoria || param}/campeonatoTc2000`;

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
            <nav className="navbar navbar-expand nav-categoria">
                <Link className={`navbar-brand  ${activeButton === '' ? '' : 'no-active'}`} to={categoriaUrl} onClick={() => handleButtonClick('')}>
                    <img src={`images/logos/${logo || param}.png`} alt={`${logo}.png`} />
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className={`nav-item ${activeButton === 'noticias' ? 'active' : ''}`}>
                            <Link className="nav-link" to={noticiasUrl} onClick={() => handleButtonClick('noticias')}>
                                Noticias
                            </Link>
                        </li>
                        {videosUrl && (
                            <li className={`nav-item ${activeButton === 'videos' ? 'active' : ''}`}>
                                <Link className="nav-link" to={videosUrl} onClick={() => handleButtonClick('videos')}>
                                    Videos
                                </Link>
                            </li>
                        )}
                        {carrerasUrl && (
                            <li className={`nav-item ${activeButton === 'carreras' ? 'active' : ''}`}>
                                <Link className="nav-link" to={carrerasUrl} onClick={() => handleButtonClick('carreras')}>
                                    Carreras
                                </Link>
                            </li>
                        )}
                        {campeonatoUrl && (
                            <li className={`nav-item ${activeButton === 'campeonato' ? 'active' : ''}`}>
                                <Link className="nav-link" to={campeonatoUrl} onClick={() => handleButtonClick('campeonato')}>
                                    Campeonato
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
            {!hideHuella && <Huella currentSection={{ videos: videosUrl, carreras: carrerasUrl, campeonato: campeonatoUrl }} />}
        </>
    );
}

export default NavCategoria;
