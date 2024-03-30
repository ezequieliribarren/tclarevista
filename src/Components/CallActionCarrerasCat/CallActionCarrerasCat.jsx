import React from 'react';
import { useParams } from 'react-router-dom';

// Importa los diferentes contextos según la categoría
import { useTc, useTcp, useTcm, useTcpm, useTcpk, useTcppk, useRally, useF1, useMgp, useIndy, useNas, useRmun, useFe } from '../../../Context/Context';

const CallActionCarrerasCat = () => {
    // Obtiene la categoría de los parámetros de la URL
    const { categoria } = useParams();
    console.log("Categoria",categoria)

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

    // Tomar solo las primeras 7 carreras
    const proximasCarreras = context.slice(0, 7);

    console.log(context, "CONTEXTO")
    console.log(proximasCarreras, "proximas-carreras")

    return (
        <aside id='call-action-carreras'>
            <div className="tabla-carreras">
                <div className='title-table-carreras'><h3>Carreras</h3></div>
                {proximasCarreras.map((carrera, index) => (
                    <div key={index} className='table-carrera'>
                        {carrera && carrera.c && (
                            <div className='description-table-carreras'>
                                <div className='description-table-left'>
                                    {carrera.c[2]?.v && (
                                        <h4 className='h4-fecha'>{new Date(carrera.c[2].v).getDate()}/{new Date(carrera.c[2].v).getMonth() + 1}</h4>
                                    )}
                                    <span className='span-table-carreras'><img src="images/separator.png" alt="" /></span>
                                    {carrera.c[5]?.v && <img src={carrera.c[5]?.v} alt="" />}
                                    {carrera.c[3]?.v && <h4 className='h4-circuito'>{carrera.c[3]?.v}</h4>}
                                </div>
                                <div>
                                    {carrera.c[2]?.v && carrera.c[1]?.v && carrera.c[3]?.v && (
                                        <img className='play-carreras' src="images/little-play.png" alt="" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div className='ver-mas'><button>VER MÁS CARRERAS</button></div>
            </div>
        </aside>
    );
}

export default CallActionCarrerasCat;
