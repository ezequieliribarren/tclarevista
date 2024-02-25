import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import NavCategoria from '../Components/NavCategoria/NavCategoria'


const Layout = ({children, background, logo}) => {
  return (
    <>
        <Navbar/>
        <NavCategoria background={background} logo={logo}/>
        {children}
        <Footer/>
    </>
  )
}

export default Layout