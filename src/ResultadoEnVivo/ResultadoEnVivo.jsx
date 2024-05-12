import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ClipLoader } from 'react-spinners';
import PreloaderVivo from '../Components/PreloaderVivo/PreloaderVivo';
import Semaforo from '../Components/Semaforo/Semaforo';
import BanderaCuadros from '../Components/BanderaCuadros/BanderaCuadros';
import Contador from '../Components/Contador/Contador';

const ResultadoEnVivo = () => {
  const { tanda, ip } = useParams();
  const [tandas, setTandas] = useState([]);
  const [tandaSeleccionada, setTandaSeleccionada] = useState(tanda);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [tandasPrimerBotonera, setTandasPrimerBotonera] = useState([]);
  const [tandaEstado, setTandaEstado] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${ip}`);
        const data = await response.json();
        setTandas(data[ip]);
        setLoading(false);
        if (data.ip1menu) {
          setMenu(data.ip1menu);
          const nombresTandas = data.ip1menu.reduce((acc, curr) => {
            return [...acc, ...curr.items.map((item) => item.tanda.toLowerCase())];
          }, []);
          setTandasPrimerBotonera(nombresTandas);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData(); // Realizar un nuevo intento de fetch cada 10 segundos
    }, 10000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [ip]);

  useEffect(() => {
    if (!loading && tandas.length > 0 && tanda) {
      setTandaSeleccionada(tanda);
      activateButton(tanda.toLowerCase());
    }
  }, [loading, tandas, tanda]);

  const activateButton = useMemo(() => {
    return (tandaNombreLower) => {
      const buttons = document.querySelectorAll('.segunda-botonera .button-tanda');
      buttons.forEach((button) => {
        if (button.textContent.toLowerCase() === tandaNombreLower) {
          button.click();
        }
      });

      const primerBotoneraButtons = document.querySelectorAll('.botonera .button-tanda');
      primerBotoneraButtons.forEach((button) => {
        const buttonText = button.textContent.toLowerCase();
        const isInSecondBotonera = tandas.some((t) => t.Tanda.toLowerCase() === buttonText);
        if (!isInSecondBotonera) {
          button.classList.add('disabled-link');
        }
      });
    };
  }, [tandas]);

  const handleTandaClick = (tandaNombre) => {
    setTandaSeleccionada(tandaNombre);
    activateButton(tandaNombre.toLowerCase());
  };

  const obtenerRutaImagen = (numeroMarca) => {
    switch (numeroMarca) {
      case '1':
        return 'images/marcas/ford.png';
      case '2':
        return 'images/marcas/chevrolet.png';
      case '46':
        return 'images/marcas/mustang.png';
      case '4':
        return 'images/marcas/torino.png';
      case '52':
        return 'images/marcas/torino.png';
      case '3':
        return 'images/marcas/dodge.png';
      case '50':
        return 'images/marcas/dodge.png';
      case '48':
        return 'images/marcas/camaro.png';
      case '54':
        return 'images/marcas/toyota.png';
      default:
        return null;
    }
  };
  const obtenerNumeroMarca = (rutaImagen) => {
    // Suponiendo que la ruta de la imagen sigue el patrón "/upload/marcas/{numero}.jpg"
    const regex = /\/(\d+)\.jpg$/;
    const match = rutaImagen.match(regex);
    if (match) {
      return match[1]; // Devuelve el número coincidente capturado por la expresión regular
    } else {
      return null; // Manejar el caso en que no se encuentre ningún número
    }
  };

  return (
    <Layout>
      <section>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <PreloaderVivo />
          </div>
        )}
{!loading && tandaSeleccionada && (
  <div className='contenedor-botonera'>
    {menu.slice(2).map((item, index) => {
      return (
        <div className="up-botonera" key={index}>
          <h2>{item.circuito}</h2>
        </div>
      );
    })}
    <div className='botonera'>
      {menu.map((item, index) => {
        const filteredItems = item.items.filter((tandaItem) => !tandaItem.tanda.toLowerCase().includes('grilla'));

        return (
          <div style={{ display: "flex" }} className='buttons-vivo' key={index}>
            <div style={{ width: "auto" }} className='day-carreras'>
              <h4>{item.title}</h4>
            </div>
            {filteredItems.map((tandaItem, subIndex) => (
              <button className='button-tanda' key={subIndex} onClick={() => handleTandaClick(tandaItem.tanda)}>{tandaItem.tanda}</button>
            ))}
          </div>
        );
      })}
      <div style={{ opacity: "0", display: "flex", widht: "100%", overflow: "hidden"}} className="segunda-botonera">
        {tandas.map((tandaItem, index) => (
          <div className='buttons-vivo' key={index}>
            <button
              className={`button-tanda ${tandaItem.Tanda === tandaSeleccionada ? 'seleccionado' : ''}`}
              onClick={() => handleTandaClick(tandaItem.Tanda)}
              style={{
                backgroundColor: tandaItem.Tanda === tandaSeleccionada ? '#fe0' : '',
                color: tandaItem.Tanda === tandaSeleccionada ? '#000' : '',
              }}
            >
              {tandaItem.Tanda}
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
        {!loading && tandaSeleccionada && (
          <TablaResultado tanda={tandas.find((t) => t.Tanda === tandaSeleccionada)} obtenerRutaImagen={obtenerRutaImagen} obtenerNumeroMarca={obtenerNumeroMarca} />
        )}
      </section>
    </Layout>
  );
};

const TablaResultado = ({ tanda, obtenerRutaImagen, obtenerNumeroMarca }) => {
  if (!tanda) return null;

  return (
    <div className='m-5'>
      <div style={{ display: "flex", alignItems: "center", paddingLeft: "2%" }}>
        <h2 className='h2-tanda-vivo'>{tanda.Tanda}</h2>
        {tanda.Estado === "vivo" && <Semaforo />}
        {tanda.Estado === "finalizado" && <BanderaCuadros />}
      </div>
      <table className="tabla-resultado container-fluid">
        <thead>
        {/* {tanda.Estado === "vivo" && <Contador />}           */}
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
          {tanda.DatosTabla.slice(1).map((fila, index) => {
            const shouldHideRow = Object.values(fila).some(value =>
              value.includes("Verificado por Cronometraje:") ||
              value.includes("Verificado por Deportiva:") ||
              value.includes("Verificado por Técnica:")
            );

            if (shouldHideRow) {
              return null;
            }

            return (
              <tr className='row' key={index}>
                <td className='pos-carreras-td col-1'><h4>{fila.Pos}</h4></td>
                <td className='piloto-carreras-td col-4'><h4>{fila.Piloto}</h4></td>
                <td className='img-carreras-td col-2'><img src={obtenerRutaImagen(obtenerNumeroMarca(fila.Marca))} alt={`Marca ${fila.Marca}`} />
                </td>
                <td className='vueltas-carreras-td col-1'><h4>{fila.Vueltas}</h4></td>
                <td className='tiempo-carreras-td col-2'><h4>{fila.Tiempo}</h4></td>
                <td className='grupo-carreras-td col-2'><h4>{fila.Diferencia}</h4></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ResultadoEnVivo;

