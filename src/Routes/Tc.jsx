import React from 'react'
import Layout from '../LayoutCategoria/LayoutCategoria'
import PrincipalesCategoria from '../Components/PrincipalesCategoria/PrincipalesCategoria'


const Tc = () => {
  return (
    <>
      <Layout background={'images/categorias/backgroundPrueba.png'} logo={'images/categorias/tc.png'}>

          <PrincipalesCategoria cat='tc'/>



      </Layout>
    </>
  )
}

export default Tc