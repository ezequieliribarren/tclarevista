import React, { useState, useEffect } from 'react';
import Sabado from '../Sabado/Sabado';
import Domingo from '../Domingo/Domingo';
import Viernes from '../Viernes/Viernes';
import { useRally, useTr, useTrSeries } from '../../../Context/Context';
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
  const [mostrarBotonTR, setMostrarBotonTR] = useState(false); // Estado para mostrar el botón de TR
  const [mostrarBotonTRSeries, setMostrarBotonTRSeries] = useState(false); // Estado para mostrar el botón de TR Series
  const [cargandoF1, setCargandoF1] = useState(false);
  const [idCarrera, setIdCarrera] = useState(null); // Estado para almacenar el ID de la carrera de rally

  const contextRally = useRally();
  const contextTr = useTr();
  const contextTrSeries = useTrSeries();

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
          const { headerData } = data;
  
          // Convertir las fechas al formato ISO 8601 (YYYY-MM-DD)
          const startDateParts = headerData.fechaInicio.split('/');
          const endDateParts = headerData.fechaFin.split('/');
          const startDateISO = `${startDateParts[2]}-${startDateParts[1]}-${startDateParts[0]}`;
          const endDateISO = `${endDateParts[2]}-${endDateParts[1]}-${endDateParts[0]}`;
  
          // Crear objetos Date con las fechas convertidas
          const currentDate = new Date();
          const startDate = new Date(startDateISO);
          const endDate = new Date(endDateISO);
  
          // Verificar si la fecha actual está dentro del rango de fechas del evento
          if (currentDate >= startDate && currentDate <= endDate) {
            setMostrarBotonF1(true);
          } else {
            setMostrarBotonF1(false);
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

    // Lógica para mostrar el botón de Rally
    const showRallyButton = contextRally.some(item => {
      const eventDate = item.c[2]?.v;
      if (eventDate === currentDate) {
        setIdCarrera(item.c[0]?.v);
        return true;
      }
      return false;
    });
    setMostrarBotonRally(showRallyButton);

    // Lógica para mostrar el botón de TR
    const showTRButton = contextTr.some(item => {
      const eventDate = item.c[2]?.v;
      return eventDate === currentDate;
    });
    setMostrarBotonTR(showTRButton);

    // Lógica para mostrar el botón de TR Series
    const showTRSeriesButton = contextTrSeries.some(item => {
      const eventDate = item.c[2]?.v;
      return eventDate === currentDate;
    });
    setMostrarBotonTRSeries(showTRSeriesButton);
  }, [contextRally, contextTr, contextTrSeries]);



  const renderComponente = () => {
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
  };
  

  return (
    <div>
      {mostrarBotonTC && <button className='button-tanda' style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }} onClick={() => setMostrarF1(false)}>NACIONALES</button>}
      {mostrarBotonF1 && 
        <Link to={`http://localhost:5173/f1live/?vivo=true`} style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }}>
          <button className='button-tanda' style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }} onClick={() => setMostrarF1(true)}>F1</button>
        </Link>
      
      }
      {mostrarBotonRally && idCarrera &&
        <Link to={`http://localhost:5173/rally-argentino/carreras/${idCarrera - 1}?vivo=true`} style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }}>
          <button className='button-tanda'>Rally Argentino</button>
        </Link>
      }
      {mostrarBotonTR && idCarrera && (
        <Link
          to={`http://localhost:5173/tr/carreras/${idCarrera - 1}?vivo=true`}
          style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }}
        >
          <button className='button-tanda'>Top Race</button>
        </Link>
      )}
      {mostrarBotonTRSeries && idCarrera && (
        <Link
          to={`http://localhost:5173/tr-series/carreras/${idCarrera - 1}?vivo=true`}
          style={{ marginBottom: "2.5rem", marginTop: "1.5rem" }}
        >
          <button className='button-tanda'>Top Race Series</button>
        </Link>
      )}

      {renderComponente()}
    </div>
  );
};

export default Vivo;
