import React from 'react'
import Radio from '../Radio/Radio';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { HashLink as Link } from 'react-router-hash-link';
import RadioMobile from '../RadioMobile/RadioMobile';




const Navbar = () => {
  const radioUrl = 'http://01.solumedia.com.ar:8420/;stream.nsv'
  const audioRef = React.createRef();


  return (
    <>
      <header className='header container-fluid'>
        <div className='redes'>
          <div><a href="https://www.instagram.com/tclarevista/"><img src="images/redes/insta.png" alt="Intagram de Tc La Revista" /></a></div>
          <div><a href="https://twitter.com/tclarevista"><img src="images/redes/x.png" alt="Twitter de Tc La Revista" /></a></div>
          <div><a href="https://www.youtube.com/tcrevista"><img src="images/redes/youtube.png" alt="Youtube de Tc La Revista" /></a></div>
          <div><a href=""><img src="images/redes/mail.png" alt="Mail de Tc La Revista" /></a></div>
        </div>
        <div className='logo'> <Link to='/'><img className='img-fluid' src="images/logo.png" alt="Logo de Tc La Revista" /></Link></div>
        <div className='radio'>
          <Radio url={radioUrl} />
        </div>

      </header>
      <header className='header-mobile'>
        <div className='logo'>
          <Link to='/'><img className='img-fluid' src="images/logo.png" alt="Logo de Tc La Revista" /></Link>
        </div>
        <div className='radio-mobile'>
          <RadioMobile url={radioUrl} />
        </div>
      </header>
      <nav className="navbar navbar-expand-lg nav-desktop">
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
                        <div><img src="images/logos/tc.png" alt="" /></div>
                        <div><h2>Turismo<br />Carretera</h2></div>
                        <div><img src="images/mayor.png" alt="" /></div>
                      </Link>
                    </div>
                    <div className="col-xl-9">
                      <div className="row">
                        <div className="col cat">
                
                        <div className="dropdown-item">
                        <div> <img src="images/logos//tn.png" alt="" /></div>
                          <div> <h2>Turismo<br />Nacional</h2></div>
                          <div className='links-clases'>
                             <Link to='/tn' className='button-clases'>
                            C2
                            </Link>
                            <Link to='/tn3' className='button-clases'>
                            C3
                            </Link>
                          </div>
                         
                            </div>
                        </div>
                        
                        <div className="col cat">    <Link to='/tcpk' className="dropdown-item">
                          <div> <img src="images/logos//tcpk.png" alt="" /></div>
                          <div> <h2>TC Pickup</h2></div>
                          <div> <img src="images/mayor.png" alt="" /></div>
                        </Link></div>
                        <div className="col cat">    <Link to='/tcp' className="dropdown-item">
                          <div> <img src="images/logos//tcp.png" alt="" /></div>
                          <div> <h2>TC Pista</h2></div>
                          <div> <img src="images/mayor.png" alt="" /></div>
                        </Link></div>
                      </div>
                      <div className="row">
                        <div className="col cat">
                          <Link to='/tcm' className="dropdown-item">
                            <div> <img src="images/logos//tcm.png" alt="" /></div>
                            <div> <h2>TC Mouras</h2></div>
                            <div> <img src="images/mayor.png" alt="" /></div>
                          </Link>
                        </div>
                        <div className="col cat">
                          <Link to='/tcpm' className="dropdown-item">
                            <div> <img src="images/logos//tcpm.png" alt="" /></div>
                            <div> <h2>TC Pista<br />Mouras</h2></div>
                            <div> <img src="images/mayor.png" alt="" /></div>
                          </Link>
                        </div>
                        <div className="col cat">
                          <Link to='/tcppk' className="dropdown-item">
                            <div> <img src="images/logos//tcppk.png" alt="" /></div>
                            <div> <h2>TC Pista<br />Pickup</h2></div>
                            <div> <img src="images/mayor.png" alt="" /></div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-3 cat">
                      <Link to='/tc2000' className="dropdown-item">
                        <div> <img src="images/logos//tc2000.png" alt="" /></div>
                        <div> <h2>TC 2000</h2></div>
                        <div> <img src="images/mayor.png" alt="" /></div>
                      </Link></div>
                    <div className="col-3 cat"><Link to='/tr' className="dropdown-item">
                      <div> <img src="images/logos//tr.png" alt="" /></div>
                      <div> <h2>Top Race</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link></div>
                    <div className="col-3 cat">  <Link to='/tr-series' className="dropdown-item">
                      <div> <img src="images/logos//tr-series.png" alt="" /></div>
                      <div> <h2>Top Race<br />Series</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link></div><div className="col-3 cat">
                      <Link to='/rally-argentino' className="dropdown-item">
                        <div> <img src="images/logos//rally-argentino.png" alt="" /></div>
                        <div> <h2>Rally<br />Argentino</h2></div>
                        <div> <img src="images/mayor.png" alt="" /></div>
                      </Link>
                    </div>
                  </div>
                  <div className="row">

                  <div className="col-3 cat">
                
                <div className="dropdown-item">
                <div> <img src="images/logos/tp.png" alt="" /></div>
                  <div> <h2>Turismo<br />Pista</h2></div>
                  <div className='links-clases'>
                  <Link to='/tp1' className='button-clases'>
                    C1
                    </Link>
                     <Link to='/tp2' className='button-clases'>
                    C2
                    </Link>
                    <Link to='/tp' className='button-clases'>
                    C3
                    </Link>
                  </div>
                 
                    </div>
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
                      <div> <img src="images/logos//f1.png" alt="" /></div>
                      <div> <h2>Fórmula 1</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/moto-gp' className="dropdown-item">
                      <div> <img src="images/logos//moto-gp.png" alt="" /></div>
                      <div> <h2>Moto GP</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link></div>
                  <div className="col-3 cat">   <Link to='/indycar-series' className="dropdown-item">
                    <div> <img src="images/logos//indycar-series.png" alt="" /></div>
                    <div> <h2>Indycar<br />Series</h2></div>
                    <div> <img src="images/mayor.png" alt="" /></div>
                  </Link></div>
                  <div className="col-3 cat">
                    <Link to='/nascar' className="dropdown-item">
                      <div> <img src="images/logos//nascar.png" alt="" /></div>
                      <div> <h2>Nascar</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 cat">
                    <Link to='/rally-mundial' className="dropdown-item">
                      <div> <img src="images/logos//rally-mundial.png" alt="" /></div>
                      <div> <h2>Rally<br />Mundial</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/dakar' className="dropdown-item">
                      <div> <img src="images/logos//dakar.png" alt="" /></div>
                      <div> <h2>Dakar</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/tcr' className="dropdown-item">
                      <div> <img src="images/logos//tcr.png" alt="" /></div>
                      <div> <h2>TCR</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                  <div className="col-3 cat">
                    <Link to='/formula-e' className="dropdown-item">
                      <div> <img src="images/logos//formula-e.png" alt="" /></div>
                      <div> <h2>Fórmula E</h2></div>
                      <div> <img src="images/mayor.png" alt="" /></div>
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 cat">
                    <Link to='/arg-mundo' className="dropdown-item">
                      <div> <img src="images/banderas/arg.png" alt="" /></div>
                      <div> <h2>Argentinos por el<br />Mundo</h2></div>
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
      <nav class=" navbar-mobile navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <div class="navbar-brand"></div>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header">
              <button type="button" className='cerrar' data-bs-dismiss="offcanvas" aria-label="Close">
                <img src="images/x.png" alt="Cerrar" />
              </button>
            </div>
            <div className="offcanvas-header-2">
            <div className='redes'>
                <div><a href="https://www.instagram.com/tclarevista/"><img src="images/redes/insta.png" alt="Intagram de Tc La Revista" /></a></div>
                <div><a href="https://twitter.com/tclarevista"><img src="images/redes/x.png" alt="Twitter de Tc La Revista" /></a></div>
                <div><a href="https://www.youtube.com/tcrevista"><img src="images/redes/youtube.png" alt="Youtube de Tc La Revista" /></a></div>
                <div><a href=""><img src="images/redes/mail.png" alt="Mail de Tc La Revista" /></a></div>
              </div>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Nacionales
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <Link to='/tc' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Turismo Carretera</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tn' className='dropdown-item link-navbar-responsive' >
                      <div><h2>Turismo Nacional</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tcpk' className='dropdown-item link-navbar-responsive'>
                      <div><h2>TC PickUp</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tcp' className='dropdown-item link-navbar-responsive'>
                      <div><h2>TC Pista</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tcm' className='dropdown-item link-navbar-responsive'>
                      <div><h2>TC Mouras</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tcpm' className='dropdown-item link-navbar-responsive'>
                      <div><h2>TC Pista Mouras</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tcppk' className='dropdown-item link-navbar-responsive'>
                      <div><h2>TC Pista PickUp</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tc2000' className='dropdown-item link-navbar-responsive'>
                      <div><h2>TC 2000</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tr' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Top Race</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tr-series' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Top Race Series</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/rally-argentino
                    ' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Rally Argentino</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tp' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Turismo Pista</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>


                  </ul>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Internacionales
                  </a>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <Link to='/f1' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Fórmula 1</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/moto-gp' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Moto GP</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/indycar-series' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Indycar Series</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/nascar' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Nascar</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/rally-mundial' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Rally Mundial</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/dakar' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Dakar</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/tcr' className='dropdown-item link-navbar-responsive'>
                      <div><h2>TCR</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/formula-e' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Fórmula E</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
                    <Link to='/arg-mundo' className='dropdown-item link-navbar-responsive'>
                      <div><h2>Argentinos por el Mundo</h2></div>
                      <div><img src="images/mayor.png" alt="" /></div>
                    </Link>
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

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar