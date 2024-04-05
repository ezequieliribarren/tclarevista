import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from 'react-router-dom';
import { useTc, useTcp, useTcm, useTcpm, useTcpk, useTcppk, useRally, useF1, useMgp, useIndy, useNas, useRmun, useFe } from '../../../Context/Context';
import CallActionNoticias from '../CallActionNoticias/CallActionNoticias';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { ClipLoader } from 'react-spinners';

const DetailFecha = ({ rowData }) => {
  const { categoria, id } = useParams();
  const [raceData, setRaceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButtonText, setSelectedButtonText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [buttonVisibility, setButtonVisibility] = useState([]); // Cambiado a un array para manejar la visibilidad de los botones
  const [showTramoTable, setShowTramoTable] = useState(false);
  const [showClasificacionTable, setShowClasificacionTable] = useState(false);
  const [showShakeTable, setShowShakeTable] = useState(false);



  const handleButtonClick = (endpoint, buttonText) => {
    setSelectedButton(endpoint);
    setSelectedButtonText(buttonText);
    fetchSpecificData(endpoint);
  };

  const getLastButton = () => {
    const buttons = [
      'en1', 'en2', 'en3', 'en4', 'en5', 'en6', 'clasificacion',
      'serie1', 'serie2', 'serie3', 'final'
    ];

    // Filtrar los botones disponibles según el contexto
    const availableButtons = buttons.filter(button => context[id]?.c[buttons.indexOf(button) + 8]?.v);

    // Devolver el último botón disponible
    return availableButtons[availableButtons.length - 1];
  };

  const getLastButtonRallyArgentino = (contextData) => {
    const buttons = [
      'shake', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22', 'p23', 'p24', 'p25', 'p26', 'p27', 'p28', 'p29', 'p30', 'final'
    ];

    // Filtrar los botones disponibles según el contexto
    const availableButtons = buttons.filter(button => contextData?.c[buttons.indexOf(button) + 8]?.v);

    // Devolver el último botón disponible
    return availableButtons[availableButtons.length - 1];
  };

  // FUNCION DEL FETCH
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
    const fetchLastButtonData = async () => {
      setLoading(true);
      try {
        let lastButton;
        if (categoria === 'rally-argentino') {
          lastButton = getLastButtonRallyArgentino(context[id]);
        } else {
          lastButton = getLastButton();
        }
        const response = await fetch(`http://localhost:5000/${categoria}/${lastButton}/${id}`);
        if (response.ok) {
          const jsonData = await response.json();
          setRaceData([{ url: lastButton, results: jsonData }]);
          setSelectedButton(lastButton);
        } else {
          console.error(`Error al obtener los datos de ${categoria}/${lastButton}/${id}`);
          setRaceData([]);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setRaceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLastButtonData();
  }, [categoria, id]);

  // FUNCION DE CONTEXTOS
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
    case 'rally-argentino':
      context = useRally();
      break;
    case 'f1':
      context = useF1();
      break;
    case 'moto-gp':
      context = useMgp();
      break;
    case 'indycar-series':
      context = useIndy();
      break;
    case 'nascar':
      context = useNas();
      break;
    case 'rally-mundial':
      context = useRmun();
      break;
    case 'formula-e':
      context = useFe();
      break;
    default:
      context = [];
  }

  // FUNCION PARA IMAGEN DE LA MARCA
  const getBrandFromImageUrl = (imageUrl) => {
    // Check if imageUrl is not null or undefined
    if (imageUrl && typeof imageUrl === 'string') {
      // Definir un objeto que mapee palabras clave de marcas a nombres de marcas
      const brandKeywords = {
        'chevrolet': 'chevrolet',
        'ford': 'ford',
        'torino': 'torino',
        'mustang': 'mustang',
        'camaro': 'camaro',
        'dodge': 'dodge',
        'skoda': 'skoda'
        // Agrega más marcas si es necesario
      };

      // Iterar a través de las palabras clave de las marcas
      for (const keyword in brandKeywords) {
        if (imageUrl.includes(keyword)) {
          return brandKeywords[keyword]; // Devuelve el nombre de la marca si se encuentra una coincidencia
        }
      }
    }

    return null; // Devuelve "Desconocida" si no se encuentra ninguna marca conocida
  };


  // FUNCIONES PARA MOSTRAR TABLAS 
  useEffect(() => {
    // Aquí puedes establecer el estado inicial según tus criterios
    // Por ejemplo, podrías mostrar la tabla de tramo por defecto
    setShowTramoTable(true);
    setShowClasificacionTable(false);
  }, []); // El array vacío como segundo argumento asegura que este efecto solo se ejecute una vez, al montar el componente

  const handleShowTramoTable = () => {
    setShowTramoTable(true);
    setShowClasificacionTable(false);
  };

  const handleShowClasificacionTable = () => {
    setShowTramoTable(false);
    setShowClasificacionTable(true);
  };

  const handleShowShakeTable = () => {
    setShowShakeTable(true); // Establecer showShakeTable en true cuando se hace clic en el botón "Shake"
    setShowClasificacionTable(false); // Asegúrate de ocultar la tabla de clasificación si estaba mostrada
    setShowTramoTable(false); // Asegúrate de ocultar la tabla de tramo si estaba mostrada
  };

  return (
    <Layout>
      {/* RALLY ARGENTINO */}
      {categoria === 'rally-argentino' || categoria === 'rally-mundial' ? (
        <div className='container-fluid'>
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
                  <div>
                    {context[id]?.c[8]?.v && (
                      <button value={context[id]?.c[8]?.v} className={`button-tanda ${selectedButton === 'shake' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('shake', 'Shake')}>Shake</button>
                    )}
                    {context[id]?.c[9]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[10]?.v : context[id]?.c[9]?.v}
                        className={`button-tanda ${selectedButton === 'p1' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p1', categoria === 'rally-mundial' ? 'SS1' : 'P.E 1')}>
                        {categoria === 'rally-mundial' ? 'SS1' : 'P.E 1'}
                      </button>
                    )}

                    {context[id]?.c[10]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[12]?.v : context[id]?.c[10]?.v}
                        className={`button-tanda ${selectedButton === 'p2' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p2', categoria === 'rally-mundial' ? 'SS2' : 'P.E 2')}>
                        {categoria === 'rally-mundial' ? 'SS2' : 'P.E 2'}
                      </button>
                    )}

                    {context[id]?.c[11]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[14]?.v : context[id]?.c[11]?.v}
                        className={`button-tanda ${selectedButton === 'p3' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p3', categoria === 'rally-mundial' ? 'SS3' : 'P.E 3')}>
                        {categoria === 'rally-mundial' ? 'SS3' : 'P.E 3'}
                      </button>
                    )}
                    {context[id]?.c[12]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[14]?.v : context[id]?.c[12]?.v}
                        className={`button-tanda ${selectedButton === 'p4' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p4', categoria === 'rally-mundial' ? 'SS4' : 'P.E 4')}>
                        {categoria === 'rally-mundial' ? 'SS4' : 'P.E 4'}
                      </button>
                    )}

                    {context[id]?.c[13]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[16]?.v : context[id]?.c[13]?.v}
                        className={`button-tanda ${selectedButton === 'p5' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p5', categoria === 'rally-mundial' ? 'SS5' : 'P.E 5')}>
                        {categoria === 'rally-mundial' ? 'SS5' : 'P.E 5'}
                      </button>
                    )}

                    {context[id]?.c[14]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[18]?.v : context[id]?.c[14]?.v}
                        className={`button-tanda ${selectedButton === 'p6' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p6', categoria === 'rally-mundial' ? 'SS6' : 'P.E 6')}>
                        {categoria === 'rally-mundial' ? 'SS6' : 'P.E 6'}
                      </button>
                    )}
                    {context[id]?.c[15]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[20]?.v : context[id]?.c[15]?.v}
                        className={`button-tanda ${selectedButton === 'p7' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p7', categoria === 'rally-mundial' ? 'SS7' : 'P.E 7')}>
                        {categoria === 'rally-mundial' ? 'SS7' : 'P.E 7'}
                      </button>
                    )}

                    {context[id]?.c[16]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[22]?.v : context[id]?.c[16]?.v}
                        className={`button-tanda ${selectedButton === 'p8' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p8', categoria === 'rally-mundial' ? 'SS8' : 'P.E 8')}>
                        {categoria === 'rally-mundial' ? 'SS8' : 'P.E 8'}
                      </button>
                    )}

                    {context[id]?.c[17]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[24]?.v : context[id]?.c[17]?.v}
                        className={`button-tanda ${selectedButton === 'p9' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p9', categoria === 'rally-mundial' ? 'SS9' : 'P.E 9')}>
                        {categoria === 'rally-mundial' ? 'SS9' : 'P.E 9'}
                      </button>
                    )}
                    {context[id]?.c[18]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[26]?.v : context[id]?.c[18]?.v}
                        className={`button-tanda ${selectedButton === 'p10' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p10', categoria === 'rally-mundial' ? 'SS10' : 'P.E 10')}>
                        {categoria === 'rally-mundial' ? 'SS10' : 'P.E 10'}
                      </button>
                    )}

                    {context[id]?.c[19]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[28]?.v : context[id]?.c[19]?.v}
                        className={`button-tanda ${selectedButton === 'p11' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p11', categoria === 'rally-mundial' ? 'SS11' : 'P.E 11')}>
                        {categoria === 'rally-mundial' ? 'SS11' : 'P.E 11'}
                      </button>
                    )}

                    {context[id]?.c[20]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[30]?.v : context[id]?.c[20]?.v}
                        className={`button-tanda ${selectedButton === 'p12' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p12', categoria === 'rally-mundial' ? 'SS12' : 'P.E 12')}>
                        {categoria === 'rally-mundial' ? 'SS12' : 'P.E 12'}
                      </button>
                    )}

                    {context[id]?.c[21]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[32]?.v : context[id]?.c[21]?.v}
                        className={`button-tanda ${selectedButton === 'p13' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p13', categoria === 'rally-mundial' ? 'SS13' : 'P.E 13')}>
                        {categoria === 'rally-mundial' ? 'SS13' : 'P.E 13'}
                      </button>
                    )}

                    {context[id]?.c[22]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[34]?.v : context[id]?.c[22]?.v}
                        className={`button-tanda ${selectedButton === 'p14' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p14', categoria === 'rally-mundial' ? 'SS14' : 'P.E 14')}>
                        {categoria === 'rally-mundial' ? 'SS14' : 'P.E 14'}
                      </button>
                    )}

                    {context[id]?.c[23]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[36]?.v : context[id]?.c[23]?.v}
                        className={`button-tanda ${selectedButton === 'p15' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p15', categoria === 'rally-mundial' ? 'SS15' : 'P.E 15')}>
                        {categoria === 'rally-mundial' ? 'SS15' : 'P.E 15'}
                      </button>
                    )}

                    {context[id]?.c[24]?.v && (
                      <button
                        value={categoria === 'rally-mundial' ? context[id]?.c[38]?.v : context[id]?.c[24]?.v}
                        className={`button-tanda ${selectedButton === 'p16' ? 'selected-button' : ''}`}
                        onClick={() => handleButtonClick('p16', categoria === 'rally-mundial' ? 'SS16' : 'P.E 16')}>
                        {categoria === 'rally-mundial' ? 'SS16' : 'P.E 16'}
                      </button>
                    )}

                  </div>
                </div>
                <div className="buttons-pilotos-horarios">
                  <div className="buttons-pilotos-horarios">
                    {categoria === 'rally-mundial' ? (
                      <>
                        {context[id]?.c[8]?.v && (
                          <a href={context[id]?.c[8]?.v} className={`button-pilotos ${selectedButton === 'pilotos' ? 'selected-button' : ''}`}>Pilotos</a>
                        )}
                        {context[id]?.c[7]?.v && (
                          <a href={context[id]?.c[7]?.v} className={`button-horarios ${selectedButton === 'horarios' ? 'selected-button' : ''}`}>Horarios</a>
                        )}
                      </>
                    ) : (
                      <>
                        {context[id]?.c[7]?.v && (
                          <a href={context[id]?.c[7]?.v} className={`button-pilotos ${selectedButton === 'pilotos' ? 'selected-button' : ''}`}>Pilotos</a>
                        )}
                        {context[id]?.c[6]?.v && (
                          <a href={context[id]?.c[6]?.v} className={`button-horarios ${selectedButton === 'horarios' ? 'selected-button' : ''}`}>Horarios</a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='buttons-up-carreras'>
              {selectedButton !== "shake" && ( // Mostrar los botones solo si no es "shake"
                <div className='buttons-up-carreras'>
                  <button className={`button-tanda ${showTramoTable ? 'selected-button' : ''} ${showTramoTable ? 'clicked-button' : ''}`} onClick={handleShowTramoTable}>Tramo</button>
                  <button className={`button-tanda ${showClasificacionTable ? 'selected-button' : ''} ${showClasificacionTable ? 'clicked-button' : ''}`} onClick={handleShowClasificacionTable}>Clasificación</button>
                </div>
              )}

              {selectedButton === "shake" && (
                <table className={`table-carreras ${showShakeTable ? '' : ''}`}>
                  <thead className='container-fluid'>
                    <tr className='row'>
                      <td className='evento-carreras-td col-md-12'><h4>Tabla de Todos los Pilotos</h4></td>
                    </tr>
                    <tr className='row'>
                      <th className='pos-carreras col-md-1'><h4>Pos</h4></th>
                      <th className='piloto-carreras col-md-5'><h4>Piloto / Navegante</h4></th>
                      <th className='tiempo-carreras col-md-2'><h4>Vuelta 1</h4></th>
                      <th className='dif-carreras col-md-2'><h4>Vuelta 2</h4></th>
                      <th className='dif-carreras col-md-2'><h4>Vuelta 3</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceData[0]?.results && Array.isArray(raceData[0].results) && raceData[0].results.map((item, idx) => (
                      <tr className='row' key={idx}>
                        <td className='pos-carreras-td col-md-1'><h4>{item.posicion}</h4></td>
                        <td className='piloto-carreras-td col-md-5'><h4>{item.piloto}</h4></td>
                        <td className='tiempo-carreras-td col-md-2'><h4>{item.tramo1}</h4></td>
                        <td className='dif-carreras-td col-md-2'><h4>{item.tramo2}</h4></td>
                        <td className='dif-carreras-td col-md-2'><h4>{item.tramo3}</h4></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>
          <div className="row">
            <div className="contenedor-table-carreras col-md-9">
              <div>
              </div>

              {loading ? (
                <div className="col-md-9 spinner-container">
                  <ClipLoader color="#FE0" size={80} />
                </div>
              ) : (
                <div className="contenedor-table-carreras">
                  {selectedButton !== "shake" && (
                    <table className={`table-carreras ${showTramoTable ? '' : 'none'}`}>
                      <thead className='container-fluid'>
                        <tr className='row'>
                          <td className='evento-carreras-td col-md-12'><h4>Posiciones en el tramo</h4></td>
                        </tr>
                        <tr className='row'>
                          <th className='pos-carreras col-md-1'><h4>Pos.</h4></th>
                          <th className='piloto-carreras col-md-7'><h4>Piloto / Navegante</h4></th>
                          <th className='tiempo-carreras col-md-2'><h4>Tiempo</h4></th>
                          <th className='dif-carreras col-md-2'><h4>Diferencia</h4></th>
                        </tr>
                      </thead>
                      <tbody>
                        {raceData[0]?.results && Array.isArray(raceData[0].results) && raceData[0].results.slice(2).map((item, idx) => (
                          idx % 2 === 0 && // Check for even indices
                          <tr className='row' key={idx}>
                            <td className='pos-carreras-td col-md-1'><h4>{item.posicion}</h4></td>
                            <td className='piloto-carreras-td col-md-7'><h4>{item.piloto}</h4></td>
                            <td className='tiempo-carreras-td col-md-2'><h4>{item.tiempo}</h4></td>
                            <td className='dif-carreras-td col-md-2'><h4>{item.dif}</h4></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <table className={`table-carreras ${showClasificacionTable ? '' : 'none'}`}>

                    <thead className='container-fluid'>
                      <tr className='row'>
                        <td className='evento-carreras-td col-md-12'><h4>Clasificacion General</h4></td>
                      </tr>
                      <tr className='row'>
                        <th className='pos-carreras col-md-1'><h4>Pos</h4></th>
                        <th className='piloto-carreras col-md-5'><h4>Piloto / Navegante</h4></th>
                        <th className='tiempo-carreras col-md-2'><h4>Marca</h4></th>
                        <th className='dif-carreras col-md-2'><h4>Tiempo</h4></th>
                        <th className='dif-carreras col-md-2'><h4>Diferencia</h4></th>

                      </tr>
                    </thead>
                    <tbody>
                      {raceData[0]?.results && Array.isArray(raceData[0].results) && raceData[0].results.slice(2).map((item, idx) => (
                        idx % 2 !== 0 && // Check for odd indices
                        <tr className='row' key={idx}>
                          <td className='pos-carreras-td col-md-1'><h4>{item.posicion}</h4></td>
                          <td className='piloto-carreras-td col-md-5'><h4>{item.piloto}</h4></td>
                          <td className='img-carreras-td col-md-2'>
                            {getBrandFromImageUrl(item.tiempo) && ( // Verifica si se encontró una marca en la imagen
                              <img src={`images/marcas/${getBrandFromImageUrl(item.tiempo)}.png`} alt={getBrandFromImageUrl(item.tiempo)} />
                            )}
                          </td>
                          <td className='tiempo-carreras-td col-md-2'><h4>{item.dif}</h4></td>
                          <td className='dif-carreras-td col-md-2'><h4>{item.dif2}</h4></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {selectedButton !== "shake" && (
                    <>
                      <table className={`table-carreras ${showTramoTable ? '' : 'none'}`}>
                        <thead className='container-fluid'>
                          <tr className='row'>
                            <td className='evento-carreras-td col-md-12'><h4>Posiciones en el tramo</h4></td>
                          </tr>
                          <tr className='row'>
                            <th className='pos-carreras col-md-1'><h4>Pos</h4></th>
                            <th className='piloto-carreras col-md-7'><h4>Piloto / Navegante</h4></th>
                            <th className='tiempo-carreras col-md-2'><h4>Tiempo</h4></th>
                            <th className='dif-carreras col-md-2'><h4>Diferencia</h4></th>
                          </tr>
                        </thead>
                        <tbody>
                          {raceData[0]?.results && Array.isArray(raceData[0].results) && raceData[0].results.map((item, idx) => (
                            <tr className='row' key={idx}>
                              <td className='pos-carreras-td col-md-1'><h4>{item.posicion}</h4></td>
                              <td className='piloto-carreras-td col-md-7'><h4>{item.piloto}</h4></td>
                              <td className='tiempo-carreras-td col-md-2'><h4>{item.tiempo}</h4></td>
                              <td className='dif-carreras-td col-md-2'><h4>{item.dif}</h4></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}

                </div>
              )}


            </div>
            <div className="col-md-3">
              <CallActionNoticias filterDate={new Date(context[id]?.c[2]?.v)} category={categoria} />



            </div>
          </div>



        </div>
      ) : (
        context.length > 0 && (
          // ACTC (TC-TCM-TCPK-TCPPK-TCPM)
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
                    {categoria !== 'f1' && categoria !== 'moto-gp' && categoria !== 'indycar-series' && categoria !== 'nascar' && categoria !== 'formula-e' && (
                      <div className='day-carreras'>
                        <h4>Sáb.</h4>
                      </div>
                    )}
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
                      {context[id]?.c[13]?.v &&
                        (categoria === 'moto-gp' ? (
                          <button
                            value={context[id]?.c[13]?.v}
                            className={`button-tanda ${selectedButton === 'en6' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('en6', 'PR')}
                          >
                            PR
                          </button>
                        ) : categoria === 'indycar-series' ? (
                          <button
                            value={context[id]?.c[13]?.v}
                            className={`button-tanda ${selectedButton === 'en6' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('en6', 'Q1 G1')}
                          >
                            Q1 G1
                          </button>
                        ) : (
                          <button
                            value={context[id]?.c[13]?.v}
                            className={`button-tanda ${selectedButton === 'en6' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('en6', '6° Entrenamiento')}
                          >
                            6° Entrenamiento
                          </button>
                        ))
                      }


                      {
                        context[id]?.c[14]?.v && (
                          categoria === 'moto-gp' ? (
                            <button
                              value={context[id]?.c[14]?.v}
                              className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('clasificacion', 'Q1')}
                            >
                              Q1
                            </button>
                          ) : categoria === 'indycar-series' ? (
                            <button
                              value={context[id]?.c[14]?.v}
                              className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('clasificacion', 'Q1 G2')}
                            >
                              Q1 G2
                            </button>
                          ) : (
                            <button
                              value={context[id]?.c[14]?.v}
                              className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('clasificacion', 'Clasificacion')}
                            >
                              Clasificación
                            </button>
                          )
                        )
                      }

                    </div>
                  </div>
                  <div className='buttons-down-carreras'>
                    {categoria !== 'f1' && categoria !== 'moto-gp' && categoria !== 'indycar-series' && categoria !== 'nascar' && categoria !== 'formula-e' && (
                      <div className='day-carreras'>
                        <h4>Dom.</h4>
                      </div>
                    )}
                    <div>
                      {
                        context[id]?.c[15]?.v && (
                          categoria === 'moto-gp' || categoria === 'indycar-series' ? (
                            <button
                              value={context[id]?.c[15]?.v}
                              className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie1', categoria === 'moto-gp' ? 'Q2' : 'Q2 G2')}
                            >
                              {categoria === 'moto-gp' ? 'Q2' : 'Q2 G2'}
                            </button>
                          ) : (
                            categoria === 'nascar' ? (
                              <button
                                value={context[id]?.c[15]?.v}
                                className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                                onClick={() => handleButtonClick('serie1', 'QA')}
                              >
                                QA
                              </button>
                            ) : (
                              <button
                                value={context[id]?.c[15]?.v}
                                className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                                onClick={() => handleButtonClick('serie1', 'Serie 1')}
                              >
                                Serie 1
                              </button>
                            )
                          )
                        )
                      }
                      {
                        context[id]?.c[16]?.v && (
                          categoria === 'moto-gp' ? (
                            <button
                              value={context[id]?.c[16]?.v}
                              className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie2', 'SPRINT')}
                            >
                              SPRINT
                            </button>
                          ) : categoria === 'indycar-series' ? (
                            <button
                              value={context[id]?.c[16]?.v}
                              className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie2', 'Q3')}
                            >
                              Q3
                            </button>
                          ) : categoria === 'nascar' ? (
                            <button
                              value={context[id]?.c[16]?.v}
                              className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie2', 'QB')}
                            >
                              QB
                            </button>
                          ) : (
                            <button
                              value={context[id]?.c[16]?.v}
                              className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie2', 'Serie 2')}
                            >
                              Serie 2
                            </button>
                          )
                        )
                      }


                      {
                        context[id]?.c[17]?.v && (
                          categoria === 'moto-gp' || categoria === 'indycar-series' ? (
                            <button
                              value={context[id]?.c[17]?.v}
                              className={`button-tanda ${selectedButton === 'serie3' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie3', 'WUP')}
                            >
                              Calentamiento
                            </button>
                          ) : categoria === 'nascar' ? (
                            <button
                              value={context[id]?.c[17]?.v}
                              className={`button-tanda ${selectedButton === 'serie3' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie3', 'QF')}
                            >
                              QF
                            </button>
                          ) : (
                            <button
                              value={context[id]?.c[17]?.v}
                              className={`button-tanda ${selectedButton === 'serie3' ? 'selected-button' : ''}`}
                              onClick={() => handleButtonClick('serie3', 'Serie 3')}
                            >
                              Serie 3
                            </button>
                          )
                        )
                      }

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
                <div className="col-md-9 spinner-container">
                  <ClipLoader color="#FE0" size={80} />
                </div>
              ) : (
                <div className='col-md-9'>
                  {raceData && raceData.map((data, idx) => (
                    <div key={idx}>
                      <h3>{selectedButtonText}</h3>
                      {selectedButton === 'pilotos' ? (
                        <table className="table-carreras container-fluid">
                          <thead>
                            <tr className='row title-pilotos-carreras'>
                              <th className='pos-carreras col-md-2'><h4>Número</h4></th>
                              <th className='piloto-carreras col-md-8'><h4>Piloto</h4></th>
                              <th className='piloto-carreras col-md-2'><h4>Marca</h4></th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.results && Array.isArray(data.results) && data.results.map((item, idx) => (
                              <tr className='row description-pilotos-carreras' key={idx}>
                                {item.title && (
                                  <th className='title-carreras-th'><h4>{item.title}</h4></th>
                                )}
                                {item.numero && (
                                  <td className='pos-carreras-td col-md-2'><h4>{item.numero}</h4></td>
                                )}
                                {item.piloto && (
                                  <td className='piloto-carreras-td col-md-8'><h4>{item.piloto}</h4></td>
                                )}
                                {item.img && (
                                  <td className='img-carreras-td col-md-2'>
                                    {getBrandFromImageUrl(item.img) && (
                                      <img src={`images/marcas/${getBrandFromImageUrl(item.img)}.png`} alt={getBrandFromImageUrl(item.img)} />
                                    )}
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : selectedButton === 'horarios' ? (
                        <table className="table-carreras">
                          {data.results && Array.isArray(data.results) && data.results.map((item, idx) => (
                            <React.Fragment key={idx}>
                              {item.title && ( // Verificar si item.title tiene contenido
                                <tr className='row'>
                                  <td className='evento-carreras-td col-md-12'><h4>{item.title}</h4></td>
                                </tr>
                              )}
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
                      ) : (<table className="table-carreras">
                        <thead className='container-fluid'>
                          <tr className='row'>
                            <th className='pos-carreras col-md-1'><h4>Pos</h4></th>
                            <th className='piloto-carreras col-md-4'><h4>Piloto</h4></th>
                            <th className='img-carreras col-md-2'><h4>Marca</h4></th>
                            <th className='vueltas-carreras col-md-1'><h4>Vueltas</h4></th>
                            <th className='tiempo-carreras col-md-2'><h4>Tiempo</h4></th>
                            <th className='dif-carreras col-md-2'><h4>Diferencia</h4></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.results && Array.isArray(data.results) && data.results.map((item, idx) => (
                            <tr className='row' key={idx}>
                              <td className='pos-carreras-td col-md-1'><h4>{item.pos}</h4></td>
                              <td className='piloto-carreras-td col-md-4'><h4>{item.piloto}</h4></td>
                              <td className='img-carreras-td col-md-2'><h4>{item.img}</h4></td>
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
                <CallActionNoticias filterDate={new Date(context[id]?.c[2]?.v)} category={categoria} />
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
        )
      )}

    </Layout>
  );
};

export default DetailFecha;
