import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ClipLoader } from 'react-spinners';
import Semaforo2 from '../Components/Semaforo2/Semaforo2';
import Finalizado from '../Components/Finalizado/Finalizado';

const ResultadoEnVivo = () => {
  const { tanda, ip, indice } = useParams();
  const [tandas, setTandas] = useState([]);
  const [tandaSeleccionada, setTandaSeleccionada] = useState(tanda);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [initialFetchDone, setInitialFetchDone] = useState(false); // New state to control the initial fetch
  const [menuLoading, setMenuLoading] = useState(true); // Nuevo estado para indicar si se está cargando el menú


  const fetchMenu = async () => {
    try {
      setMenuLoading(true); // Indicar que se está cargando el menú
      const responseMenu = await fetch(`http://localhost:5000/${ip}menu`);
      const dataMenu = await responseMenu.json();
      setMenu(dataMenu);
      setMenuLoading(false); // Indicar que se ha completado la carga del menú
      const nombresTandas = dataMenu.reduce((acc, curr) => {
        return [...acc, ...curr.items.map((item) => item.tanda.toLowerCase())];
      }, []);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setMenuLoading(false); // Indicar que ha ocurrido un error durante la carga del menú
    }
  };

  const fetchInitialTandaData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/${ip}/${indice}`);
      const data = await response.json();
      console.log('Datos de tanda obtenidos:', data);
      setTandas(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching initial tanda data:', error);
      setLoading(false);
    }
  };

  const handleTandaClick = async (indice) => {
    console.log('Tanda seleccionada:', indice);
    try {
      const response = await fetch(`http://localhost:5000/${ip}/${indice}`);
      const data = await response.json();
      console.log('Datos de tanda obtenidos:', data);
      setTandas(data);

      // Marcamos el botón seleccionado
      setMenu(prevMenu => {
        const updatedMenu = prevMenu.map(item => ({
          ...item,
          items: item.items.map(tandaItem => ({
            ...tandaItem,
            selected: tandaItem.indice === indice
          }))
        }));
        return updatedMenu;
      });

      // Hacemos un desplazamiento hacia la tabla de resultados
      const tablaDeResultados = document.getElementById('tabla-resultados');
      if (tablaDeResultados) {
        tablaDeResultados.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching tanda data:', error);
    }
  };
  useEffect(() => {
    fetchMenu();
  }, [ip]);

  useEffect(() => {
    if (!initialFetchDone && tandaSeleccionada) {
      fetchInitialTandaData();
      setInitialFetchDone(true);
    }
  }, [tandaSeleccionada, initialFetchDone]);

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
      case '21':
        return 'images/marcas/nissan.png';
      default:
        return null;
    }
  };

  const obtenerNumeroMarca = (rutaImagen) => {
    if (!rutaImagen) return null; // Return null if rutaImagen is null or undefined
    const regex = /\/(\d+)\.jpg$/;  // Regex to match the number in the image path
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
            <ClipLoader color="#FE0" size={90} />          </div>
        )}
        {!loading && (
          <div>
            <div className='contenedor-botonera'>
              {menu.length > 0 && (
                <div className="up-botonera">
                  <h2 className='pl2'>{menu[menu.length - 1].circuito}</h2>
                </div>
              )}
              <div className='botonera'>
                {menuLoading && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: "100%" }}>
                    <ClipLoader color="#FE0" size={90} />          </div>
                )}
                {menu
                  .filter(item => !item.title.includes("Próxima Tanda") && !item.title.includes("Grilla"))
                  .map((item, index) => (
                    <div className='botones' key={index}>
                      <div className="day-carreras" style={{ width: "10rem" }}>
                        <h4>{item.title}</h4>
                      </div>
                      {item.items
                        .filter(tandaItem => !tandaItem.tanda.includes("Grilla"))
                        .map((tandaItem, subIndex) => (
                          <button
                            key={subIndex}
                            className={`button-tanda ${tandaItem.estado === "" ? 'disabled-link' : ''} ${tandaItem.selected ? 'selected-button' : ''}`}
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
                    <h2 className='pl2'>{tandas.Tanda}</h2>
                    <div>
                      {tandas && tandas.Estado && tandas.Estado === 'vivo' ? <Semaforo2 /> : <Finalizado />}
                    </div>
                  </div>

                  <table id="tabla-resultados" className='tabla-resultado container-fluid'>
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
                      {tandas.DatosTabla.filter(item => !isNaN(parseInt(item.Pos))).map((item, index) => (
                        <tr key={index} className='row'>
                          <td className='pos-carreras-td col-1'><h4>{item.Pos}</h4></td>
                          <td className='vueltas-carreras-td col-1'><h4>{item.Numero}</h4></td>
                          <td className='piloto-carreras-td col-3'>
                            <h4>
                              {item.Piloto}
                              {item.Flag && <img src="images/flag.png" alt="Flag" style={{ width: '20px', height: 'auto', marginLeft: '10px' }} />}
                            </h4>
                          </td>
                          <td className='img-carreras-td col-2'>
                            {item.Marca && obtenerNumeroMarca(item.Marca) && (
                              <img
                                src={obtenerRutaImagen(obtenerNumeroMarca(item.Marca))}
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
                  <ClipLoader color="#FE0" size={80} />                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ResultadoEnVivo;
