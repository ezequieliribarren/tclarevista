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

    // Función para obtener el nombre completo de la categoría
    const getCategoriaNombre = (categoria) => {
        switch (categoria) {
            case 'tc':
                return 'Turismo Carretera';
            case 'tcp':
                return 'TC Pista';
            case 'tn':
                return 'Turismo Nacional C2';
            case 'tcpk':
                return 'TC Pick Up';
            case 'tcm':
                return 'TC Mouras';
            case 'tcppk':
                return 'TC Pista Pick Up';
            case 'f2-nacional':
                return 'F2 Nacional';
            case 'tc2000':
                return 'TC 2000';
            case 'tc2000-series':
                return 'TC 2000 Series';
            case 'tr':
                return 'Top Race';
            case 'rally-argentino':
                return 'Rally Argentino';
            case 'tp':
                return 'Turismo Pista C3';
            case 'tp1':
                return 'Turismo Pista C1';
            case 'tp2':
                return 'Turismo Pista C2';
            case 'f1':
                return 'Fórmula 1';
            case 'moto-gp':
                return 'Moto GP';
            case 'indycar-series':
                return 'Indycar Series';
            case 'nascar':
                return 'Nascar';
            case 'rally-mundial':
                return 'Rally Mundial';
            case 'dakar':
                return 'Dakar';
            case 'tcr':
                return 'TCR';
            case 'formula-e':
                return 'Fórmula E';
            case 'tr-series':
                return 'Top-Race Series';
            case 'arg-mundo':
                return 'Argentinos por el mundo';
            case 'tn3':
                return 'Turismo Nacional C3';
            default:
                return categoria; // Por defecto, devuelve la categoría tal como está
        }
    };
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
                        {carrera && carrera.c && (
                            <div className='container-fluid'>
                                <div className='description-table-left row'>
                                    <div className='col-2'>
                                        {carrera.c[8]?.v && (
                                            <h4 className='h4-fecha'>
                                                {new Date(carrera.c[8].v).getDate()}/{new Date(carrera.c[8].v).getMonth() + 1}
                                            </h4>
                                        )}

                                    </div>
                                    <div className="col-4">
                                        <h4 className='h4-circuito'>
                                            {getCategoriaNombre(carrera.c[12].v)}                                        </h4>
                                    </div>
                                   
                                       
                               
                                    <div className='col-4 d-flex align-items-center'>
                                    {carrera.c[7]?.v && <img src={carrera.c[11]?.v} alt="" />}
                                        {carrera.c[9]?.v && <h4 className='h4-circuito'>{carrera.c[9]?.v}</h4>}
                                    </div>
                                    <div className='col-2'>
                                        {carrera.c[10]?.v && <img style={{ width: '12rem' }} className='img-fluid' src={carrera.c[10]?.v} alt="" />}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default CarrerasAnuales;
