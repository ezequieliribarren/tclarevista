import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from 'react-router-dom';
import { useTc } from '../../../Context/Context';
import { useTcp } from '../../../Context/Context';
import { useTcm } from '../../../Context/Context';
import { useTcpm } from '../../../Context/Context';
import { useTcpk } from '../../../Context/Context';
import { useTcppk } from '../../../Context/Context';
import CallActionNoticias from '../CallActionNoticias/CallActionNoticias';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { CircleLoader } from 'react-spinners'; // Importar el spinner de react-spinners

const DetailFecha = ({ rowData }) => {
  const formatDate = (dateString) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [year, month, day] = dateString.split('-').map(Number);
    const monthName = months[month - 1];

    return `${day} de ${monthName}`;
  };

  const { categoria, id } = useParams();
  const [raceData, setRaceData] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando o no

  // Función para manejar el clic del botón de cada tabla
  const fetchSpecificData = async (endpoint) => {
    setLoading(true); // Iniciar la carga
    try {
      const response = await fetch(`http://localhost:5000/${categoria}/${endpoint}/${id}`);
      if (response.ok) {
        const jsonData = await response.json();
        // Actualizar el estado solo con los datos de la tabla clickeada
        setRaceData([{ url: endpoint, results: jsonData }]);
      } else {
        console.error(`Error al obtener los datos de ${endpoint}`);
        setRaceData([]);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setRaceData([]);
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  useEffect(() => {
    // Realizar el fetch al último endpoint al montar el componente
    const fetchFinalData = async () => {
      setLoading(true); // Iniciar la carga
      try {
        const response = await fetch(`http://localhost:5000/${categoria}/final/${id}`);
        if (response.ok) {
          const jsonData = await response.json();
          setRaceData([{ url: 'final', results: jsonData }]);
        } else {
          console.error(`Error al obtener los datos de ${categoria}/final/${id}`);
          setRaceData([]);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setRaceData([]);
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchFinalData();
  }, [categoria, id]);

  let context;
  switch (categoria) {
    case 'tc':
      context = useTc();
      break;
    case 'tcp':
      context = useTcp();
      break;
    case 'tcm':
      context = useTcm();
      break;
    case 'tcpm':
      context = useTcpm();
      break;
    case 'tcpk':
      context = useTcpk();
      break;
    case 'tcppk':
      context = useTcppk();
      break;
    default:
      context = [];
  }

  return (
    <Layout>
      {context.length > 0 && (
        <div className="container-fluid">
          <div className="row descripcion-carreras">
            <h2>{context[id]?.c[3]?.v}</h2>
            <h3>Fecha {context[id]?.c[0]?.v}</h3>
          </div>
          <div className="row select-tandas-carreras">
            <div className='buttons-up-carreras'>
              <div className='day-carreras'>
                <h4>Sab.</h4>
              </div>
              <div>
                <button className='button-tanda' onClick={() => fetchSpecificData('en1')}>1° Entrenamiento</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('en2')}>2° Entrenamiento</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('en3')}>3° Entrenamiento</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('en4')}>4° Entrenamiento</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('en5')}>5° Entrenamiento</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('en6')}>6° Entrenamiento</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('clasificacion')}>clasificación</button>
              </div>
            </div>
            <div className='buttons-down-carreras'>
              <div className='day-carreras'>
                <h4>Dom.</h4>
              </div>
              <div>
                <button className='button-tanda' onClick={() => fetchSpecificData('serie1')}>Serie 1</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('serie2')}>Serie 2</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('serie3')}>Serie 3</button>
                <button className='button-tanda' onClick={() => fetchSpecificData('final')}>Final</button>
              </div>

            </div>
          </div>
          <div className="row">
            {loading ? ( // Mostrar el spinner si loading es true
              <div className="col-md-9 text-center">
                <CircleLoader color="#36D7B7" size={80} />
              </div>
            ) : (
              <div className='col-md-9'>
                {/* Mostrar el contenido cuando no se está cargando */}
                {raceData && raceData.map((data, idx) => (
                  <div key={idx} >
                    {/* Mostrar solo la tabla correspondiente */}
                    <table className="table-carreras">
                      <thead className='container-fluid'>
                        <tr className='row'>
                          <th className='pos-carreras col-md-1'><h4>Pos</h4></th>
                          <th className='piloto-carreras col-md-3'><h4>Piloto</h4></th>
                          <th className='marca-carreras col-md-2'><h4>Marca</h4></th>
                          <th className='vueltas-carreras col-md-1'><h4>Vueltas</h4></th>
                          <th className='tiempo-carreras col-md-2'><h4>Tiempo</h4></th>
                          <th className='dif-carreras col-md-2'><h4>Diferencia</h4></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.results.map((item, idx) => (
                          <tr className='row' key={idx}>
                            <td className='pos-carreras-td col-md-1'><h4>{item.pos}</h4></td>
                            <td className='piloto-carreras-td col-md-3'><h4>{item.piloto}</h4></td>
                            <td className='marca-carreras-td col-md-2'><h4>{item.marca}</h4></td>
                            <td className='vueltas-carreras-td col-md-1'><h4>{item.vueltas}</h4></td>
                            <td className='tiempo-carreras-td col-md-2'><h4>{item.tiempo}</h4></td>
                            <td className='dif-carreras-td col-md-2'><h4>{item.diferencia}</h4></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
            <div className="col-md-3">
              {/* Llamada a la acción de noticias */}
              <CallActionNoticias />
              {/* Publicidad vertical */}
              <PublicidadVertical />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {/* INFORMACION DE LAS CARRERAS*/}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailFecha;
