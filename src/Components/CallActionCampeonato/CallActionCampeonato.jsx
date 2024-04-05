import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { ClipLoader } from 'react-spinners'; // Importa CircleLoader

const CallActionCampeonato = () => {
    const { categoria } = useParams(); // Obtiene el valor del parámetro de la URL
    const [campeonatoData, setCampeonatoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numPilotos, setNumPilotos] = useState(5); // Estado para la cantidad de pilotos a mostrar

    const campeonatoUrl = `/${categoria || param}/campeonato`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/campeonatos/${categoria}`);
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
    }, [categoria]);

    // Función para manejar el cambio en el tamaño de la pantalla
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

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        if (numPilotos === 5) return 'col-lg-2';
        else if (numPilotos === 3) return 'col-md-3 col-sm-3';
        else if (numPilotos === 2) return 'col-5';
        else if (numPilotos === 1) return 'col-9';
    };

    const verTablaCompletaColClass = () => {
        if (numPilotos === 5) return 'col-lg-2';
        else if (numPilotos === 3) return 'col-md-3 col-sm-3';
        else if (numPilotos === 2) return 'col-2';
        else if (numPilotos === 1) return 'col-3';
    };;

    const primerosNPilotos = campeonatoData.slice(1, numPilotos + 1);

    return (
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
                                    <h4 className='h4-pos-campeonato'>{piloto.posicion.replace('°', '')}</h4>
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
                            <Link className="nav-link" to={campeonatoUrl} onClick={() => handleButtonClick('campeonato')}>
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
    )
}

export default CallActionCampeonato;
