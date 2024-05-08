import React, { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Sabado from '../Sabado/Sabado';
import Domingo from '../Domingo/Domingo';
import Viernes from '../Viernes/Viernes';

const Vivo = () => {
  const obtenerDiaDeSemana = () => {
    const diasDeLaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const diaActual = new Date().getDay();
    return diasDeLaSemana[diaActual];
  };

  const [mostrarF1, setMostrarF1] = useState(false);
  const [diaActual, setDiaActual] = useState(obtenerDiaDeSemana());
  const [mostrarBotonTC, setMostrarBotonTC] = useState(false); // Estado para controlar la visibilidad del botón TC
  const [mostrarBotonF1, setMostrarBotonF1] = useState(false); // Estado para controlar la visibilidad del botón F1
  const [cargandoF1, setCargandoF1] = useState(true); // Estado para controlar la carga de datos de F1

  useEffect(() => {
    const interval = setInterval(() => {
      setDiaActual(obtenerDiaDeSemana());
    }, 60000); // Actualizar cada 1 minuto
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchF1Data = async () => {
      try {
        const response = await fetch('http://localhost:5000/f1/live');
        if (response.ok) {
          const data = await response.json();
          // Verificar si la situación es "Bandera a cuadros"
          if (data.statusData.situacion === "Bandera a cuadros") {
            setMostrarBotonF1(false); // Ocultar el botón de F1
          } else {
            setMostrarBotonF1(true); // Mostrar el botón de F1
          }
          setCargandoF1(false); // La carga ha finalizado
        } else {
          console.error('Error al obtener los datos de F1');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
      }
    };

    // Llamar a la función fetchF1Data al montar el componente
    fetchF1Data();
  }, []); // El segundo parámetro de useEffect es un array vacío, para que la función se ejecute solo una vez al montar el componente

  useEffect(() => {
    // Si el día actual es viernes, sábado o domingo, mostrar el botón TC
    if (diaActual === 'viernes' || diaActual === 'sábado' || diaActual === 'domingo') {
      setMostrarBotonTC(true);
    }
  }, [diaActual]);

  const toggleMostrarF1 = () => {
    setMostrarF1(!mostrarF1);
  };

  const renderComponente = () => {
    if (cargandoF1) {
      // Mostrar un cliploader mientras se carga la información de F1
      return         <div className="loader">
      <span style={{color: "#fe0"}} className="loader-text">Verificando carreras en vivo...</span>
  </div>;
    } else if (mostrarF1) {
      // Renderizar componente de F1
      return <div>F1 Componente</div>;
    } else {
      // Renderizar componente de día de la semana
      switch (diaActual) {
        case 'sábado':
          return <Sabado />;
        case 'domingo':
          return <Domingo />;
        case 'viernes':
          return <Viernes />;
        default:
          return <div style={{ display: 'none', height: "0px" }} />;
      }
    }
  };

  return (
    <div>
      {mostrarBotonTC && <button className='button-tanda' onClick={() => setMostrarF1(false)}>TC</button>}
      {mostrarBotonF1 && <button className='button-tanda' onClick={() => setMostrarF1(true)}>F1</button>}
      {renderComponente()}
    </div>
  );
};

export default Vivo;
