import React from 'react';
import { useParams } from 'react-router-dom';

const ResultadoEnVivo = () => {
  let { tanda } = useParams();

  // Puedes usar el valor de tanda aquí para mostrar los detalles correspondientes
  return (
    <div>
      <h1>Detalles de la Tanda: {tanda}</h1>
      {/* Aquí puedes mostrar los detalles de la tanda */}
    </div>
  );
};

export default ResultadoEnVivo;