import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const NavCategoria = ({ background, logo }) => {
    return (
        <>
            <header className='header-categoria' style={{
                backgroundImage: `url("${background}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}>

            </header>
            <nav className="navbar navbar-expand-lg nav-categoria">
                <Link className="navbar-brand" href="#">
                    <div>
                        <img src={logo} alt="" />
                    </div>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                       <Link className='nav-link'>
                       Noticias
                       </Link>
                        </li>
                        <li className="nav-item">
                        <Link className='nav-link'>
                       Videos
                       </Link>
                        </li>
                        <li className="nav-item">
                        <Link className='nav-link'>
                       Carreras
                       </Link>
                        </li>
                        <li className="nav-item">
                        <Link className='nav-link'>
                       Campeonato
                       </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavCategoria