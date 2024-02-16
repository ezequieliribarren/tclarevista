import React, { useContext, useEffect } from 'react';
import { useCampeonatoContext } from '../../../Context/Context';

const Campeonato = () => {
  // Obtener el contexto completo
  const campeonatoContext = useCampeonatoContext();

  const { campeonato } = campeonatoContext;

  useEffect(() => {
    console.log(campeonato);
  }, [campeonato]);

  // Función para extraer la marca de la imagen
  const extractBrand = (marca) => {
    const regex = /logo-(.*?)\-xs/g; // Expresión regular para capturar el texto entre "logo-" y "-xs"
    const match = regex.exec(marca); // Ejecutar la expresión regular en la cadena de marca
    return match ? match[1] : ""; // Devolver el texto capturado o una cadena vacía si no se encuentra coincidencia
  };

  return (
    <>
      <h1>Campeonato</h1>
      <ul>
        {Array.isArray(campeonato.tcpk) && campeonato.tcpk.slice(1).map((item, index) => (
        <li key={index}>
        {item.posicion} - {item.piloto} - 
        <img src={`images/marcas/${extractBrand(item.marca)}.png`} alt="" /> - 
        {item.puntos}
      </li>
        ))}
      </ul>
    </>
  );
}

export default Campeonato;
