import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { ClipLoader } from 'react-spinners'; // Importa CircleLoader

const CallActionCampeonato = () => {
    const { categoria } = useParams(); // Obtiene el valor del parámetro de la URL
    const [campeonatoData, setCampeonatoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numPilotos, setNumPilotos] = useState(5); // Estado para la cantidad de pilotos a mostrar

    const campeonatoUrl = categoria === 'tc2000' ?
        'http://localhost:5000/api/campeonato/tc2000' :
        (categoria === 'rally-argentino' ?
            'http://localhost:5000/api/campeonato/rally-argentino' :
            (categoria === 'rally-mundial' ?
                'http://localhost:5000/api/campeonato/rally-mundial' :
                (categoria === 'nascar' ?
                    'http://localhost:5000/api/campeonato/nascar' :
                    (categoria === 'formula-e' ?
                        'http://localhost:5000/api/campeonato/formula-e' :
                        (categoria === 'f1' ?
                            'http://localhost:5000/api/campeonato/f1' :
                            (categoria === 'moto-gp' ?
                                'http://localhost:5000/api/campeonato/moto-gp' :
                                (categoria === 'tp' ?
                                    'http://localhost:5000/api/campeonato/tp' :
                                    (categoria === 'tp1' ?
                                        'http://localhost:5000/api/campeonato/tp1' :
                                        (categoria === 'tp2' ?
                                            'http://localhost:5000/api/campeonato/tp2' :
                                            (categoria === 'indycar-series' ?
                                                'http://localhost:5000/api/campeonato/indycar-series' :
                                                `http://localhost:5000/api/campeonatos/${categoria}`
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );



    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 470) {
            setNumPilotos(1);
        } else if (windowWidth <= 675) {
            setNumPilotos(2);
        } else if (windowWidth <= 1050) {
            setNumPilotos(3);
        } else {
            setNumPilotos(5);
        }
    };

    const getCampeonatoUrl = () => {
        if (categoria === 'tc2000') {
            return 'http://localhost:5173/#/tc2000/campeonato';
        } else if (categoria === 'rally-argentino') {
            return 'http://localhost:5173/#/rally-argentino/campeonato';
        } else if (categoria === 'rally-mundial') {
            return 'http://localhost:5173/#/rally-mundial/campeonato';
        }
        else if (categoria === 'nascar') {
            return 'http://localhost:5173/#/rally-mundial/nascar';
        }
        else if (categoria === 'formula-e') {
            return 'http://localhost:5173/#/rally-mundial/formula-e';
        }
        else if (categoria === 'f1') {
            return 'http://localhost:5173/#/f1/campeonato';
        }
        else if (categoria === 'moto-gp') {
            return 'http://localhost:5173/#/moto-gp/campeonato';
        }
        else if (categoria === 'indycar-series') {
            return 'http://localhost:5173/#/rally-mundial/indycar-series';
        }

        // Si la categoría no es ni 'tc2000' ni 'rally-argentino', puedes devolver una URL por defecto
        return `http://localhost:5173/#/${categoria}/campeonato`;
    };


    useEffect(() => {
        // Función para manejar el cambio en el tamaño de la pantalla
        window.addEventListener('resize', handleResize);

        // Llamar a handleResize al cargar la página para establecer el número inicial de pilotos
        handleResize();

        // Limpia el evento al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // El arreglo de dependencias está vacío para que el efecto se ejecute solo una vez al montar el componente

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(campeonatoUrl);
                if (!response.ok) {
                    throw new Error('No se pudo obtener los datos');
                }
                const data = await response.json();
                setCampeonatoData(data);
                setLoading(false); // Marca la carga como completada
            } catch (error) {
                console.error('Error al obtener los datos del campeonato:', error);
            }
        };

        fetchData();
    }, [campeonatoUrl]);

    const getMarcaImageUrl = (marca) => {
        if (marca && marca.includes('chevrolet')) {
            return 'chevrolet.png';
        } else if (marca && marca.includes('ford')) {
            return 'ford.png';
        } else {
            // Si la marca no coincide con chevrolet ni ford, puedes devolver una imagen por defecto
            return 'default.png';
        }
    };

    const colClass = () => {
        if (numPilotos === 5) return 'col-sm-2';
        else if (numPilotos === 3) return 'col-md-3 col-sm-3';
        else if (numPilotos === 2) return 'col-5';
        else if (numPilotos === 1) return 'col-9';
    };

    const verTablaCompletaColClass = () => {
        if (numPilotos === 5) return 'col-sm-2';
        else if (numPilotos === 3) return 'col-md-3 col-sm-3';
        else if (numPilotos === 2) return 'col-2';
        else if (numPilotos === 1) return 'col-3';
    };

    const primerosNPilotos = campeonatoData.slice(0, numPilotos);


    return (
        <>
            {categoria !== 'dakar' && categoria !== 'tcr' && categoria !== 'arg-mundo' && (
                <div className='container-fluid call-action-campeonato'>
                    <div className='row'>
                        <h2>Campeonato</h2>
                    </div>
                    <div className='row'>
                        {loading ? (
                            <div className="col-md-12 spinner-container">
                                <ClipLoader color="#FE0" size={80} />
                            </div>
                        ) : (
                            <>
                                {primerosNPilotos.map((piloto, index) => (
                                    <div key={index} className={`card-call-action-campeonato ${colClass()}`}>
                                        <div className='container-pos'>
                                            <h4 className='h4-pos-campeonato'>

                                                {categoria === 'rally-argentino' ? index + 1 : (piloto.posicion && piloto.posicion.replace('°', ''))}
                                            </h4>
                                        </div>
                                        <div className='container-piloto'>
                                            <h4 className='h4-piloto'>{piloto.piloto}</h4>
                                        </div>
                                        <div className='container-marca'>
                                            {piloto.marca && <img className='img-piloto-call-action-campeonato' src={`images/marcas/${getMarcaImageUrl(piloto.marca)}`} alt="" />}
                                        </div>
                                    </div>
                                ))}
                                <div className={`card-call-action-campeonato ver-tabla-completa ${verTablaCompletaColClass()}`}>
                                    <Link className="nav-link" to={getCampeonatoUrl()} onClick={() => handleButtonClick('campeonato')}>
                                        <div>
                                            <img src="images/+.png" alt="" />
                                        </div>
                                        <h4 className='h4-piloto'>Ver Tabla Completa</h4>
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}   </>
    )
}

export default CallActionCampeonato;
