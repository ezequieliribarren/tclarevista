import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import Layout from '../../Layout/Layout';
import Semaforo from '../Semaforo/Semaforo';
import Roja from '../Roja/Roja';
import Finalizado from '../Finalizado/Finalizado';

const VivoF1 = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/f1/live');
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData); // Asignar los datos de estado al estado
          setLoading(false); // Marcar el estado como no cargando
        } else {
          console.error('Error al obtener los datos de F1');
          setLoading(false); // Marcar el estado como no cargando en caso de error
        }
      } catch (error) {
        console.error('Error al realizar la solicitud fetch:', error);
        setLoading(false); // Marcar el estado como no cargando en caso de error
      }
    };

    fetchData(); // Llamar a la función fetchData al montar el componente

    // Establecer un intervalo para volver a llamar a fetchData cada 5 segundos
    const interval = setInterval(fetchData, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []); // El segundo parámetro de useEffect es un array vacío, para que la func


  const renderNeumatico = (neumatico) => {
    if (neumatico === 'assets/img/neumatico-M.png') {
      return 'images/f1live/medio.png';
    } else if (neumatico === 'assets/img/neumatico-D.png') {
      return 'images/f1live/duro.png';
    } else if (neumatico === 'assets/img/neumatico-H.png') {
      return 'images/f1live/duro.png';
    }
    else if (neumatico === 'assets/img/neumatico-L.png') {
      return 'images/f1live/lluvia.png';
    }
    else if (neumatico === 'assets/img/neumatico-I.png') {
      return 'images/f1live/intermedio.png';
    }
    else if (neumatico === 'assets/img/neumatico-B.png') {
      return 'images/f1live/blando.png';
    }
    else {
      // Agrega más condiciones si es necesario
      return 'imagen_por_defecto.png';
    }
  };

  const renderBandera = (pais) => {
    switch (pais) {
      case 'Holanda':
        return 'images/banderas/holanda.png';
      case 'Australia':
        return 'images/banderas/australia.png';
      case 'Gran Bretaña':
        return 'images/banderas/reino-unido.png';
      case 'Mónaco':
        return 'images/banderas/monaco.png';
      case 'Japón':
        return 'images/banderas/japon.png';
      case 'Finlandia':
        return 'images/banderas/finlandia.png';
      case 'Dinamarca':
        return 'images/banderas/dinamarca.png';
      case 'México':
        return 'images/banderas/mexico.png';
      case 'Canadá':
        return 'images/banderas/canada.png';
      case 'Francia':
        return 'images/banderas/francia.png';
      case 'España':
        return 'images/banderas/españa.png';
      case 'Tailandia':
        return 'images/banderas/tailandia.png';
      case 'China':
        return 'images/banderas/china.png';
      case 'Alemania':
        return 'images/banderas/alemania.png';
      case 'Estados Unidos':
        return 'images/banderas/estados-unidos.png';
      default:
        return 'imagen_por_defecto.png';
    }
  };

  return (
    <Layout>
      <section>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ClipLoader color="#FE0" size={90} />
          </div>
        ) : (
          <div>
            <div className='contenedor-botonera'>
              <div className="up-botonera">
                <div className='d-flex align-items-center'>

                  <div style={{ width: "60%" }}><h2 className='pl2'>{data.headerData.carrera} </h2>
                  </div>
                  {data.statusData.situacion === 'Bandera verde' ? (
                    <div>
                      <Semaforo />
                    </div>
                  ) : data.statusData.situacion === 'Bandera roja' ? (
                    <div>
                      <Roja />
                    </div>
                  )
                    : data.statusData.situacion === 'Bandera a cuadros' ? (
                      <div>
                        <Finalizado />
                      </div>
                    )
                      : null}
                </div>

              </div>
            </div>
            <div>
              <table id="tabla-resultados" className='tabla-resultado container-fluid'>
                <thead>
                  <tr className='row'>
                    <th className='pos-carreras col-1'><h4>Pos</h4></th>
                    <th className='piloto-carreras col-3'><h4>Piloto</h4></th>
                    <th className='pais-carreras col-1'><h4>País</h4></th>
                    <th className='equipo-carreras col-2'><h4>Equipo</h4></th>
                    <th className='neumatico-carreras col-2'><h4>Neumático</h4></th>
                    <th className='vueltas-carreras col-1'><h4>Vueltas</h4></th>
                    <th className='tiempo-carreras col-2'><h4>Tiempo</h4></th>
                  </tr>
                </thead>
                <tbody>
                  {data.clasificacion.map((item, index) => (
                    <tr key={index} className='row'>
                      <td className='pos-carreras-td col-1'><h4>{item.posicion}</h4></td>
                      <td className='piloto-carreras-td col-3'><h4>{item.piloto}</h4></td>
                      <td className='vueltas-carreras-td col-1'><img src={renderBandera(item.pais)} alt="Bandera" style={{ width: '30px', height: 'auto' }} /></td>
                      <td className='vueltas-carreras-td col-2'><h4>{item.equipo}</h4></td>
                      <td className='vueltas-carreras-td col-2'><img src={renderNeumatico(item.neumatico)} alt="Neumático" style={{ width: '30px', height: 'auto' }} /></td>
                      <td className='vueltas-carreras-td col-1'><h4>{item.vueltas}</h4></td>
                      <td className='tiempo-carreras-td col-2'><h4>{item.tiempo}</h4></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default VivoF1;
