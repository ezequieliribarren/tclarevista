import React from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../LayoutCategoria/LayoutCategoria'

const DetailVideosCat = () => {
    const { categoria } = useParams();
  return (
    <Layout background={categoria} logo={categoria}>
      VIDEOS DETAIL
    </Layout>

 
  )
}

export default DetailVideosCat