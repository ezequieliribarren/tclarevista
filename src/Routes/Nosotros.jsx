import React, { useEffect } from 'react';
import Layout from '../Layout/Layout'
import Equipo from '../Components/Equipo/Equipo'
import ContentNosotros from '../Components/ContentNosotros/ContentNosotros'

const Nosotros = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página hacia arriba cuando el componente se monta
  }, []); // El segundo argumento es un array vacío para que el efecto se ejecute solo una vez al montar el componente

  return (
    <Layout>
      <ContentNosotros />
      <Equipo />
    </Layout>

  )
}

export default Nosotros