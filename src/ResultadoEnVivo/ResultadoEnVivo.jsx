import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ClipLoader } from 'react-spinners';
import Semaforo2 from '../Components/Semaforo2/Semaforo2';
import Finalizado from '../Components/Finalizado/Finalizado';

const ResultadoEnVivo = () => {
  const { tanda, ip } = useParams();
  const [tandas, setTandas] = useState([]);
  const [tandaSeleccionada, setTandaSeleccionada] = useState(tanda);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [tandasPrimerBotonera, setTandasPrimerBotonera] = useState([]);
  const [selectedIndice, setSelectedIndice] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchMenu = async () => {
    try {
      const responseMenu = await fetch(`http://localhost:5000/${ip}menu`);
      const dataMenu = await responseMenu.json();
      setMenu(dataMenu);

      const nombresTandas = dataMenu.reduce((acc, curr) => {
        return [...acc, ...curr.items.map((item) => item.tanda.toLowerCase())];
      }, []);
      setTandasPrimerBotonera(nombresTandas);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const handleTandaClick = async (indice) => {
    console.log('Tanda seleccionada:', indice);
    try {
      setSelectedIndice(indice);
      await fetchTandaData(indice);
    } catch (error) {
      console.error('Error fetching tanda data:', error);
    }
  };

  const fetchTandaData = async (indice) => {
    try {
      setUpdating(true);
      const response = await fetch(`http://localhost:5000/${ip}/${indice}`);
      const data = await response.json();
      console.log('Datos de tanda obtenidos:', data);
      setTandas(data);
      setTimeout(() => {
        setUpdating(false);
      }, 2000);
    } catch (error) {
      console.error('Error fetching tanda data:', error);
      setUpdating(false);
    }
  };

  const fetchPeriodicTandaData = async () => {
    if (selectedIndice !== null) {
      await fetchTandaData(selectedIndice);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [ip]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPeriodicTandaData();
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedIndice]);

  const obtenerRutaImagen = (numeroMarca) => {
    switch (numeroMarca) {
      case '1':
        return 'images/marcas/ford.png';
      case '2':
        return 'images/marcas/chevrolet.png';
      case '46':
        return 'images/marcas/mustang.png';
      case '4':
      case '52':
        return 'images/marcas/torino.png';
      case '3':
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
    const regex = /\/(\d+)\.jpg$/;
    const match = rutaImagen.match(regex);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  };

  return (
    <Layout>
      <section>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ClipLoader />
          </div>
        )}
        {!loading && (
          <div>
            <div className='contenedor-botonera'>
              {menu.slice(3).map((item, index) => {
                return (
                  <div className="up-botonera" key={index}>
                    <h2>{item.circuito}</h2>
                  </div>
                );
              })}
              <div className='botonera'>
                {menu
                  .filter(item => !item.title.includes("Próxima Tanda"))
                  .map((item, index) => (
                    <div className='botones' key={index}>
                      <div className="day-carreras" style={{ width: "10rem" }}>
                        <h4>{item.title}</h4>
                      </div>
                      {item.items.map((tandaItem, subIndex) => (
                        <button
                          key={subIndex}
                          className={`button-tanda ${tandaItem.estado === "" ? 'disabled-link' : ''}`}
                          onClick={() => handleTandaClick(tandaItem.indice)}
                          disabled={tandaItem.estado === ""}
                        >
                          {tandaItem.tanda}
                        </button>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
            <div>
              {tandas && tandas.DatosTabla ? (
                <div>
                  <div className='d-flex align-items-center'>
                    <h2 className='pl2 margin-title'>{tandas.Tanda}</h2>
                    <div>
                      {tandas.estado === 'vivo' ? <Semaforo2 /> : <Finalizado />}
                    </div>
                  </div>

                  <table className='tabla-resultado container-fluid'>
                    <thead>
                      <tr className='row'>
                        <th className='pos-carreras col-1'><h4>Pos</h4></th>
                        <th className='nro-carreras col-1'><h4>Nro</h4></th>
                        <th className='piloto-carreras col-3'><h4>Piloto</h4></th>
                        <th className='img-carreras col-2'><h4>Marca</h4></th>
                        <th className='vueltas-carreras col-1'><h4>Vtas</h4></th>
                        <th className='tiempo-carreras col-2'><h4>Tiempo</h4></th>
                        <th className='dif-carreras col-2'><h4>Dif</h4></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tandas.DatosTabla.slice(2).map((item, index) => (
                        <tr key={index} className='row'>
                          <td className='pos-carreras-td col-1'><h4>{item.Pos}</h4></td>
                          <td className='vueltas-carreras-td col-1'><h4>{item.Numero}</h4></td>
                          <td className='piloto-carreras-td col-3'><h4>{item.Piloto}</h4></td>
                          <td className='img-carreras-td col-2'>
                            {item.Marca && (
                              <img
                                src={obtenerRutaImagen(item.Marca)}
                                alt="Marca"
                                style={{ width: '50px', height: 'auto' }}
                              />
                            )}
                          </td>
                          <td className='vueltas-carreras-td col-1'><h4>{item.Vueltas}</h4></td>
                          <td className='tiempo-carreras-td col-2'><h4>{item.Tiempo}</h4></td>
                          <td className='grupo-carreras-td col-2'><h4>{item.Diferencia}</h4></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                  <ClipLoader />
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ResultadoEnVivo;
