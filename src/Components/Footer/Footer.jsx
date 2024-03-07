import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-up">
          <div className="footer-1">
            <div>
              <div><Link to='/'><img src="images/logo.png" alt="Logo de Tc La Revista" /></Link></div>
            </div>
            <div className='redes-footer'>
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
          <div className="footer-2">
            <Link className='link-footer'>Nosotros</Link>
            <Link className='link-footer'>Contacto</Link>
          </div>
        </div>
        <div className="footer-down row">
          <div className="footer-nacionales col-md-6">
            <h4>Nacionales</h4>
            <div className="categorias-footer">
                          <div>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
            </div>
            <div>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
            </div>
            </div>


          </div>
          <div className="footer-internacionales col-md-6">
            <h4>Internacionales</h4>
            <div className='categorias-footer'> 
            <div>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
            </div>
            <div>
              <Link>Turismo Carretera</Link>
              <Link>Turismo Carretera</Link>
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