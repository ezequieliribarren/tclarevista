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
  console.log("ID:", id)
  const [raceData, setRaceData] = useState([]);

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const urls = [
          `http://localhost:5000/${categoria}/en1/${id}`,
          `http://localhost:5000/${categoria}/en2/${id}`,
          `http://localhost:5000/${categoria}/en3/${id}`,
          `http://localhost:5000/${categoria}/en4/${id}`,
          `http://localhost:5000/${categoria}/en5/${id}`,
          `http://localhost:5000/${categoria}/en6/${id}`,
          `http://localhost:5000/${categoria}/clasificacion/${id}`,
          `http://localhost:5000/${categoria}/serie1/${id}`,
          `http://localhost:5000/${categoria}/serie2/${id}`,
          `http://localhost:5000/${categoria}/final/${id}`,
        ];

        const fetchDataPromises = urls.map(async (url) => {
          const response = await fetch(url);
          if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData); // Mostrar los datos recibidos en la consola
            return { url, results: jsonData };
          } else {
            console.error(`Error al obtener los datos de ${url}`);
            return { url, results: [] };
          }
        });

        const allRaceData = await Promise.all(fetchDataPromises);
        setRaceData(allRaceData);
      } catch (error) {
        console.error('Error al realizar las solicitudes:', error);
      }
    };

    fetchRaceData();
  }, [categoria]);

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
          <div className="row">
            <h2>{context[id]?.c[3]?.v}</h2>
            <h3>Fecha {context[id]?.c[0]?.v}</h3>
          </div>
          <div className="row">
            {raceData && raceData.map((data, idx) => (
              <div key={idx} className="col-md-9">
                {/* <h3>{`Resultados de ${data.url}`}</h3> */}
                <table className="table-carreras">
                  <thead className='container-fluid'>
                    <tr className='row'>
                      <th className='pos-carreras col-md-1'><h4>Pos</h4></th>
                      {/* <th>Número</th> */}
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
                        {/* <td>{item.nro}</td> */}
                        <td className='piloto-carreras col-md-3'><h4>{item.piloto}</h4></td>
                        <td className='marca-carreras col-md-2'><h4>{item.marca}</h4></td>
                        <td className='vueltas-carreras col-md-1'><h4>{item.vueltas}</h4></td>
                        <td className='tiempo-carreras col-md-2'><h4>{item.tiempo}</h4></td>
                        <td className='dif-carreras col-md-2'><h4>{item.diferencia}</h4></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <div className="col-md-3">
              <CallActionNoticias />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {/* INFORMACION DE LAS CARRERAS*/}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">

            </div>
            <div className="col-md-4">
              <PublicidadVertical />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailFecha;