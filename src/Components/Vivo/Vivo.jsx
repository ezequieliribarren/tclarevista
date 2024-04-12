import React from 'react';
import Sabado from '../Sabado/Sabado';
import Domingo from '../Domingo/Domingo';

const Vivo = () => {
  const obtenerDiaDeSemana = () => {
    const diasDeLaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const diaActual = new Date().getDay();
    return diasDeLaSemana[diaActual];
  };

  const diaActual = obtenerDiaDeSemana();

  // Renderizar el componente correspondiente al día actual
  switch (diaActual) {
    case 'sábado':
      return <Sabado />;
    case 'domingo':
      return <Domingo />;
    case 'viernes':
      return <Sabado />;
    case 'lunes':
      // AQUI DEBERIA GUARDAR EL ULTIMO ESTADO DE LAS 3PM Y GUARDARLOS TODOS COMO FINALIZADOS 
      // return <Domingo />; 
    default:
      return <div style={{ display: 'none', height: "0px" }} />;
  }
};

export default Vivo;
