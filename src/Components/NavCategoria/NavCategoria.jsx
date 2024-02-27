import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavCategoria = ({ background, logo, param }) => {
    // Obtener los parámetros de la URL
    const { categoria } = useParams();

    // Construir las URLs para las diferentes secciones de la categoría
    const noticiasUrl = `/${categoria || param}/`;
    const videosUrl = `/${categoria || param}/videos`;
    const carrerasUrl = `/${categoria || param}/carreras`;
    const campeonatoUrl = `/${categoria || param}/campeonato`;

    return (
        <>
            <header className='header-categoria' style={{
                backgroundImage: `url("images/categorias/backgrounds/${background||param}.png")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>
            </header>
            <nav className="navbar navbar-expand-lg nav-categoria">
                <Link className="navbar-brand">
                    <div>
                        <img src={`images/categorias/logos/${logo||param}.png`} alt={`${logo}.png`} />
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className='nav-link' to={noticiasUrl}>
                                Noticias
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={videosUrl}>
                                Videos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={carrerasUrl}>
                                Carreras
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={campeonatoUrl}>
                                Campeonato
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavCategoria;
