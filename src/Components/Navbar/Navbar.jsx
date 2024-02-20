import React from 'react'
import Radio from '../Radio/Radio';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HashLink as Link } from 'react-router-hash-link';





const Navbar = () => {
  const radioUrl = 'http://01.solumedia.com.ar:8420/;stream.nsv'
  const audioRef = React.createRef();

  return (
    <>
      <header className='header'>
        <div className='redes'>
          <div><a href=""><img src="images/redes/insta.png" alt="Intagram de Tc La Revista" /></a></div>
          <div><a href=""><img src="images/redes/x.png" alt="Twitter de Tc La Revista" /></a></div>
          <div><a href=""><img src="images/redes/youtube.png" alt="Youtube de Tc La Revista" /></a></div>
          <div><a href=""><img src="images/redes/mail.png" alt="Mail de Tc La Revista" /></a></div>
        </div>
        <div classNameName='logo'><img src="images/logo.png" alt="Logo de Tc La Revista" /></div>
        <div classNameName='radio'>
          <Radio url={radioUrl} />
        </div>
      </header>
      <nav className="navbar navbar-expand-lg">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Nacionales
              </a>
              <ul className="dropdown-menu nacionales">
                <div className='nav-section'>
                  <Link className="dropdown-item tc">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>   <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                </div>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Internacionales
              </a>
              <ul className="dropdown-menu internacionales">
              <div className='nav-section'>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>   <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                  <Link className="dropdown-item">
                    <div> <img src="images/categorias/tn.png" alt="" /></div>
                    <div> <h2>Turismo<br />Nacional</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link>
                </div>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar