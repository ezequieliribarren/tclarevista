import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from 'react-router-dom';
import { useTc, useTcp, useTcm, useTcpm, useTcpk, useTcppk } from '../../../Context/Context';
import CallActionNoticias from '../CallActionNoticias/CallActionNoticias';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { CircleLoader } from 'react-spinners'; 

const DetailFecha = ({ rowData }) => {
  const { categoria, id } = useParams();
  const [raceData, setRaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButtonText, setSelectedButtonText] = useState(""); 
  const [selectedDate, setSelectedDate] = useState("");
  const [buttonVisibility, setButtonVisibility] = useState([]); // Cambiado a un array para manejar la visibilidad de los botones

  const handleButtonClick = (endpoint, buttonText) => {
    setSelectedButton(endpoint);
    setSelectedButtonText(buttonText);
    fetchSpecificData(endpoint);
  };  

  const fetchButtonVisibility = async () => {
    try {
      const buttonValues = context[id]?.c.slice(8, 14).map(cell => cell.v); // Obtener los valores de las celdas relevantes
      const visibilityData = buttonValues.map((value, index) => ({
        endpoint: `en${index + 1}`,
        text: `${index + 1}° Entrenamiento`,
        hasData: value !== "" // Comprobar si el valor de la celda está vacío
      }));
      visibilityData.push({
        endpoint: 'clasificacion',
        text: 'Clasificación',
        hasData: context[id]?.c[14]?.v !== "" // Comprobar si el valor de la celda correspondiente a la clasificación está vacío
      });
      setButtonVisibility(visibilityData.filter(button => button.hasData)); // Filtrar solo los botones que tienen datos
    } catch (error) {
      console.error('Error al obtener la visibilidad de los botones:', error);
    }
  };

  const formatDate = (dateString) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [year, month, day] = dateString.split('-').map(Number);
    const monthName = months[month - 1];

    return `${day} de ${monthName}`;
  };

  // Función para manejar el clic del botón de cada tabla
  const fetchSpecificData = async (endpoint) => {
    setLoading(true); // Iniciar la carga
    try {
      const response = await fetch(`http://localhost:5000/${categoria}/${endpoint}/${id}`);
      if (response.ok) {
        const jsonData = await response.json();
        // Actualizar el estado solo con los datos de la tabla clickeada
        setRaceData([{ url: endpoint, results: jsonData }]);
        setSelectedButton(endpoint); // Siempre actualiza el botón seleccionado cuando se hace clic en cualquier botón
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
          setSelectedButton('final'); // Establecer el botón seleccionado solo cuando se carga la tanda final
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

  useEffect(() => {
    if (raceData.length > 0) {
      // Verificar si hay datos en raceData antes de acceder a ellos
      const firstRace = raceData[0];
      if (firstRace.results && firstRace.results.length > 0) {
        setSelectedDate(firstRace.results[0].fecha);
      }
    }
  }, [raceData]);

  return (
    <Layout>
      {context.length > 0 && (
        <div className="container-fluid">
          <div className="row contenedor-descripcion-carreras">
            <div className="row descripcion-carreras">
              <div className="col-12 up-descripcion-carreras">
                <div>
                  <h2>{context[id]?.c[3]?.v}</h2>
                  <h3>Fecha {context[id]?.c[0]?.v}</h3>
                </div>
                <div>
                  <img src={context[id]?.c[4]?.v} alt="Circuito" />
                </div>
              </div>
              <div className="col-12 select-tandas-carreras">
                <div className='buttons-up-carreras'>
                  <div className='day-carreras'>
                    <h4>Sáb.</h4>
                  </div>
                  <div>
                  {context[id]?.c[8]?.v && (
  <button value={context[id]?.c[8]?.v} className={`button-tanda ${selectedButton === 'en1' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en1', '1° Entrenamiento')}>1° Entrenamiento</button>
)}
{context[id]?.c[9]?.v && (
  <button value={context[id]?.c[9]?.v} className={`button-tanda ${selectedButton === 'en2' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en2', '2° Entrenamiento')}>2° Entrenamiento</button>
)}
{context[id]?.c[10]?.v && (
  <button value={context[id]?.c[10]?.v} className={`button-tanda ${selectedButton === 'en3' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en3', '3° Entrenamiento')}>3° Entrenamiento</button>
)}
{context[id]?.c[11]?.v && (
  <button value={context[id]?.c[11]?.v} className={`button-tanda ${selectedButton === 'en4' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en4', '4° Entrenamiento')}>4° Entrenamiento</button>
)}
{context[id]?.c[12]?.v && (
  <button value={context[id]?.c[12]?.v} className={`button-tanda ${selectedButton === 'en5' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en5', '5° Entrenamiento')}>5° Entrenamiento</button>
)}
{context[id]?.c[13]?.v && (
  <button value={context[id]?.c[13]?.v} className={`button-tanda ${selectedButton === 'en6' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en6', '6° Entrenamiento')}>6° Entrenamiento</button>
)}
{context[id]?.c[14]?.v && (
  <button value={context[id]?.c[18]?.v} className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('clasificacion', 'Clasificacion')}>Clasificacion</button>
)}
                  </div>
                </div>
                <div className='buttons-down-carreras'>
                  <div className='day-carreras'>
                    <h4>Dom.</h4>
                  </div>
                  <div>
                  {context[id]?.c[15]?.v && (
  <button value={context[id]?.c[15]?.v} className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('serie1', 'Serie 1')}>Serie 1</button>
)}
{context[id]?.c[16]?.v && (
  <button value={context[id]?.c[16]?.v} className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('serie2', 'Serie 2')}>Serie 2</button>
)}
{context[id]?.c[17]?.v && (
  <button value={context[id]?.c[17]?.v} className={`button-tanda ${selectedButton === 'serie3' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('serie3', 'Serie 3')}>Serie 3</button>
)}
{context[id]?.c[18]?.v && (
  <button value={context[id]?.c[18]?.v} className={`button-tanda ${selectedButton === 'final' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('final', 'Final')}>Final</button>
)}

                  </div>
                </div>
                <div className="buttons-pilotos-horarios">
                {context[id]?.c[7]?.v && (
  <button value={context[id]?.c[7]?.v} className={`button-pilotos ${selectedButton === 'pilotos' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('pilotos', 'Pilotos')}>Pilotos</button>
)}
              {context[id]?.c[6]?.v && (
  <button value={context[id]?.c[6]?.v} className={`button-horarios ${selectedButton === 'horarios' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('horarios', 'Horarios')}>Horarios</button>
)}
                </div>
              </div>
            </div>
          </div>
          <div className="row contenedor-table-carreras">
  {loading ? (
    <div className="col-md-9 spinner-carreras">
      <CircleLoader color="#36D7B7" size={80} />
    </div>
  ) : (
    <div className='col-md-9'>
      {raceData && raceData.map((data, idx) => (
        <div key={idx}>
          <h3>{selectedButtonText}</h3>
          {selectedButton === 'pilotos' ? (
            <table className="table-carreras">
              <thead className='container-fluid'>
                <tr className='row'>
                  <th className='pos-carreras col-md-1'><h4>Número</h4></th>
                  <th className='piloto-carreras col-md-10'><h4>Piloto</h4></th>
                  <th className='piloto-carreras col-md-1'><h4>Marca</h4></th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((item, idx) => (
                  <tr className='row' key={idx}>
                    <td className='pos-carreras-td col-md-1'><h4>{item.numero}</h4></td>
                    <td className='piloto-carreras-td col-md-10'><h4>{item.piloto}</h4></td>
                    <td className='marca-carreras-td col-md-1'><h4>{item.marca}</h4></td>
                  </tr>
                ))}
              </tbody>
            </table>
) : selectedButton === 'horarios' ? (
  <table className="table-carreras">
      {data.results.map((item, idx) => (
          <React.Fragment key={idx}>
           
                  <tr className='row'>
                      <tr className='evento-carreras-td col-md-12'><h4>{item.title}</h4></tr>
                  </tr>
     
              <tbody>
                  {((item.horario && item.horario.trim() !== '') ||
                    (item.circuito && item.circuito.trim() !== '') ||
                    (item.tipo && item.tipo.trim() !== '') ||
                    (item.grupo && item.grupo.trim() !== '')) && ( // Verificar si al menos uno de los elementos está presente y no es vacío
                      <tr className='row'>
                          {item.horario && item.horario.trim() !== '' && <td className='horario-carreras-td col-md-3'><h4>{item.horario}</h4></td>}
                          {item.categoria && item.categoria.trim() !== '' && <td className='categoria-carreras-td col-md-2'><h4>{item.categoria}</h4></td>}
                          {item.tipo && item.tipo.trim() !== '' && <td className='tipo-carreras-td col-md-3'><h4>{item.tipo}</h4></td>}
                          {item.grupo && item.grupo.trim() !== '' && <td className='grupo-carreras-td col-md-4'><h4>{item.grupo}</h4></td>}
                      </tr>
                  )}
              </tbody>
          </React.Fragment>
      ))}
  </table>
) : (            <table className="table-carreras">
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
          )}
        </div>
      ))}
    </div>
  )}
  <div className="col-md-3">
    <CallActionNoticias filterDate={new Date(context[id]?.c[2]?.v)} />
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
