import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

const Footer = () => {
  return (
    <>
      <footer className='container-fluid'>
        <div className="contenedor-up">
                    <div className="footer-1 row">
            <div className='col-md-6 logo-footer'>
              <div className="row">
                   <div className='col-md-6 logo-footer-img'><Link to='/'><img src="images/logo.png" alt="Logo de Tc La Revista" /></Link></div>
              <div className='redes-footer col-md-4' >
              <div>
                <a href="https://twitter.com/tclarevista"><img src="images/redes/x.png" alt="Twitter Tc La Revista" /> @tclarevista</a>
                <a href=""> <img src="images/redes/mail.png" alt="Mail de Tc La revista" /> info@tclarevista.com</a>
              </div>
              <div>
                <a href="https://www.instagram.com/tclarevista/"><img src="images/redes/insta.png" alt="Instagram de Tc La revista" /> @tclarevista</a>
                <a href="https://www.youtube.com/tcrevista"><img src="images/redes/youtube.png" alt="Youtube de Tc La revista" /> @tclarevista</a>
              </div>
            </div> 
              </div>
           
            </div>     
            <div className="footer-2 col-md-6">
              <div>
                <Link className='link-footer'>Nosotros</Link>
              </div>
            <div>
               <Link className='link-footer'>Contacto</Link>
            </div>
           
          </div>
          </div>            
     
        </div>

      

        <div className="footer-down row">
          <div className="footer-nacionales col-md-6">
            <h4>Nacionales</h4>
            <div className="categorias-footer">
                          <div>
              <Link to="/tc">Turismo Carretera</Link>
              <Link to="/tn">Turismo Nacional</Link>
              <Link to="/tcpk">TC PickUp</Link>
              <Link to="/tcp">TC Pista</Link>
              <Link to="/tcm">TC Mouras</Link>
              <Link to="/tcpm">TC Pista Mouras</Link>
              <Link to="/tcppk">TC Pista PickUp</Link>
            </div>
            <div>
              <Link to="/f2-nacional">Fórmula 2 Nacional</Link>
              <Link to="/tc2000">TC 2000</Link>
              <Link to="/tc2000-series">TC 2000 Series</Link>
              <Link to="/tr">Top Race</Link>
              <Link to="/tr-series">Top Race Series</Link>
              <Link to="/rally-argentino">Rally Argentino</Link>
              <Link to="/tp">Turismo Pista</Link>
            </div>
            </div>


          </div>
          <div className="footer-internacionales col-md-6">
            <h4>Internacionales</h4>
            <div className='categorias-footer'> 
            <div>
              <Link to="/f1">Fórmula 1</Link>
              <Link to="/moto-gp">Moto GP</Link>
              <Link to="/indycar-series">Indycar Series</Link>
              <Link to="/nascar">Nascar</Link>
              <Link to="/rally-mundial">Rally Mundial</Link>
              <Link to="/dakar">Dakar</Link>
            </div>
            <div>
              <Link to="/tcr">TCR</Link>
              <Link to="/formula-e">Fórmula E</Link>
              <Link to="/arg-mundo">Argentinos</Link>
            </div>
            </div>

          </div>
        </div>
        <div className='copy'>
          <h4>Diseñado y Desarrollado por <a href="https://versadigital.com.ar/">Versa Digital</a></h4>
        </div>

      </footer>
    </>
  )
}

export default Footer