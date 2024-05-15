import React, { useState, useEffect } from 'react';
import Sabado from '../Sabado/Sabado';
import Domingo from '../Domingo/Domingo';
import Viernes from '../Viernes/Viernes';
import { useRally } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';


const Vivo = () => {
  const obtenerDiaDeSemana = () => {
    const diasDeLaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const diaActual = new Date().getDay();
    return diasDeLaSemana[diaActual];
  };

  const [mostrarF1, setMostrarF1] = useState(false);
  const [diaActual, setDiaActual] = useState(obtenerDiaDeSemana());
  const [mostrarBotonTC, setMostrarBotonTC] = useState(false);
  const [mostrarBotonF1, setMostrarBotonF1] = useState(false);
  const [mostrarBotonRally, setMostrarBotonRally] = useState(false);
  const [cargandoF1, setCargandoF1] = useState(false);
  const [idCarreraRally, setIdCarreraRally] = useState(null); // Estado para almacenar el ID de la carrera de rally

  const contextRally = useRally();

  useEffect(() => {
    const interval = setInterval(() => {
      setDiaActual(obtenerDiaDeSemana());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchF1Data = async () => {
      try {
        const response = await fetch('http://localhost:5000/f1/live');
        if (response.ok) {
          const data = await response.json();
          if (data.statusData.situacion === "Bandera a cuadros") {
            setMostrarBotonF1(false);
          } else {
            setMostrarBotonF1(true);
          }
        } else {
          console.error('Error al obtener los datos de F1');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
      } finally {
        setCargandoF1(false);
      }
    };

    fetchF1Data();
  }, []);

  useEffect(() => {
    if (diaActual === 'viernes' || diaActual === 'sábado' || diaActual === 'domingo') {
      setMostrarBotonTC(true);
    }
  }, [diaActual]);

  useEffect(() => {
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;

    const showRallyButton = contextRally.some(item => {
      const eventDate = item.c[2]?.v;
      if (eventDate === currentDate) {
        // Al encontrar la carrera de rally para el día actual, almacenamos su ID
        setIdCarreraRally(item.c[0]?.v);
        return true;
      }
      return false;
    });

    setMostrarBotonRally(showRallyButton);
  }, [contextRally]);

  const toggleMostrarF1 = () => {
    setMostrarF1(!mostrarF1);
  };

 

  const renderComponente = () => {
    if (mostrarF1) {
      return <div>F1 Componente</div>;
    } else {
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
      {mostrarBotonTC && <button className='button-tanda' style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }} onClick={() => setMostrarF1(false)}>NACIONALES</button>}
      {mostrarBotonF1 && <button className='button-tanda' style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }} onClick={() => setMostrarF1(true)}>F1</button>}
      {mostrarBotonRally && idCarreraRally && <Link to={`http://localhost:5173/rally-argentino/carreras/${idCarreraRally-1}`}   style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }}><button className='button-tanda'>Rally Argentino</button></Link>}
      {renderComponente()}
    </div>
  );
};


export default Vivo;
