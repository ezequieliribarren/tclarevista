import React from 'react';
import { useCarrerasAnuales } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

// Define la función mapTandaCodeToFullName
const mapTandaCodeToFullName = (code) => {
    switch (code) {
        case "tc":
            return "Turismo Carretera";
        case "tcp":
            return "TC Pista";
        case "tcpk":
            return "TC Pick Up";
        case "tcppk":
            return "TC Pista Pickup";
        case "tcm":
            return "TC Mouras";
        case "tcpm":
            return "TC Pista";
        case "formula-e":
            return "Fórmula E";
        case "f1":
            return "F1";
        case "rally":
            return "Rally Argentino";
        case "tr":
            return "Top Race";
        case "tr-series":
            return "Top Race Series";
        case "nascar":
            return "Nascar";
        case "rally-mundial":
            return "Rally Mundial";
        case "tc2000":
            return "TC 2000";
        case "indycar":
            return "Indycar";
        case "moto-gp":
            return "Moto GP";
            case "tp":
                return "Turismo Pista";
        default:
            return code; // Devuelve el código original si no coincide con ninguno
    }
};


const CallActionCarreras = () => {
    const carrerasAnuales = useCarrerasAnuales();

    // Calcular la fecha actual
    const fechaActual = new Date();

    // Filtrar las carreras que tienen una fecha válida en la columna 6 y están después de la fecha actual
    const carrerasFiltradas = carrerasAnuales
        .filter(carrera => carrera.c && carrera.c[8]?.v) // Filtrar aquellas con fecha válida
        .filter(carrera => new Date(carrera.c[8].v) > fechaActual) // Filtrar las que están después de la fecha actual
        .sort((a, b) => new Date(a.c[8].v) - new Date(b.c[8].v)); // Ordenar por fecha ascendente

    // Tomar solo las próximas 7 carreras
    const proximasCarreras = carrerasFiltradas.slice(0, 7);

    return (
        <aside id='call-action-carreras'>
            <div className="tabla-carreras">
                <div className='title-table-carreras'><h3>Carreras</h3></div>
                {proximasCarreras.map((carrera, index) => (
                    <div key={index} className='table-carrera'>
                   
                            {carrera && carrera.c && (
                                <div className='description-table-carreras'>
                                    <div className='description-table-left'>
                                        {carrera.c[6]?.v && (
                                        <h4 className='h4-fecha'>{new Date(carrera.c[8].v).getDate()}/{new Date(carrera.c[8].v).getMonth() + 1}</h4>

                                        )}
                                        <span className='span-table-carreras'><img src="images/separator.png" alt="" /></span>
                                        {carrera.c[11]?.v &&
                                            <img src={carrera.c[11]?.v} alt="" />}
                                        <div className='lugar-circuito'>
                                            {carrera.c[9]?.v &&
                                                <h4 className='h4-lugar'>{mapTandaCodeToFullName(carrera.c[12]?.v)}</h4>}
                                            {carrera.c[9]?.v &&
                                                <h4 className='h4-circuito'>{carrera.c[9]?.v}</h4>}
                                        </div>
                                    </div>
                                    <div>
                                            <img className='play-carreras' src="images/little-play.png" alt="" />
                                    </div>
                                </div>
                            )}
                    
                    </div>
                ))}
                <Link to='/carreras-anuales' className='ver-mas'><button>VER MÁS CARRERAS</button></Link>
            </div>
        </aside>
    );
}

export default CallActionCarreras;
