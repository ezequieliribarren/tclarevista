import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import { useParams } from 'react-router-dom';
import { useTc, useTcp, useTcm, useTcpm, useTcpk, useTcppk, useRally, useF1, useMgp, useIndy, useNas, useRmun, useFe, useTr, useTrSeries, useTp, useTc2000, useTn, useTn3, useTp2, useTp1 } from '../../../Context/Context';
import CallActionNoticias from '../CallActionNoticias/CallActionNoticias';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { ClipLoader } from 'react-spinners';
import GeneralesCategoria from '../GeneralesCategoria/GeneralesCategoria';
import Semaforo from '../Semaforo/Semaforo';
import { useLocation } from 'react-router-dom';
import Semaforo2 from '../Semaforo2/Semaforo2';
import Finalizado from '../Finalizado/Finalizado';


const DetailFecha = ({ rowData }) => {
  const { categoria, id } = useParams();
  const [raceData, setRaceData] = useState([]);
  const [raceData2, setRaceData2] = useState([[], []]); // Inicializar raceData como dos arrays vacíos
  const [mostrarTablaTramo, setMostrarTablaTramo] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedButton2, setSelectedButton2] = useState(null);
  const [selectedButtonText, setSelectedButtonText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [buttonVisibility, setButtonVisibility] = useState([]);
  const [showTramoTable, setShowTramoTable] = useState(false);
  const [showClasificacionTable, setShowClasificacionTable] = useState(false);
  const [showShakeTable, setShowShakeTable] = useState(false);
  const [buttonData, setButtonData] = useState({});
  const location = useLocation();
  const backUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // Extraer el parámetro 'vivo' de la URL
  const esFechaEnVivo = new URLSearchParams(location.search).get('vivo') === 'true';

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
    case 'tp2':
      context = useTp2();
      break;
    case 'tp1':
      context = useTp1();
      break;
    case 'tc2000':
      context = useTc2000();
      break;
    case 'tn':
      context = useTn();
      break;
    case 'tn3':
      context = useTn3();
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

  // const handleMenuButtonClick2 = (button) => {
  //   setSelectedButton(button);
  //   // Aquí puedes agregar cualquier otra lógica que necesites al hacer clic en un botón
  // };

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
        const response = await fetch(`${backUrl}/${categoria}/${endpoint}/${id}`);
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
      setLoading(true);
      try {
        const lastButton = localStorage.getItem('lastButton');
        if (lastButton) {
          const response = await fetch(`http://localhost:5000/${categoria}/${lastButton}/${id}`);
          if (response.ok) {
            const jsonData = await response.json();
            setRaceData([{ url: lastButton, results: jsonData }]);
            setSelectedButton(lastButton);
          } else {
            console.error(`Error al obtener los datos de ${categoria}/${lastButton}/${id}`);
            setRaceData([]);
          }
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setRaceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLastButtonData();
  }, []); // Sin dependencias, se ejecuta solo una vez al montar el componente

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
    const marcaMinuscula = marca.toLowerCase(); // Convertir la marca a minúsculas

    if (marcaMinuscula.includes('chevrolet')) {
      return 'chevrolet.png';
    } else if (marcaMinuscula.includes('ford')) {
      return 'ford.png';
    } else if (marcaMinuscula.includes('mustang')) {
      return 'mustang.png';
    } else if (marcaMinuscula.includes('dodge')) {
      return 'dodge.png';
    } else if (marcaMinuscula.includes('torino')) {
      return 'torino.png';
    } else if (marcaMinuscula.includes('camaro')) {
      return 'camaro.png';
    } else if (marcaMinuscula.includes('toyota')) {
      return 'toyota.png';
    } else if (marcaMinuscula.includes('volkswagen')) {
      return 'volkswagen.png';
    } else if (marcaMinuscula.includes('citroen')) {
      return 'citroen.png';
    } else if (marcaMinuscula.includes('renault')) {
      return 'renault.png';
    } else if (marcaMinuscula.includes('fiat')) {
      return 'fiat.png';
    } else if (marcaMinuscula.includes('honda')) {
      return 'honda.png';
    } else if (marcaMinuscula.includes('red bull racing')) {
      return 'red.png';
    } else if (marcaMinuscula.includes('ferrari')) {
      return 'ferrari.png';
    } else if (marcaMinuscula.includes('ducati')) {
      return 'ducati.png';
    } else if (marcaMinuscula.includes('aprilia')) {
      return 'aprilia.png';
    } else if (marcaMinuscula.includes('yamaha')) {
      return 'yamaha.png';
    } else if (marcaMinuscula.includes('ktm')) {
      return 'ktm.png';
    } else if (marcaMinuscula.includes('focus')) {
      return 'ford.png';
    } else if (marcaMinuscula.includes('cruze')) {
      return 'chevrolet.png';
    } else if (marcaMinuscula.includes('corolla')) {
      return 'toyota.png';
    } else if (marcaMinuscula.includes('tipo')) {
      return 'fiat.png';
    } else if (marcaMinuscula.includes('c-')) {
      return 'citroen.png';
    } else if (marcaMinuscula.includes('civic')) {
      return 'honda.png';
    } else if (marcaMinuscula.includes('408')) {
      return 'peugeot.png';
    } else if (marcaMinuscula.includes('lexus')) {
      return 'lexus.png';
    } else if (marcaMinuscula.includes('mercedes')) {
      return 'mercedes.png';
    } else if (marcaMinuscula.includes('benz')) {
      return 'mercedes.png';
    } else if (marcaMinuscula.includes('penske')) {
      return 'penske.png';
    } else if (marcaMinuscula.includes('mclaren')) {
      return 'mclaren.png';
    } else if (marcaMinuscula.includes('andretti')) {
      return 'andretti.png';
    } else {
      // Si la marca no coincide con ninguna, puedes devolver una imagen por defecto
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

      // Obtener el último botón del menú
      const lastButton = Object.values(data).flat().slice(-1)[0];
      console.log('Último botón:', lastButton);

      // Obtener la información del botón desde actcButtons
      const buttonInfo = actcButtons.find(button => {
        if (Array.isArray(button.tanda)) {
          return button.tanda.includes(lastButton);
        } else {
          return button.tanda === lastButton;
        }
      });

      // Realizar el fetch con el endpoint del último botón
      if (buttonInfo) {
        fetchSpecificData(buttonInfo.endpoint);
      } else {
        console.error(`No se encontró el endpoint para el botón ${lastButton}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataMenu();
  }, [categoria, id]);

  // Función para manejar el clic en un botón del menú
  const handleMenuButtonClick = (buttonName) => {
    localStorage.setItem('lastButton', buttonName);
    const buttonInfo = actcButtons.find(button => {
      if (Array.isArray(button.tanda)) {
        // Si la tanda es un array, busca en cada opción
        return button.tanda.includes(buttonName);
      } else {
        // Si la tanda no es un array, busca la coincidencia directamente
        return button.tanda === buttonName;
      }
    });
    if (buttonInfo) {
      fetchSpecificData(buttonInfo.endpoint);
    } else {
      console.error(`No se encontró el endpoint para el botón ${buttonName}`);
    }
  };

  const actcButtons = [
    { tanda: ["1\u00BA Entrenamiento", "1\u00BA ENTRENAMIENTO C2", "1\u00BA ENTRENAMIENTO C3", "E1"], endpoint: "en1" },
    { tanda: "FIRST PRACTICE SESSION", endpoint: "en1" },
    { tanda: ["2\u00BA Entrenamiento", "2\u00BA ENTRENAMIENTO C2", "2\u00BA ENTRENAMIENTO C3", "E2"], endpoint: "en2" },
    { tanda: "SECOND PRACTICE SESSION", endpoint: "en2" },
    { tanda: ["3\u00BA Entrenamiento", "GENERAL ENTRENAMIENTO C2", "GENERAL ENTRENAMIENTO C3", "EG"], endpoint: "en3" },
    { tanda: "THIRD PRACTICE SESSION", endpoint: "en3" },
    { tanda: ["4\u00BA Entrenamiento", "TLL"], endpoint: "en4" },
    { tanda: ["5\u00BA Entrenamiento", "1° CLASIFICACIÓN C2", "1° CLASIFICACIÓN C3", "C1"], endpoint: "en5" },
    { tanda: ["6\u00BA Entrenamiento", "2° CLASIFICACIÓN C2", "2° CLASIFICACIÓN C3", "C2"], endpoint: "en6" },
    { tanda: "1\u00BA Pruebas Libres", endpoint: "en4" },
    { tanda: ["Clasificación", "Clasificación Todos Juntos", "Clasificación Todos Juntos TRV6 2024 ", "QUALIFYING SESSION", "CLASIFICACION C2", "CG"], endpoint: "clasificacion" },
    { tanda: ["1\u00BA Serie", "Clasificación 1\u00BA al 10\u00BA TRV6 2024", "PRIMERA SERIE C2", "PRIMERA SERIE C3", "Serie 1"], endpoint: "serie1" },
    { tanda: ["2\u00BA Serie", "Clasificación 1\u00BA al 5\u00BA TRV6 2024", "Clasificación Especial Top Race V6", "SEGUNDA SERIE C2", "SEGUNDA SERIE C3", "Serie 2"], endpoint: "serie2" },
    { tanda: ["3\u00BA Serie", "Sprint 2024", "TERCERA SERIE C2", "TERCERA SERIE C3", "Serie 3"], endpoint: "serie3" },
    { tanda: ["Final", "Final 2024", "GRAND PRIX", "Final Especial 2024", "FINAL C2", "FINAL C3"], endpoint: "final" },
  ];

  function mapTandaToSpanish(tanda) {
    const tandaMappings = {
      "FIRST PRACTICE SESSION": "1° Entrenamiento",
      "Final 2024": "Final",
      "Final Especial 2024": "Final",
      "Clasificación Especial Top Race V6": "Clasificación",
      "SECOND PRACTICE SESSION": "2° Entrenamiento",
      "THIRD PRACTICE SESSION": "3° Entrenamiento",
      "FOURTH PRACTICE SESSION": "4° Entrenamiento",
      "FIFTH PRACTICE SESSION": "5° Entrenamiento",
      "SIXTH PRACTICE SESSION": "6° Entrenamiento",
      "QUALIFYING SESSION": "Clasificación",
      "GRAND PRIX": "Final",
      "1\u00BA Pruebas Libres": "Libres",
      "Clasificación Todos Juntos TRV6 2024": "Clasificacion",
      "Clasificación 1\u00BA al 10\u00BA TRV6 2024": "Clas. 1 al 10",
      "Clasificación 1\u00BA al 5\u00BA TRV6 2024": "Clas. 1 al 5",
      "1° ENTRENAMIENTO C2": "1° Entrenamiento",
      "2° ENTRENAMIENTO C2": "2° Entrenamiento",
      "1° ENTRENAMIENTO C3": "1° Entrenamiento",
      "2° ENTRENAMIENTO C3": "2° Entrenamiento",
      "PRIMERA SERIE C2": "1° Serie",
      "SEGUNDA SERIE C2": "2° Serie",
      "TERCERA SERIE C2": "3° Serie",
      "PRIMERA SERIE C3": "1° Serie",
      "SEGUNDA SERIE C3": "2° Serie",
      "TERCERA SERIE C3": "3° Serie",
      "1° CLASIFICACIÓN C2": "1° Clas",
      "2° CLASIFICACIÓN C2": "2° Clas",
      "1° CLASIFICACIÓN C3": "1° Clas",
      "2° CLASIFICACIÓN C3": "2° Clas",
      "GENERAL CLASIFICACIÓN": "Clasificación",
      "GENERAL ENTRENAMIENTO C2": "3° Entrenamiento",
      "GENERAL ENTRENAMIENTO C3": "3 Entrenamiento",
      "FINAL C2": "Final",
      "FINAL C3": "Final",


      // Agrega aquí más mapeos según sea necesario
    };

    // Buscar coincidencias parciales en los nombres de las tandas
    const tandaSpanish = Object.entries(tandaMappings).find(([key]) => tanda.includes(key));

    // Si se encuentra una coincidencia, devolver la traducción en español
    if (tandaSpanish) {
      return tandaSpanish[1];
    }

    // Si no se encuentra coincidencia, devolver la tanda original
    return tanda;
  }

  // DIA DE LA SEMANA
  const getDayOfWeek = (dateString, addDay = false) => {
    if (!dateString) {
      return '';
    }

    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day); // Mes en JavaScript es 0-indexed, por eso month - 1
    if (addDay) {
      date.setDate(date.getDate() + 1); // Sumar un día si se especifica
    }
    return date.toLocaleDateString('es-ES', { weekday: 'short' }).replace('.', '');
  };
  
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
                  <img style={{ maxWidth: '19rem' }} className='img-fluid' src={context[id]?.c[4]?.v} alt="Circuito" />                </div>
              </div>
              <div className="col-12 select-tandas-carreras rally-argentino">
                <div className="buttons-up-carreras"  >                  <div>
                  <div className="day-carreras"><h4>{getDayOfWeek(context[id]?.c[2]?.v)}</h4></div>
                  {context[id]?.c[8]?.v && context[id]?.c[8]?.v !== '-' && (
                    <button
                      value={context[id]?.c[8]?.v}
                      className={`button-tanda ${selectedButton === 'shake' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('shake', 'Shake')}
                    >
                      Shake
                    </button>
                  )}
                  {context[id]?.c[9]?.v && context[id]?.c[9]?.v !== '-' && (
                    <button
                      value={context[id]?.c[9]?.v}
                      className={`button-tanda ${selectedButton === 'p1' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p1', 'Especial 1')}
                    >
                      Especial 1
                    </button>
                  )}
                  {context[id]?.c[10]?.v && context[id]?.c[10]?.v !== '-' && (
                    <button
                      value={context[id]?.c[10]?.v}
                      className={`button-tanda ${selectedButton === 'p2' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p2', 'Especial 2')}
                    >
                      Especial 2
                    </button>
                  )}
                  {context[id]?.c[11]?.v && context[id]?.c[11]?.v !== '-' && (
                    <button
                      value={context[id]?.c[11]?.v}
                      className={`button-tanda ${selectedButton === 'p3' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p3', 'Especial 3')}
                    >
                      Especial 3
                    </button>
                  )}
                  {context[id]?.c[12]?.v && context[id]?.c[12]?.v !== '-' && (
                    <button
                      value={context[id]?.c[12]?.v}
                      className={`button-tanda ${selectedButton === 'p4' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p4', 'Especial 4')}
                    >
                      Especial 4
                    </button>
                  )}
                  {context[id]?.c[13]?.v && context[id]?.c[13]?.v !== '-' && (
                    <button
                      value={context[id]?.c[13]?.v}
                      className={`button-tanda ${selectedButton === 'p5' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p5', 'Especial 5')}
                    >
                      Especial 5
                    </button>
                  )}
                </div>
                </div>
                <div className="buttons-up-carreras">
                  <div className="day-carreras"><h4>{getDayOfWeek(context[id]?.c[2]?.v, true)}</h4></div>
                  {context[id]?.c[14]?.v && context[id]?.c[14]?.v !== '-' && (
                    <button
                      value={context[id]?.c[14]?.v}
                      className={`button-tanda ${selectedButton === 'p6' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p6', 'Especial 6')}
                    >
                      Especial 6
                    </button>
                  )}
                  {context[id]?.c[15]?.v && context[id]?.c[15]?.v !== '-' && (
                    <button
                      value={context[id]?.c[15]?.v}
                      className={`button-tanda ${selectedButton === 'p7' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p7', 'Especial 7')}
                    >
                      Especial 7
                    </button>
                  )}
                  {context[id]?.c[16]?.v && context[id]?.c[16]?.v !== '-' && (
                    <button
                      value={context[id]?.c[16]?.v}
                      className={`button-tanda ${selectedButton === 'p8' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p8', 'Especial 8')}
                    >
                      Especial 8
                    </button>
                  )}
                  {context[id]?.c[17]?.v && context[id]?.c[17]?.v !== '-' && (
                    <button
                      value={context[id]?.c[17]?.v}
                      className={`button-tanda ${selectedButton === 'p9' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p9', 'Especial 9')}
                    >
                      Especial 9
                    </button>
                  )}
                  {context[id]?.c[18]?.v && context[id]?.c[18]?.v !== '-' && (
                    <button
                      value={context[id]?.c[18]?.v}
                      className={`button-tanda ${selectedButton === 'p10' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p10', 'Especial 10')}
                    >
                      Especial 10
                    </button>
                  )}
                  {context[id]?.c[19]?.v && context[id]?.c[19]?.v !== '-' && (
                    <button
                      value={context[id]?.c[19]?.v}
                      className={`button-tanda ${selectedButton === 'p11' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p11', 'Especial 11')}
                    >
                      Especial 11
                    </button>
                  )}
                  {context[id]?.c[20]?.v && context[id]?.c[20]?.v !== '-' && (
                    <button
                      value={context[id]?.c[20]?.v}
                      className={`button-tanda ${selectedButton === 'p12' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p12', 'Especial 12')}
                    >
                      Especial 12
                    </button>
                  )}
                  {context[id]?.c[21]?.v && context[id]?.c[21]?.v !== '-' && (
                    <button
                      value={context[id]?.c[21]?.v}
                      className={`button-tanda ${selectedButton === 'p13' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p13', 'Especial 13')}
                    >
                      Especial 13
                    </button>
                  )}
                  {context[id]?.c[22]?.v && context[id]?.c[22]?.v !== '-' && (
                    <button
                      value={context[id]?.c[22]?.v}
                      className={`button-tanda ${selectedButton === 'p14' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p14', 'Especial 14')}
                    >
                      Especial 14
                    </button>
                  )}
                  {context[id]?.c[23]?.v && context[id]?.c[23]?.v !== '-' && (
                    <button
                      value={context[id]?.c[23]?.v}
                      className={`button-tanda ${selectedButton === 'p15' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p15', 'Especial 15')}
                    >
                      Especial 15
                    </button>
                  )}
                  {context[id]?.c[24]?.v && context[id]?.c[24]?.v !== '-' && (
                    <button
                      value={context[id]?.c[24]?.v}
                      className={`button-tanda ${selectedButton === 'p16' ? 'selected-button' : ''}`}
                      onClick={() => handleButtonClick('p16', 'Especial 16')}
                    >
                      Especial 16
                    </button>
                  )}
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
                      <td className='evento-carreras-td col-12'><h4>Shake</h4></td>
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
                </div>
              )}
            </div>
            <div className={`col-lg-3  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>
              <CallActionNoticias filterDate={new Date(context[id]?.c[2]?.v)} category={categoria} />
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
                  <img style={{ maxWidth: '19rem' }} className='img-fluid' src={context[id]?.c[4]?.v} alt="Circuito" />                </div>
              </div>
              <div className="col-12 select-tandas-carreras">
                <div className='d-flex' style={{ flexWrap: "wrap" }}>
                  {context[id]?.c[9]?.v && (
                    <button className={`button-tanda ${selectedButton === 'shake' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('shake', 'Shake')}>Shake</button>
                  )}
                  {context[id]?.c[10]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p1' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p1', 'Especial 1')}>Especial 1</button>
                  )}
                  {context[id]?.c[12]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p2' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p2', 'Especial 2')}>Especial 2</button>
                  )}
                  {context[id]?.c[14]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p3' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p3', 'Especial 3')}>Especial 3</button>
                  )}
                  {context[id]?.c[16]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p4' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p4', 'Especial 4')}>Especial 4</button>
                  )}
                  {context[id]?.c[20]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p6' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p6', 'Especial 6')}>Especial 6</button>
                  )}
                  {context[id]?.c[22]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p7' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p7', 'Especial 7')}>Especial 7</button>
                  )}
                  {context[id]?.c[24]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p8' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p8', 'Especial 8')}>Especial 8</button>
                  )}
                  {context[id]?.c[26]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p9' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p9', 'Especial 9')}>Especial 9</button>
                  )}
                  {context[id]?.c[28]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p10' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p10', 'Especial 10')}>Especial 10</button>
                  )}
                  {context[id]?.c[30]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p11' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p11', 'Especial 11')}>Especial 11</button>
                  )}
                  {context[id]?.c[32]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p12' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p12', 'Especial 12')}>Especial 12</button>
                  )}
                  {context[id]?.c[34]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p13' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p13', 'Especial 13')}>Especial 13</button>
                  )}
                  {context[id]?.c[36]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p14' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p14', 'Especial 14')}>Especial 14</button>
                  )}
                  {context[id]?.c[38]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p15' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p15', 'Especial 15')}>Especial 15</button>
                  )}
                  {context[id]?.c[40]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p16' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p16', 'Especial 16')}>Especial 16</button>
                  )}
                  {context[id]?.c[42]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p17' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p17', 'Especial 17')}>Especial 17</button>
                  )}
                  {context[id]?.c[44]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p18' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p18', 'Especial 18')}>Especial 18</button>
                  )}
                  {context[id]?.c[46]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p19' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p19', 'Especial 19')}>Especial 19</button>
                  )}
                  {context[id]?.c[48]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p20' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p20', 'Especial 20')}>Especial 20</button>
                  )}
                  {context[id]?.c[50]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p21' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p21', 'Especial 21')}>Especial 21</button>
                  )}
                  {context[id]?.c[52]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p22' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p22', 'Especial 22')}>Especial 22</button>
                  )}
                  {context[id]?.c[54]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p23' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p23', 'Especial 23')}>Especial 23</button>
                  )}
                  {context[id]?.c[56]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p24' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p24', 'Especial 24')}>Especial 24</button>
                  )}
                  {context[id]?.c[58]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p25' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p25', 'Especial 25')}>Especial 25</button>
                  )}
                  {context[id]?.c[60]?.v && (
                    <button className={`button-tanda ${selectedButton === 'p26' ? 'selected-button' : ''}`} onClick={() => handleButtonClickRally('p26', 'Especial 26')}>Especial 26</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex' style={{ paddingLeft: "2.5%" }}>
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
                    <img style={{ maxWidth: '19rem' }} className='img-fluid' src={context[id]?.c[4]?.v} alt="Circuito" />
                  </div>
                </div>
                <div className="col-12 select-tandas-carreras">
                  {categoria === 'moto-gp' && (
                    <div className="menu2">
                      <div className='d-flex'>
                        <div className="day-carreras">
                          <h4>Vie</h4>
                        </div>
                        {context[id]?.c[8]?.v !== null && context[id]?.c[8]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en1' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en1')}
                          >
                            1° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[9]?.v !== null && context[id]?.c[9]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en2' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en2')}
                          >
                            2° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[10]?.v !== null && context[id]?.c[10]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en3' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en3')}
                          >
                            Práctica
                          </button>
                        )}
                      </div>

                      <div className='d-flex'>
                        <div className="day-carreras">
                          <h4>Sab</h4>
                        </div>
                        {context[id]?.c[11]?.v !== null && context[id]?.c[11]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en4' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en4')}
                          >
                            4° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[12]?.v !== null && context[id]?.c[12]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en5' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en5')}
                          >
                            5° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[13]?.v !== null && context[id]?.c[13]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en6' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en6')}
                          >
                            PR
                          </button>
                        )}
                        {context[id]?.c[14]?.v !== null && context[id]?.c[14]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('clasificacion')}
                          >
                            Clasificación
                          </button>
                        )}
                        {context[id]?.c[15]?.v !== null && context[id]?.c[15]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie1')}
                          >
                            Q2
                          </button>
                        )}
                        {context[id]?.c[16]?.v !== null && context[id]?.c[16]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie2')}
                          >
                            SPRINT
                          </button>
                        )}
                        {context[id]?.c[17]?.v !== null && context[id]?.c[17]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie3' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie3')}
                          >
                            Sprint
                          </button>
                        )}
                      </div>

                      <div className='d-flex'>
                        <div className="day-carreras">
                          <h4>Dom</h4>
                        </div>
                        {context[id]?.c[18]?.v !== null && context[id]?.c[18]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'final' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('final')}
                          >
                            Final
                          </button>
                        )}
                      </div>

                    </div>
                  )}
                  {categoria === 'formula-e' && (
                    <div className="menu2">
                      <div className='d-flex'>
                        <div className="day-carreras">
                          <h4>{getDayOfWeek(context[id]?.c[2]?.v)}</h4>
                        </div>
                        {context[id]?.c[8]?.v !== null && context[id]?.c[8]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en1' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en1')}
                          >
                            1° Entrenamiento
                          </button>
                        )}
                      </div>
                      <div className='d-flex'>
                        <div className="day-carreras">
                          <h4>{getDayOfWeek(context[id]?.c[2]?.v, true)}</h4>
                        </div>
                        {context[id]?.c[9]?.v !== null && context[id]?.c[9]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en2' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en2')}
                          >
                            2° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[14]?.v !== null && context[id]?.c[14]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('clasificacion')}
                          >
                            Clasificación
                          </button>
                        )}
                        {context[id]?.c[18]?.v !== null && context[id]?.c[18]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'final' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('final')}
                          >
                            Final
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  {categoria === 'indycar-series' && (
                    <div className="menu2">
                      <div className='d-flex' style={{ flexWrap: "wrap" }}>
                        {context[id]?.c[8]?.v !== null && context[id]?.c[8]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en1' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en1')}
                          >
                            1° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[9]?.v !== null && context[id]?.c[9]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en2' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en2')}
                          >
                            2° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[13]?.v !== null && context[id]?.c[13]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en6' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en6')}
                          >
                            Q1 G1
                          </button>
                        )}
                        {context[id]?.c[14]?.v !== null && context[id]?.c[14]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'clasificacion' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('clasificacion')}
                          >
                            Q1 G2
                          </button>
                        )}
                        {context[id]?.c[15]?.v !== null && context[id]?.c[15]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie1')}
                          >
                            Q2
                          </button>
                        )}
                        {context[id]?.c[16]?.v !== null && context[id]?.c[16]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie2')}
                          >
                            Q3
                          </button>
                        )}
                        {context[id]?.c[17]?.v !== null && context[id]?.c[17]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie3' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie3')}
                          >
                            Calentamiento
                          </button>
                        )}
                        {context[id]?.c[18]?.v !== null && context[id]?.c[18]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'final' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('final')}
                          >
                            Final
                          </button>
                        )}



                      </div>

                    </div>
                  )}
                  {categoria === 'nascar' && (
                    <div className="menu2">
                      <div className='d-flex' style={{ flexWrap: "wrap" }}>
                        {context[id]?.c[8]?.v !== null && context[id]?.c[8]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en1' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en1')}
                          >
                            1° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[9]?.v !== null && context[id]?.c[9]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'en2' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('en2')}
                          >
                            2° Entrenamiento
                          </button>
                        )}
                        {context[id]?.c[15]?.v !== null && context[id]?.c[15]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie1' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie1')}
                          >
                            Q1
                          </button>
                        )}
                        {context[id]?.c[16]?.v !== null && context[id]?.c[16]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie2' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie2')}
                          >
                            Q2
                          </button>
                        )}
                        {context[id]?.c[17]?.v !== null && context[id]?.c[17]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'serie3' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('serie3')}
                          >
                            Q3
                          </button>
                        )}
                        {context[id]?.c[18]?.v !== null && context[id]?.c[18]?.v !== '-' && (
                          <button
                            className={`button-tanda ${selectedButton === 'final' ? 'selected-button' : ''}`}
                            onClick={() => fetchSpecificData('final')}
                          >
                            Final
                          </button>
                        )}
                      </div>

                    </div>
                  )}
                  {categoria !== 'moto-gp' && categoria !== 'indicar-series' && categoria !== 'nascar' && categoria !== 'formula-e' && (
                    <div className="menu">
                      {Object.entries(buttonData).map(([day, buttons], index) => (
                        <div key={day} className={`buttons-up-carreras ${day.toLowerCase()}-buttons-container ${buttons.length === 0 && day === 'Vie' ? 'none' : ''}`}>
                          <div className='day-carreras'>
                            <h4>{day}</h4>
                          </div>
                          {buttons.map((button, buttonIndex) => (
                            <button
                              key={buttonIndex}
                              className={`button ${esFechaEnVivo ? 'button-finalizado' : 'button-tanda'} ${selectedButton === button ? 'selected-button' : ''} ${esFechaEnVivo && index === Object.entries(buttonData).length - 1 && buttons.length - 1 === buttonIndex ? 'last-button' : ''}`}
                              data-name={button}
                              onClick={() => handleMenuButtonClick(button)}
                              style={{ width: esFechaEnVivo && index === Object.entries(buttonData).length - 1 && buttons.length - 1 === buttonIndex ? '24rem' : '24rem' }}
                            >
                              {Array.isArray(button) ? button.map(tanda => mapTandaToSpanish(tanda)) : mapTandaToSpanish(button)}
                              {esFechaEnVivo && index === Object.entries(buttonData).length - 1 && buttons.length - 1 === buttonIndex ? <Semaforo2 /> : <Finalizado />}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>

                  )}
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
                                    {item.marca && <img src={`images/marcas/${getMarcaImageUrl(item.marca)}`} alt="" />}
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
                                  (item.grupo && item.grupo.trim() !== '')) && (
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
                            {categoria !== 'moto-gp' && (
                              <>
                                <th className='dif-carreras col-2'><h4>Dif</h4></th>

                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {data.results && Array.isArray(data.results) && data.results.map((item, idx) => (
                            <tr className='row' key={idx}>
                              <td className='pos-carreras-td col-1'><h4>{item.pos}</h4></td>
                              <td className='piloto-carreras-td col-4'><h4 >{item.piloto}</h4></td>
                              <td className='img-carreras-td col-2'>
                                {["tp", "tp1", "tp2"].includes(categoria) ? (
                                  <h4 style={{ color: "white" }}>{item.marca}</h4>
                                ) : (
                                  getMarcaImageUrl(item.marca) ? (
                                    <img src={`images/marcas/${getMarcaImageUrl(item.marca)}`} alt={item.marca} />
                                  ) : (
                                    <h4>{item.marca}</h4>
                                  )
                                )}
                              </td>

                              <td className='vueltas-carreras-td col-1'><h4>{item.vueltas}</h4></td>
                              <td className='tiempo-carreras-td col-2'><h4>{item.tiempo}</h4></td>
                              {categoria !== 'moto-gp' && (
                                <>
                                  <td className='dif-carreras-td col-2'><h4>{item.diferencia}</h4></td>
                                </>
                              )}

                            </tr>
                          ))}
                        </tbody>
                      </table>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className={`col-lg-3 none-lg  ${context[id]?.c[3]?.v === "A confirmar" ? 'none' : ''}`}>
                <CallActionNoticias filterDate={new Date(context[id]?.c[2]?.v)} category={categoria} />
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
