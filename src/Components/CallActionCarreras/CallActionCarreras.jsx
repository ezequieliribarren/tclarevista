import React from 'react';
import { useCarrerasAnuales } from '../../../Context/Context';

const CallActionCarreras = () => {
    const carrerasAnuales = useCarrerasAnuales();

    return (
        <aside id='call-action-carreras'>
            <div className="tabla-carreras">
                <div className='title-table-carreras'><h3>Carreras</h3></div>
                {carrerasAnuales.slice(1).map((carrera, index) => (
                    <div key={index}>
                        {carrera && carrera.c && (
                            <div className='description-table-carreras'>
                                <div className='description-table-left'>
                                    {carrera.c[6]?.v && <h4>{carrera.c[6]?.v}</h4>}
                                    {carrera.c[5]?.v && <h4>{carrera.c[5]?.v}</h4>}
                                    {carrera.c[7]?.v && <p>{carrera.c[7]?.v}</p>}
                                </div>
                                <div>
                                    {carrera.c[6]?.v && carrera.c[5]?.v && carrera.c[7]?.v && (
                                        <img src="images/little-play.png" alt="" />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                <div><h4>VER MÁS CARRERAS</h4></div>
            </div>
        </aside>
    );
}

export default CallActionCarreras;
