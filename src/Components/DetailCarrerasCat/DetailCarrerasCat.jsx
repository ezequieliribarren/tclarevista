import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../LayoutCategoria/LayoutCategoria';

const DetailCarrerasCat = () => {
  const { categoria } = useParams(); // Obtiene el valor del parámetro de la URL

  return (
    <Layout background={categoria} logo={categoria}>
      CARRERAS DETAIL
    </Layout>
  );
}

export default DetailCarrerasCat;
