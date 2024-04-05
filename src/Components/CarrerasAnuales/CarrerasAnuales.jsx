import Layout from '../../Layout/Layout';
import React, { useEffect } from 'react';
import { useCarrerasAnuales } from '../../../Context/Context';
import { HashLink as Link } from 'react-router-hash-link';

const CarrerasAnuales = () => {
    const carrerasAnualesContext = useCarrerasAnuales();

    useEffect(() => {
        // Cuando el componente se monta, hacemos scroll hacia arriba
        window.scrollTo(0, 0);
    }, []); // El array vacío asegura que este efecto solo se ejecute una vez, equivalente a componentDidMount


    // Calcular la fecha actual
    const fechaActual = new Date();

    // Filtrar las carreras que tienen una fecha válida en la columna 6 y están después de la fecha actual
    const carrerasFiltradas = carrerasAnualesContext
        .filter(carrera => carrera.c && carrera.c[8]?.v) // Filtrar aquellas con fecha válida
        .filter(carrera => new Date(carrera.c[8].v) > fechaActual) // Filtrar las que están después de la fecha actual
        .sort((a, b) => new Date(a.c[8].v) - new Date(b.c[8].v)); // Ordenar por fecha ascendente

    return (
        <Layout>
            <div className="tabla-carreras">
                <div className='title-table-carreras'><h2>Proximas Carreras</h2></div>
                {carrerasFiltradas.map((carrera, index) => (
                    <div key={index} className='table-carrera'>
                        <Link to={carrera.c[13]?.v}>
                            {carrera && carrera.c && (
                                <div className='container-fluid'>
                                    <div className='description-table-left row'>
                                        <div className='col-md-2'>
                                            {carrera.c[8]?.v && (
                                                <h4 className='h4-fecha'>{new Date(carrera.c[8].v).getDate()}/{new Date(carrera.c[6].v).getMonth() + 1}</h4>
                                            )}
                                        </div>
                                        <div className='col-md-2'>
                                            {carrera.c[7]?.v && <img src={carrera.c[11]?.v} alt="" />}
                                        </div>
                                        <div className='col-md-4'>
                                            {carrera.c[9]?.v && <h4 className='h4-circuito'>{carrera.c[9]?.v}</h4>}
                                        </div>
                                        <div className='col-md-3'>
                                            {carrera.c[10]?.v && <img src={carrera.c[10]?.v} alt="" />}
                                        </div>
                                        <div className='col-md-1'>
                                            {carrera.c[8]?.v && carrera.c[3]?.v && carrera.c[10]?.v && (
                                                <img className='play-carreras' src="images/little-play.png" alt="" />
                                            )}
                                        </div>
                                        
                                    </div>
                                </div>
                            )}
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default CarrerasAnuales;
