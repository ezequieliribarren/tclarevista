import React, { useEffect } from 'react';
import PublicidadHorizontal from '../Components/PubliHorizontal/PubliHorizontal'
import Layout from '../Layout/Layout'
import Formulario from '../Formulario/Formulario'

const Contacto = () => {

  useEffect(() => {
    window.scrollTo(0, 0); // Desplaza la página hacia arriba cuando el componente se monta
  }, []); // El segundo argumento es un array vacío para que el efecto se ejecute solo una vez al montar el componente

  return (
    <Layout>
      <Formulario/>
      <PublicidadHorizontal />
    </Layout>
  )
}

export default Contacto