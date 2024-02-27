import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'
import NavCategoria from '../Components/NavCategoria/NavCategoria'
import { useParams } from 'react-router-dom';

const Layout = ({children, background, logo, param}) => {

  return (
    <>
        <Navbar/>
        <NavCategoria background={background} logo={logo} param={param}/>
        {children}
        <Footer/>
    </>
  )
}

export default Layout