import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { useF1, useFe, useIndy, useMgp, useNas, useRmun, useTc } from '../../../Context/Context';
import { useTcp } from '../../../Context/Context';
import { useTcm } from '../../../Context/Context';
import { useTcpm } from '../../../Context/Context';
import { useTcpk } from '../../../Context/Context';
import { useTcppk } from '../../../Context/Context';
import { useRally } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

import DetailFecha from '../DetailFecha/DetailFecha';

const DetailCarrerasCat = () => {
  const { categoria } = useParams(); // Obtiene el valor del parámetro de la URL

  const formatDate = (dateString) => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const [year, month, day] = dateString.split('-').map(Number);
    const monthName = months[month - 1];

    return `${day} de ${monthName}`;
  };

  // Seleccionar el contexto según la categoría
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

  return (
    <Layout background={categoria} logo={categoria}>
      <main>
        <section id='detail-carreras' className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <div className='title-detail-carreras'><h2>Carreras</h2></div>
              {context.length > 0 && context.map((item, index) => (
                <Link
                  key={index}
                  to={`/${categoria}/carreras/${index}`}
                  component={() => <DetailFecha rowData={item} />}
                  className="row carrera-detail-carreras"
                >
                  <div className="col-md-4 fecha-detail-carreras">
                    <h4 className='h4-nro-tabla'>{item.c[0]?.v}</h4>
                    <h3>{item.c[2]?.v && formatDate(item.c[2].v)}</h3>
                  </div>
                  <div className="col-md-4 lugar-detail-carreras">
                    <div>
                      <img src="images/separator.png" alt="Separador" />
                    </div>
                    <div>
                      <img src={item.c[5]?.v} alt="Bandera" />
                    </div>
                    <div>
                      <h3>{item.c[3]?.v}</h3>
                    </div>
                  </div>
                  <div className="col-md-4 circuito-detail-carreras">
                    <div>
                      <img src={item.c[4]?.v} alt="" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="col-md-2">
              <PublicidadVertical none={'none'} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default DetailCarrerasCat;
