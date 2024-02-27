import React from 'react';
import { useCarrerasAnuales } from '../../../Context/Context';

const CallActionCarreras = () => {
    const carrerasAnuales = useCarrerasAnuales();

    // Calcular la fecha actual
    const fechaActual = new Date();

    // Filtrar las carreras que tienen una fecha válida en la columna 6 y están después de la fecha actual
    const carrerasFiltradas = carrerasAnuales
        .filter(carrera => carrera.c && carrera.c[6]?.v) // Filtrar aquellas con fecha válida
        .filter(carrera => new Date(carrera.c[6].v) > fechaActual) // Filtrar las que están después de la fecha actual
        .sort((a, b) => new Date(a.c[6].v) - new Date(b.c[6].v)); // Ordenar por fecha ascendente

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
        <h4 className='h4-fecha'>{new Date(carrera.c[6].v).getDate()}/{new Date(carrera.c[6].v).getMonth() + 1}</h4>
    )}
                                    <span className='span-table-carreras'><img src="images/separator.png" alt="" /></span>
                                    {carrera.c[5]?.v && <img src={carrera.c[5]?.v} alt="" />}
                                    {carrera.c[7]?.v && <h4 className='h4-circuito'>{carrera.c[7]?.v}</h4>}
                                </div>
                                <div>
                                    {carrera.c[6]?.v && carrera.c[5]?.v && carrera.c[7]?.v && (
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

export default CallActionCarreras;
