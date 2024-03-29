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
        <div classNameName='logo'> <Link to='/'><img src="images/logo.png" alt="Logo de Tc La Revista" /></Link></div>
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
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-3 tc">
                      <Link to='/tc' className="dropdown-item tc">
                        <div><img src="images/categorias/logos//tc-nav.png" alt="" /></div>
                        <div><h2>Turismo<br />Carretera</h2></div>
                        <div><img src="images/mayor.png" alt="" /></div>
                      </Link>
                    </div>
                    <div className="col-xl-9">
                      <div className="row">
                        <div className="col cat"> <Link to='/tn' className="dropdown-item">
                          <div> <img src="images/categorias/logos//tn.png" alt="" /></div>
                          <div> <h2>Turismo<br />Nacional</h2></div>
                          <div> <img src="images/mayor.png" alt="" /></div>
                        </Link></div>
                        <div className="col cat">    <Link to='/tcpk' className="dropdown-item">
                          <div> <img src="images/categorias/logos//tcpk.png" alt="" /></div>
                          <div> <h2>TC Pickup</h2></div>
                          <div> <img src="images/mayor.png" alt="" /></div>
                        </Link></div>
                        <div className="col cat">    <Link to='/tcp' className="dropdown-item">
                          <div> <img src="images/categorias/logos//tcp.png" alt="" /></div>
                          <div> <h2>TC Pista</h2></div>
                          <div> <img src="images/mayor.png" alt="" /></div>
                        </Link></div>
                      </div>
                      <div className="row">
                        <div className="col cat">
                          <Link to='/tcm' className="dropdown-item">
                            <div> <img src="images/categorias/logos//tcm.png" alt="" /></div>
                            <div> <h2>TC Mouras</h2></div>
                            <div> <img src="images/mayor.png" alt="" /></div>
                          </Link>
                        </div>
                        <div className="col cat">
                          <Link to='/tcpm' className="dropdown-item">
                            <div> <img src="images/categorias/logos//tcpm.png" alt="" /></div>
                            <div> <h2>TC Pista<br />Mouras</h2></div>
                            <div> <img src="images/mayor.png" alt="" /></div>
                          </Link>
                        </div>
                        <div className="col cat">
                          <Link to='/tcppk' className="dropdown-item">
                            <div> <img src="images/categorias/logos//tcppk.png" alt="" /></div>
                            <div> <h2>TC Pista<br />Pickup</h2></div>
                            <div> <img src="images/mayor.png" alt="" /></div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3 cat">
                      <Link to='/f2-nacional' className="dropdown-item">
                        <div> <img src="images/categorias/logos//f2-nacional.png" alt="" /></div>
                        <div> <h2>Fórmula 2<br />Nacional</h2></div>
                        <div> <img src="images/mayor.png" alt="" /></div>
                      </Link>
                    </div>
                    <div className="col-3 cat">
                      <Link to='/tc2000' className="dropdown-item">
                        <div> <img src="images/categorias/logos//tc2000.png" alt="" /></div>
                        <div> <h2>TC 2000</h2></div>
                        <div> <img src="images/mayor.png" alt="" /></div>
                      </Link></div>
                    <div className="col-3 cat">   <Link to='/tc2000-series' className="dropdown-item">
                      <div> <img src="images/categorias/logos//tc2000-series.png" alt="" /></div>
                      <div> <h2>TC 2000<br />Series</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link></div>
                    <div className="col-3 cat"><Link to='/tr' className="dropdown-item">
                      <div> <img src="images/categorias/logos//tr.png" alt="" /></div>
                      <div> <h2>Top Race</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link></div>

                  </div>
                  <div className="row">
                    <div className="col-3 cat">  <Link to='/tr-series' className="dropdown-item">
                      <div> <img src="images/categorias/logos//tr-series.png" alt="" /></div>
                      <div> <h2>Top Race<br />Series</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link></div>
                    <div className="col-3 cat">
                      <Link to='/rally-argentino' className="dropdown-item">
                        <div> <img src="images/categorias/logos//rally-argentino.png" alt="" /></div>
                        <div> <h2>Rally<br />Argentino</h2></div>
                        <div> <img src="images/mayor.png" alt="" /></div>
                      </Link>
                    </div>
                    <div className="col-3 cat">
                      <Link to='/tp' className="dropdown-item">
                        <div> <img src="images/categorias/logos//tp.png" alt="" /></div>
                        <div> <h2>Turismo Pista</h2></div>
                        <div> <img src="images/mayor.png" alt="" /></div>
                      </Link>
                    </div>
                  </div>
                </div>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Internacionales
              </a>
              <ul className="dropdown-menu internacionales">
                <div className="row">
                  <div className="col-3 cat">
                    <Link to='/f1' className="dropdown-item">
                      <div> <img src="images/categorias/logos//f1.png" alt="" /></div>
                      <div> <h2>Fórmula 1</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/moto-gp' className="dropdown-item">
                      <div> <img src="images/categorias/logos//moto-gp.png" alt="" /></div>
                      <div> <h2>Moto GP</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link></div>
                  <div className="col-3 cat">   <Link to='/indycar-series' className="dropdown-item">
                    <div> <img src="images/categorias/logos//indycar-series.png" alt="" /></div>
                    <div> <h2>Indycar<br />Series</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link></div>
                  <div className="col-3 cat">
                    <Link to='/nascar' className="dropdown-item">
                      <div> <img src="images/categorias/logos//nascar.png" alt="" /></div>
                      <div> <h2>Nascar</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 cat">
                    <Link to='/rally-mundial' className="dropdown-item">
                      <div> <img src="images/categorias/logos//rally-mundial.png" alt="" /></div>
                      <div> <h2>Rally<br />Mundial</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/dakar' className="dropdown-item">
                      <div> <img src="images/categorias/logos//dakar.png" alt="" /></div>
                      <div> <h2>Dakar</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/tcr' className="dropdown-item">
                      <div> <img src="images/categorias/logos//tcr.png" alt="" /></div>
                      <div> <h2>TCR</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/formula-e' className="dropdown-item">
                      <div> <img src="images/categorias/logos//formula-e.png" alt="" /></div>
                      <div> <h2>Fórmula E</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 cat">
                    <Link to='/rally-cross-country' className="dropdown-item">
                      <div> <img src="images/categorias/logos//rally-cross-country.png" alt="" /></div>
                      <div> <h2>Rally Cross<br />Country</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                </div>
              </ul>
            </li>
            <li className="nav-item">
              <Link to='/nosotros' className="nav-link">
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/contacto' className="nav-link">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar