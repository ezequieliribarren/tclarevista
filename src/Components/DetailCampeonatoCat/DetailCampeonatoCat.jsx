import React from 'react'
import Layout from '../../LayoutCategoria/LayoutCategoria'
import { useParams } from 'react-router-dom';


const DetailCampeonatoCat = () => {
  const { categoria } = useParams(); // Obtiene el valor del parámetro de la URL

  return (
    <Layout background={categoria} logo={categoria}>
      CAMPEONATO DETAIL
    </Layout>
  )
}

export default DetailCampeonatoCat