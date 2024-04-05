import React, { useState, useEffect } from 'react';
import { useCarrerasAnuales } from '../../../Context/Context';

const EnVivo = ({ isVisible }) => {
  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <div className='call-action-vivo'> 
      <div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h4></h4>
        </div>
      </div>
      <div></div>
      </div>
  
    </div>
  );
}

const Proximas = ({ isVisible }) => {
  const carrerasAnuales = useCarrerasAnuales();



  const fechaActual = new Date();
  const diaSemana = fechaActual.getDay();
  const inicioSemana = new Date(fechaActual);
  const finSemana = new Date(fechaActual);

  // Ajustar inicio de la semana al próximo viernes a las 5:00 am
  inicioSemana.setDate(fechaActual.getDate() + (5 - diaSemana + 7) % 7);
  inicioSemana.setHours(5, 0, 0, 0);
  // Ajustar final de la semana al próximo domingo a las 23:59
  finSemana.setDate(inicioSemana.getDate() + 2);
  finSemana.setHours(23, 59, 59, 999);

  // Filtrar las carreras que ocurran dentro del rango especificado
  const carrerasProximas = carrerasAnuales.filter(carrera => {
    if (!carrera.c[1]?.v) return false;

    const fechaCarrera = new Date(carrera.c[1].v);
    return fechaCarrera >= inicioSemana && fechaCarrera <= finSemana;
  });

  return (
    <div style={{ display: isVisible ? 'block' : 'none' }}>
      <h2>Carreras Próximas</h2>
      <ul>
        {carrerasProximas.map((carrera, index) => (
          <li key={index}>
            {carrera.c[1]?.v} - {carrera.c[2]?.v}
          </li>
        ))}
      </ul>
    </div>
  );
}

const ResEnVivo = () => {
  const [isVisibleEnVivo, setIsVisibleEnVivo] = useState(false);
  const [isVisibleProximas, setIsVisibleProximas] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const fechaActual = new Date();
      const diaSemana = fechaActual.getDay();
      const hora = fechaActual.getHours();
      const minutos = fechaActual.getMinutes();

      // Si es viernes a partir de las 5am y antes del domingo a las 23:59, mostrar En Vivo
      setIsVisibleEnVivo(diaSemana === 5 && ((hora > 5) || (hora === 5 && minutos >= 0)) && ((diaSemana < 7) || (diaSemana === 7 && hora < 23) || (diaSemana === 7 && hora === 23 && minutos <= 59)));

      // Si es viernes a partir de las 5am y antes del domingo a las 23:59, ocultar Proximas
      setIsVisibleProximas(!(diaSemana === 5 && ((hora > 5) || (hora === 5 && minutos >= 0)) && ((diaSemana < 7) || (diaSemana === 7 && hora < 23) || (diaSemana === 7 && hora === 23 && minutos <= 59))));
    }, 60000); // Verificar cada minuto

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <EnVivo isVisible={isVisibleEnVivo} />
      <Proximas isVisible={isVisibleProximas} />
    </div>
  );
}

export default ResEnVivo;
