import React from 'react'
import Radio from '../Radio/Radio';


const Navbar = () => {
  const radioUrl = 'http://01.solumedia.com.ar:8420/;stream.nsv'
  const audioRef = React.createRef();
  
  return (
   <>  
   <header className='header'>
    <div className='redes'>
      <div><img src="images/redes/insta.png" alt="Intagram de Tc La Revista" /></div>
      <div><img src="images/redes/x.png" alt="Twitter de Tc La Revista" /></div>
      <div><img src="images/redes/youtube.png" alt="Youtube de Tc La Revista" /></div>
      <div><img src="images/redes/mail.png" alt="Mail de Tc La Revista" /></div>
    </div>
    <div className='logo'><img src="images/logo.png" alt="Logo de Tc La Revista" /></div>
    <div className='radio'>
    <Radio url={radioUrl} />
    </div>
   </header>  
<nav>

</nav>
    </>
  )
}

export default Navbar