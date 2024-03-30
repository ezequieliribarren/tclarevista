import React from 'react'

const Formulario = () => {
    return (
        <section id='contacto' className='p-5'>
            <h1>Contactanos</h1>
            <div className='container-fluid '>
                <div className="row">
                    <div className='col-lg-6 contenedor-formulario'>
                        <form id="contactForm">
                            <div className="form-group">
                                <label htmlFor="Nombre">Nombre</label>
                                <input type="text" id="nombre" name='user_name' required placeholder='Tu nombre' />
                            </div>
                            <div className="form-group email-celular">
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <input type="email" id="email" name='user_email' required placeholder='ejemplo@gmail.com' />
                                </div>
                                <div>
                                    <label htmlFor="Celular">Celular</label>
                                    <input type="tel" id="tel" name="user_tel" required placeholder='11-0000-0000' />
                                </div>

                            </div>
                            <div className="form-group">
                                <label htmlFor="Dejanos tu mensaje">Dejanos tu mensaje</label>
                                <textarea id="mensaje" name="mensaje" required placeholder='Por favor escribí aquí tu mensaje'></textarea>
                            </div>
                            <button type="submit" value="Enviar">ENVIAR</button>
                        </form>
                    </div>
                    <div className='col-lg-6 redes-contacto'>
                        <a href=""><img src="images/redes/mail-black.png" alt="Mail Tc La Revista" /> <h3>tclarevista@gmail.com</h3></a>
                        <a href="https://www.youtube.com/tcrevista"><img src="images/redes/youtube-black.png" alt="Youtube Tc La Revista" /> <h3>@tcrevista</h3></a>
                        <a href=""><img src="images/redes/insta-black.png" alt="Instagram Tc La Revista" /> <h3>@tclarevista</h3></a>
                        <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Ftclarevista"><img src="images/redes/x-black.png" alt="X Tc La Revista" /> <h3>@tclarevista</h3></a>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Formulario