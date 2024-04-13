import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { ClipLoader } from 'react-spinners';

const ResultadoEnVivo = () => {
  const { tanda, ip } = useParams();
  const [tandas, setTandas] = useState([]);
  const [tandaSeleccionada, setTandaSeleccionada] = useState(tanda);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${ip}`);
        const data = await response.json();
        setTandas(data[ip]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ip]);

  useEffect(() => {
    setTandaSeleccionada(tanda);
  }, [tanda]);

  const handleTandaClick = (tandaNombre) => {
    setTandaSeleccionada(tandaNombre);
  };

  return (
    <Layout>
      <section>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <ClipLoader color="#fe0" loading={loading} size={80} />
          </div>
        )}
        {!loading && (
          <div className="botonera">
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
        )}

        {!loading && tandaSeleccionada && (
          <TablaResultado tanda={tandas.find((t) => t.Tanda === tandaSeleccionada)} />
        )}
      </section>
    </Layout>
  );
};

const TablaResultado = ({ tanda }) => {
  if (!tanda) return null;

  return (
    <div>
      <h2>{tanda.Tanda}</h2>
      <table className="tabla-resultado container-fluid">
        <thead>
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
          {tanda.DatosTabla.map((fila, index) => (
            <tr className='row' key={index}>
              <td className='pos-carreras-td col-1'><h4>{fila.Pos}</h4></td>
              <td className='piloto-carreras-td col-4'><h4>{fila.Piloto}</h4></td>
              <td className='img-carreras-td col-2'><h4>{fila.Marca}</h4></td>
              <td className='vueltas-carreras-td col-1'><h4>{fila.Vueltas}</h4></td>
              <td className='tiempo-carreras-td col-2'><h4>{fila.Tiempo}</h4></td>
              <td className='dif-carreras-td col-2'><h4>{fila.Diferencia}</h4></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultadoEnVivo;
