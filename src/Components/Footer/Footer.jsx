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
              <div><a href=""> <img src="images/redes/x.png" alt="Twitter Tc La Revista" /> @tclarevista</a>
                <a href=""> <img src="images/redes/mail.png" alt="Mail Tc La revista" /> info@tclarevista.com</a></div>
              <div><a href=""> <img src="images/redes/insta.png" alt="Mail Tc La revista" /> @tclarevista</a>
                <a href=""> <img src="images/redes/youtube.png" alt="Mail Tc La revista" /> @tclarevista</a></div>
            </div>
          </div>
          <div className="footer-2">
            <Link className='link-footer'>Nosotros</Link>
            <Link className='link-footer'>Contacto</Link>
          </div>
        </div>
        <div className="footer-down">
          <div className="footer-nacionales">
            <h4>Nacionales</h4>
          </div>
          <div className="footer-internacionales">
            <h4>Internacionales</h4>
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer