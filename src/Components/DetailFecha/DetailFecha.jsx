import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from 'react-router-dom';
import { useTc, useTcp, useTcm, useTcpm, useTcpk, useTcppk, useRally, useF1, useMgp, useIndy, useNas, useRmun, useFe, useTr, useTrSeries, useTp, useTc2000 } from '../../../Context/Context';
import CallActionNoticias from '../CallActionNoticias/CallActionNoticias';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { ClipLoader } from 'react-spinners';
import GeneralesCategoria from '../GeneralesCategoria/GeneralesCategoria';

const DetailFecha = ({ rowData }) => {
  const { categoria, id } = useParams();
  const [raceData, setRaceData] = useState([]);
  const [raceData2, setRaceData2] = useState([[], []]); // Inicializar raceData como dos arrays vacíos
  const [mostrarTablaTramo, setMostrarTablaTramo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButtonText, setSelectedButtonText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [buttonVisibility, setButtonVisibility] = useState([]);
  const [showTramoTable, setShowTramoTable] = useState(false);
  const [showClasificacionTable, setShowClasificacionTable] = useState(false);
  const [showShakeTable, setShowShakeTable] = useState(false);
  const [buttonData, setButtonData] = useState({});


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    case 'tr':
      context = useTr();
      break;
    case 'tr-series':
      context = useTrSeries();
      break;
    case 'tp':
      context = useTp();
      break;
    case 'tc2000':
      context = useTc2000();
      break;
    default:
      context = [];
  }

  useEffect(() => {
    // Verificar si la categoría es "rally-mundial"
    if (categoria === 'rally-mundial') {
      // Si la categoría es "rally-mundial", cargar los datos para el botón "Final"
      handleButtonClickRally('final');
    }
  }, [categoria]); // Asegúrate de agregar "categoria" como una dependencia para que useEffect se ejecute cuando cambie


  const handleButtonClick = (endpoint, buttonText) => {
    setSelectedButton(endpoint);
    setSelectedButtonText(buttonText);
    fetchSpecificData(endpoint); // Realizar el fetch cuando se hace clic en un botón específico
  };


  const getLastButtonRallyArgentino = (contextData) => {
    const buttons = [
      'shake', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'final'
    ];

    // Filtrar los botones disponibles según el contexto
    const availableButtons = buttons.filter(button => contextData?.c[buttons.indexOf(button) + 8]?.v);

    // Devolver el último botón disponible
    return availableButtons[availableButtons.length - 1];
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

  // FUNCION DEL FETCH
  const fetchSpecificData = async (endpoint) => {
    if (categoria !== 'rally-mundial') {
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
    }
  };

  useEffect(() => {
    const fetchLastButtonData = async () => {
      if (categoria !== 'rally-mundial') {
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
      }
    };

    fetchLastButtonData();
  }, [categoria, id]);

  // RALLY MUNDIAL
  const handleButtonClickRally = async (selectedButton) => {
    await fetchSpecificDataRally(selectedButton, id, setRaceData2, setLoading);
  };

  const fetchSpecificDataRally = async (selectedButton, id, setRaceData2, setLoading) => {
    setLoading(true); // Iniciar la carga
    try {
      const url = `http://localhost:5000/rally-mundial/${selectedButton}/${id}`;
      console.log('Enlace:', url); // Verificar el enlace en la consola
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        console.log('JSON Data:', jsonData); // Mostrar el JSON recibido en la consola

        // Actualizar el estado con los datos de las dos tablas
        setRaceData2([jsonData.col10 ? jsonData.col10 : [], jsonData.col11 ? jsonData.col11 : []]);
        console.log(raceData2);
      } else {
        console.error(`Error al obtener los datos de ${selectedButton}`);
        setRaceData2([[], []]); // Establecer arrays vacíos en caso de error
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setRaceData2([[], []]); // Establecer arrays vacíos en caso de error
    } finally {
      console.log(selectedButton); // Imprimir el botón clickeado en la consola
      setLoading(false); // Finalizar la carga
    }
  };
  const toggleMostrarTabla = () => {
    setMostrarTablaTramo(!mostrarTablaTramo);
  };

  const getMarcaImageUrl = (marca) => {
    if (marca && marca.includes('chevrolet')) {
      return 'chevrolet.png';
    } else if (marca && marca.includes('ford')) {
      return 'ford.png';
    }
    else if (marca && marca.includes('mustang')) {
      return 'mustang.png';
    }
    else if (marca && marca.includes('dodge')) {
      return 'dodge.png';
    }
    else if (marca && marca.includes('torino')) {
      return 'torino.png';
    }
    else if (marca && marca.includes('camaro')) {
      return 'camaro.png';
    }
    else if (marca && marca.includes('toyota')) {
      return 'toyota.png';
    }
    else if (marca && marca.includes('volkswagen')) {
      return 'volkswagen.png';
    }
    else if (marca && marca.includes('citroen')) {
      return 'citroen.png';
    }
    else if (marca && marca.includes('renault')) {
      return 'renault.png';
    }
    else if (marca && marca.includes('fiat')) {
      return 'fiat.png';
    }
    else if (marca && marca.includes('honda')) {
      return 'honda.png';
    }
    else if (marca && marca.includes('Red Bull Racing')) {
      return 'red.png';
    }
    else if (marca && marca.includes('Ferrari')) {
      return 'ferrari.png';
    }
    else {
      // Si la marca no coincide con chevrolet ni ford, puedes devolver una imagen por defecto
      return 'default.png';
    }
  };


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


  const fetchDataMenu = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${categoria}/menu/${id}`);
      const data = await response.json();
      setButtonData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataMenu();
  }, [categoria, id]);


  // Función para manejar el clic en un botón del menú
  const handleMenuButtonClick = (buttonName) => {
    console.log("Botón clickeado:", buttonName);
    const buttonInfo = actcButtons.find(button => button.tanda === buttonName);
    if (buttonInfo) {
      fetchSpecificData(buttonInfo.endpoint);
    } else {
      console.error(`No se encontró el endpoint para el botón ${buttonName}`);
    }
  };

  const actcButtons = [
    { tanda: "1\u00BA Entrenamiento", endpoint: "en1" },
    { tanda: "2\u00BA Entrenamiento", endpoint: "en2" },
    { tanda: "3\u00BA Entrenamiento", endpoint: "en3" },
    { tanda: "4\u00BA Entrenamiento", endpoint: "en4" },
    { tanda: "5\u00BA Entrenamiento", endpoint: "en5" },
    { tanda: "6\u00BA Entrenamiento", endpoint: "en6" },
    { tanda: "Clasificación", endpoint: "clasificacion" },
    { tanda: "1\u00BA Serie", endpoint: "serie1" },
    { tanda: "2\u00BA Serie", endpoint: "serie2" },
    { tanda: "3\u00BA Serie", endpoint: "serie3" },
    { tanda: "Final", endpoint: "final" }
  ];

  return (
    <Layout>
      {/* RALLY ARGENTINO */}
      {categoria === 'rally-argentino' ? (
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
                <div className={`buttons-up-carreras  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>                  <div>
                  {context[id]?.c[8]?.v && (
                    <button value={context[id]?.c[8]?.v} className={`button-tanda ${selectedButton === 'shake' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('shake', 'Shake')}>Shake</button>
                  )}
                  {context[id]?.c[9]?.v && (
                    <button
                      value={context[id]?.c[9]?.v}
                      className={`button-tanda ${selectedButton === 'p1' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p1', 'P.E 1')}>
                      {'P.E 1'}
                    </button>
                  )}
                  {context[id]?.c[10]?.v && (
                    <button
                      value={context[id]?.c[10]?.v}
                      className={`button-tanda ${selectedButton === 'p2' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p2', 'P.E 2')}>
                      {'P.E 2'}
                    </button>
                  )}
                  {context[id]?.c[11]?.v && (
                    <button
                      value={context[id]?.c[11]?.v}
                      className={`button-tanda ${selectedButton === 'p3' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p3', 'P.E 3')}>
                      {'P.E 3'}
                    </button>
                  )}
                  {context[id]?.c[12]?.v && (
                    <button
                      value={context[id]?.c[12]?.v}
                      className={`button-tanda ${selectedButton === 'p4' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p4', 'P.E 4')}>
                      {'P.E 4'}
                    </button>
                  )}
                  {context[id]?.c[13]?.v && (
                    <button
                      value={context[id]?.c[13]?.v}
                      className={`button-tanda ${selectedButton === 'p5' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p5', 'P.E 5')}>
                      {'P.E 5'}
                    </button>
                  )}
                  {context[id]?.c[14]?.v && (
                    <button
                      value={context[id]?.c[14]?.v}
                      className={`button-tanda ${selectedButton === 'p6' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p6', 'P.E 6')}>
                      {'P.E 6'}
                    </button>
                  )}
                  {context[id]?.c[15]?.v && (
                    <button
                      value={context[id]?.c[15]?.v}
                      className={`button-tanda ${selectedButton === 'p7' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p7', 'P.E 7')}>
                      {'P.E 7'}
                    </button>
                  )}
                  {context[id]?.c[16]?.v && (
                    <button
                      value={context[id]?.c[16]?.v}
                      className={`button-tanda ${selectedButton === 'p8' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p8', 'P.E 8')}>
                      {'P.E 8'}
                    </button>
                  )}
                  {context[id]?.c[17]?.v && (
                    <button
                      value={context[id]?.c[17]?.v}
                      className={`button-tanda ${selectedButton === 'p9' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p9', 'P.E 9')}>
                      {'P.E 9'}
                    </button>
                  )}
                  {context[id]?.c[18]?.v && (
                    <button
                      value={context[id]?.c[18]?.v}
                      className={`button-tanda ${selectedButton === 'p10' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p10', 'P.E 10')}>
                      {'P.E 10'}
                    </button>
                  )}
                  {context[id]?.c[19]?.v && (
                    <button
                      value={context[id]?.c[19]?.v}
                      className={`button-tanda ${selectedButton === 'p11' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p11', 'P.E 11')}>
                      {'P.E 11'}
                    </button>
                  )}
                  {context[id]?.c[20]?.v && (
                    <button
                      value={context[id]?.c[20]?.v}
                      className={`button-tanda ${selectedButton === 'p12' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p12', 'P.E 12')}>
                      {'P.E 12'}
                    </button>
                  )}
                  {context[id]?.c[21]?.v && (
                    <button
                      value={context[id]?.c[21]?.v}
                      className={`button-tanda ${selectedButton === 'p13' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p13', 'P.E 13')}>
                      {'P.E 13'}
                    </button>
                  )}
                  {context[id]?.c[22]?.v && (
                    <button
                      value={context[id]?.c[22]?.v}
                      className={`button-tanda ${selectedButton === 'p14' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p14', 'P.E 14')}>
                      {'P.E 14'}
                    </button>
                  )}
                  {context[id]?.c[23]?.v && (
                    <button
                      value={context[id]?.c[23]?.v}
                      className={`button-tanda ${selectedButton === 'p15' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p15', 'P.E 15')}>
                      {'P.E 15'}
                    </button>
                  )}
                  {context[id]?.c[24]?.v && (
                    <button
                      value={context[id]?.c[24]?.v}
                      className={`button-tanda ${selectedButton === 'p16' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p16', 'P.E 16')}>
                      {'P.E 16'}
                    </button>
                  )}
                </div>
                </div>
                <div className="buttons-pilotos-horarios">
                  <div className="buttons-pilotos-horarios">
                    <>
                      {context[id]?.c[7]?.v && (
                        <a href={context[id]?.c[7]?.v} className={`button-pilotos ${selectedButton === 'pilotos' ? 'selected-button' : ''}`}>Pilotos</a>
                      )}
                      {context[id]?.c[6]?.v && (
                        <a href={context[id]?.c[6]?.v} className={`button-horarios ${selectedButton === 'horarios' ? 'selected-button' : ''}`}>Horarios</a>
                      )}
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div className={`buttons-up-carreras  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>
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
                      <td className='evento-carreras-td col-12'><h4>Tabla de Todos los Pilotos</h4></td>
                    </tr>
                    <tr className='row'>
                      <th className='pos-carreras col-1'><h4>Pos</h4></th>
                      <th className='piloto-carreras col-5'><h4>Piloto / Navegante</h4></th>
                      <th className='tiempo-carreras col-2'><h4>Vuelta 1</h4></th>
                      <th className='dif-carreras col-2'><h4>Vuelta 2</h4></th>
                      <th className='dif-carreras col-2'><h4>Vuelta 3</h4></th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceData[0]?.results && Array.isArray(raceData[0].results) && raceData[0].results.map((item, idx) => (
                      <tr className='row' key={idx}>
                        <td className='pos-carreras-td col-1'><h4>{item.posicion}</h4></td>
                        <td className='piloto-carreras-td col-5'><h4>{item.piloto}</h4></td>
                        <td className='tiempo-carreras-td col-2'><h4>{item.tramo1}</h4></td>
                        <td className='dif-carreras-td col-2'><h4>{item.tramo2}</h4></td>
                        <td className='dif-carreras-td col-2'><h4>{item.tramo3}</h4></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          </div>
          <div className="row">
            <div className={`contenedor-table-carreras col-lg-9 ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>
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
                          <th className='dif-carreras col-md-2'><h4>Dif</h4></th>
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
                        <th className='dif-carreras col-md-2'><h4>Dif</h4></th>

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
                            <th className='dif-carreras col-md-2'><h4>Dif</h4></th>
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
            <div className={`col-lg-3  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>              <CallActionNoticias filterDate={new Date(context[id]?.c[2]?.v)} category={categoria} />
            </div>
          </div>
        </div>
      ) : categoria === 'rally-mundial' ? (
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
                <div className={`buttons-up-carreras  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>                  <div>
                  {context[id]?.c[9]?.v && (
                    <button className={`button-tanda ${selectedButton === 'shake' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('shake', 'Shake')}>Shake</button>
                  )}
                  {context[id]?.c[10]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p1' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p1', 'P.E 1')}>P.E 1</button>
                  )}
                  {context[id]?.c[12]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p2' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p2', 'P.E 2')}>P.E 2</button>
                  )}
                  {context[id]?.c[14]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p3' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p3', 'P.E 3')}>P.E 3</button>
                  )}
                  {context[id]?.c[16]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p4' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p4', 'P.E 4')}>P.E 4</button>
                  )}
                  {context[id]?.c[20]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p6' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p6', 'P.E 6')}>P.E 6</button>
                  )}
                  {context[id]?.c[22]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p7' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p7', 'P.E 7')}>P.E 7</button>
                  )}
                  {context[id]?.c[24]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p8' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p8', 'P.E 8')}>P.E 8</button>
                  )}
                  {context[id]?.c[26]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p9' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p9', 'P.E 9')}>P.E 9</button>
                  )}
                  {context[id]?.c[28]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p10' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p10', 'P.E 10')}>P.E 10</button>
                  )}
                  {context[id]?.c[30]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p11' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p11', 'P.E 11')}>P.E 11</button>
                  )}
                  {context[id]?.c[32]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p12' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p12', 'P.E 12')}>P.E 12</button>
                  )}
                  {context[id]?.c[34]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p13' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p13', 'P.E 13')}>P.E 13</button>
                  )}
                  {context[id]?.c[36]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p14' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p14', 'P.E 14')}>P.E 14</button>
                  )}
                  {context[id]?.c[38]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p15' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p15', 'P.E 15')}>P.E 15</button>
                  )}
                  {context[id]?.c[40]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p16' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p16', 'P.E 16')}>P.E 16</button>
                  )}
                  {context[id]?.c[42]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p17' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p17', 'P.E 17')}>P.E 17</button>
                  )}
                  {context[id]?.c[44]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p18' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p18', 'P.E 18')}>P.E 18</button>
                  )}
                  {context[id]?.c[46]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p19' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p19', 'P.E 19')}>P.E 19</button>
                  )}
                  {context[id]?.c[48]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p20' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p20', 'P.E 20')}>P.E 20</button>
                  )}
                  {context[id]?.c[50]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p21' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p21', 'P.E 21')}>P.E 21</button>
                  )}
                  {context[id]?.c[52]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p22' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p22', 'P.E 22')}>P.E 22</button>
                  )}
                  {context[id]?.c[54]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p23' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p23', 'P.E 23')}>P.E 23</button>
                  )}
                  {context[id]?.c[56]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p24' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p24', 'P.E 24')}>P.E 24</button>
                  )}
                  {context[id]?.c[58]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p25' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p25', 'P.E 25')}>P.E 25</button>
                  )}
                  {context[id]?.c[60]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p26' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p26', 'P.E 26')}>P.E 26</button>
                  )}
                  {context[id]?.c[62]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p27' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p27', 'P.E 27')}>P.E 27</button>
                  )}
                  {context[id]?.c[64]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p28' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p28', 'P.E 28')}>P.E 28</button>
                  )}
                  {context[id]?.c[66]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p29' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p29', 'P.E 29')}>P.E 29</button>
                  )}
                  {context[id]?.c[68]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p30' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p30', 'P.E 30')}>P.E 30</button>
                  )}

                  {context[id]?.c[70]?.v && (
                    <button className={`button-tanda ${selectedButton === 'final' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('final', 'Final')}>Final</button>
                  )}

                </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="button-tanda" onClick={toggleMostrarTabla}>Tramo</button>
            <button className="button-tanda" onClick={toggleMostrarTabla}>General</button>
          </div>
          <div className="row">
            {mostrarTablaTramo ? (
              <div className="contenedor-table-carreras col-lg-9">
                {loading ? (
                  <div className="spinner-container">
                    <ClipLoader color="#FE0" size={80} />
                  </div>
                ) : (
                  <table className='table-carreras'>
                    <thead>
                      <tr className='row'>
                        <th className='col-1 pos-carreras'><h4>Pos</h4></th>
                        <th className='col-1 numero-carreras'><h4>Núm</h4></th>
                        <th className='col-4 piloto-carreras'><h4>Piloto</h4></th>
                        <th className='col-3 marca-carreras'><h4>Marca</h4></th>
                        <th className='col-2 tiempo-carreras'><h4>Tiempo</h4></th>
                        <th className='col-1 dif-carreras'><h4>Dif</h4></th>
                      </tr>
                    </thead>
                    <tbody>
                      {raceData2[0] && raceData2[0].slice(2).map((row, index) => (
                        <tr className='row' key={index}>
                          <td className='col-1 pos-carreras-td'><h4>{row.posicion}</h4></td>
                          <td className='col-1 vueltas-carreras-td'><h4>{row.numero}</h4></td>
                          <td className='col-4 piloto-carreras-td'><h4>{row.piloto}</h4></td>
                          <td className='col-3 marca-carreras-td'>     {row.marca && <img src={`images/marcas/${getMarcaImageUrl(row.marca)}`} alt="" />}</td>
                          <td className='col-2 tiempo-carreras-td'><h4>{row.tiempo}</h4></td>
                          <td className='col-1 dif-carreras-td'> <h4>{row.dif}</h4></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}
            {!mostrarTablaTramo ? (
              <div className="contenedor-table-carreras col-lg-9">
                {loading ? (
                  <div className="spinner-container">
                    <ClipLoader color="#FE0" size={80} />
                  </div>
                ) : (
                  <table className='table-carreras'>
                    <thead>
                      <tr className='row'>
                        <th className='col-1 pos-carreras'><h4>Pos</h4></th>
                        <th className='col-1 numero-carreras'><h4>Núm</h4></th>
                        <th className='col-4 piloto-carreras'><h4>Piloto</h4></th>
                        <th className='col-3 marca-carreras'><h4>Marca</h4></th>
                        <th className='col-2 tiempo-carreras'><h4>Tiempo</h4></th>
                        <th className='col-1 dif-carreras'><h4>Dif</h4></th>
                      </tr>
                    </thead>
                    <tbody>
                      {raceData2[1] && raceData2[1].slice(2).map((row, index) => (
                        <tr className='row' key={index}>
                          <td className='col-1 pos-carreras-td'><h4>{row.posicion}</h4></td>
                          <td className='col-1 vueltas-carreras-td'><h4>{row.numero}</h4></td>
                          <td className='col-4 piloto-carreras-td'><h4>{row.piloto}</h4></td>
                          <td className='col-3 marca-carreras-td'> <h4>{row.marca}</h4></td>
                          <td className='col-2 tiempo-carreras-td'><h4>{row.tiempo2}</h4></td>
                          <td className='col-1 dif-carreras-td'> <h4>{row.dif2}</h4></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : null}
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
                  <div className="menu">
                    {Object.entries(buttonData).map(([day, buttons]) => (
                      <div key={day} className={`buttons-up-carreras ${day.toLowerCase()}-buttons-container ${buttons.length === 0 && day === 'Vie' ? 'none' : ''}`}>
                        <div className='day-carreras'>
                          <h4>{day}</h4>
                        </div>
                        {buttons.map((button, index) => (
                          <button key={index} className='button-tanda' data-name={button} onClick={() => handleMenuButtonClick(button)}>
                            {button}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* <div className="endpointes" style={{ display: 'none' }}>
                    {context[id]?.c[8]?.v && (
                      <button value={context[id]?.c[8]?.v} className={`button-tanda ${selectedButton === 'en1' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en1', '1° Entrenamiento')}>1° Entrenamiento</button>
                    )}
                    {context[id]?.c[9]?.v && (
                      <button value={context[id]?.c[9]?.v} className={`button-tanda ${selectedButton === 'en2' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en2', '2° Entrenamiento')}>2° Entrenamiento</button>
                    )}
                    {context[id]?.c[10]?.v && (
                      <button value={context[id]?.c[10]?.v} className={`button-tanda ${selectedButton === 'en3' ? 'selected-button' : ''}`} onClick={() => handleButtonClick('en3', '3° Entrenamiento')}>3° Entrenamiento</button>
                    )}
                    {
                      context[id]?.c[11]?.v && (
                        categoria === 'tp' ? (
                          <button
                            value={context[id]?.c[11]?.v}
                            className={`button-tanda ${selectedButton === 'en4' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('en4', 'TLL')}
                          >
                            TLL
                          </button>
                        ) : (
                          <button
                            value={context[id]?.c[11]?.v}
                            className={`button-tanda ${selectedButton === 'en4' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('en4', '4° Entrenamiento')}
                          >
                            4° Entrenamiento
                          </button>
                        )
                      )
                    }
                    {
                      context[id]?.c[12]?.v && (
                        categoria === 'tp' ? (
                          <button
                            value={context[id]?.c[12]?.v}
                            className={`button-tanda ${selectedButton === 'en5' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('en5', 'C1')}
                          >
                            C1
                          </button>
                        ) : (
                          <button
                            value={context[id]?.c[12]?.v}
                            className={`button-tanda ${selectedButton === 'en5' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('en5', '5° Entrenamiento')}
                          >
                            5° Entrenamiento
                          </button>
                        )
                      )
                    }
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
                      ) : categoria === 'tp' ? (
                        <button
                          value={context[id]?.c[13]?.v}
                          className={`button-tanda ${selectedButton === 'en6' ? 'selected-button' : ''}`}
                          onClick={() => handleButtonClick('en6', 'C2')}
                        >
                          C2
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
                        ) : categoria === 'tr' ? (
                          <button
                            value={context[id]?.c[14]?.v}
                            className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('clasificacion', 'Clasificacion Gral')}
                          >
                            1° Clas. (Gral)
                          </button>
                        )
                          : (
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
                        ) : categoria === 'nascar' ? (
                          <button
                            value={context[id]?.c[15]?.v}
                            className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('serie1', 'QA')}
                          >
                            QA
                          </button>
                        ) : categoria === 'tr' || categoria === 'tr-series' ? (
                          <button
                            value={context[id]?.c[15]?.v}
                            className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('serie1', 'Clasificacion 2')}
                          >
                            2° Clas.
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
                        ) : categoria === 'tr' || categoria === 'tr-series' ? (
                          <button
                            value={context[id]?.c[16]?.v}
                            className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                            onClick={() => handleButtonClick('serie2', 'Clas. 2')}
                          >
                            3° Clas.
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

                  </div> */}

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
                <div className={`col-lg-9`}>
                  {raceData && raceData.map((data, idx) => (
                    <div key={idx}>
                      <h3>{selectedButtonText}</h3>
                      {selectedButton === 'pilotos' ? (
                        <table className="table-carreras container-fluid">
                          <thead>
                            <tr className='row title-pilotos-carreras'>
                              <th className='pos-carreras col-2'><h4>Número</h4></th>
                              <th className='piloto-carreras col-8'><h4>Piloto</h4></th>
                              <th className='piloto-carreras col-2'><h4>Marca</h4></th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.results && Array.isArray(data.results) && data.results.map((item, idx) => (
                              <tr className='row description-pilotos-carreras' key={idx}>
                                {item.title && (
                                  <th className='title-carreras-th'><h4>{item.title}</h4></th>
                                )}
                                {item.numero && (
                                  <td className='pos-carreras-td col-2'><h4>{item.numero}</h4></td>
                                )}
                                {item.piloto && (
                                  <td className='piloto-carreras-td col-8'><h4>{item.piloto}</h4></td>
                                )}
                                {item.img && (
                                  <td className='img-carreras-td col-2'>
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
                                  <td className='evento-carreras-td col-12'><h4>{item.title}</h4></td>
                                </tr>
                              )}
                              <tbody>
                                {((item.horario && item.horario.trim() !== '') ||
                                  (item.circuito && item.circuito.trim() !== '') ||
                                  (item.tipo && item.tipo.trim() !== '') ||
                                  (item.grupo && item.grupo.trim() !== '')) && ( // Verificar si al menos uno de los elementos está presente y no es vacío
                                    <tr className='row'>
                                      {item.horario && item.horario.trim() !== '' && <td className='horario-carreras-td col-3'><h4>{item.horario}</h4></td>}
                                      {item.categoria && item.categoria.trim() !== '' && <td className='categoria-carreras-td col-2'><h4>{item.categoria}</h4></td>}
                                      {item.tipo && item.tipo.trim() !== '' && <td className='tipo-carreras-td col-3'><h4>{item.tipo}</h4></td>}
                                      {item.grupo && item.grupo.trim() !== '' && <td className='grupo-carreras-td col-4'><h4>{item.grupo}</h4></td>}
                                    </tr>
                                  )}
                              </tbody>
                            </React.Fragment>
                          ))}
                        </table>
                      ) : (<table className="table-carreras">
                        <thead className='container-fluid'>
                          <tr className='row'>
                            <th className='pos-carreras col-1'><h4>Pos</h4></th>
                            <th className='piloto-carreras col-4'><h4>Piloto</h4></th>
                            <th className='img-carreras col-2'><h4>Marca</h4></th>
                            <th className='vueltas-carreras col-1'><h4>Vtas</h4></th>
                            <th className='tiempo-carreras col-2'><h4>Tiempo</h4></th>
                            <th className='dif-carreras col-2'><h4>Dif</h4></th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.results && Array.isArray(data.results) && data.results.map((item, idx) => (
                            <tr className='row' key={idx}>
                              <td className='pos-carreras-td col-1'><h4>{item.pos}</h4></td>
                              <td className='piloto-carreras-td col-4'><h4>{item.piloto}</h4></td>
                              <td className='img-carreras-td col-2'><h4>{item.img}</h4></td>
                              <td className='vueltas-carreras-td col-1'><h4>{item.vueltas}</h4></td>
                              <td className='tiempo-carreras-td col-2'><h4>{item.tiempo}</h4></td>
                              <td className='dif-carreras-td col-2'><h4>{item.diferencia}</h4></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className={`col-lg-3 none-lg  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>                <CallActionNoticias filterDate={new Date(context[id]?.c[2]?.v)} category={categoria} />
              </div>
            </div>

            <div className="row">
              <div className={`col-12 col-lg-8  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>                <h2 className='margin-title'>Noticias</h2>
                <GeneralesCategoria filterDate={new Date(context[id]?.c[2]?.v)} cat={categoria} />
              </div>

              <div className={`col-lg-4  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>                <PublicidadVertical />
              </div>
            </div>
          </div>

        )
      )}
    </Layout>
  );

};

export default DetailFecha;
