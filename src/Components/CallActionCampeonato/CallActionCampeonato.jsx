import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { CircleLoader } from 'react-spinners'; // Importa CircleLoader

const CallActionCampeonato = () => {
    const { categoria } = useParams(); // Obtiene el valor del parámetro de la URL
    const [campeonatoData, setCampeonatoData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // Obtener los primeros 5 pilotos
    const primerosCincoPilotos = campeonatoData.slice(1, 6);

    return (
        <div className='container-fluid call-action-campeonato'>
            <div className='row'>
                <h2>Campeonato</h2>
            </div>
            <div className='row'>
                {loading ? ( // Si loading es true, muestra el CircleLoader
                    <div className="col-md-12 spinner-container">
                        <CircleLoader color="#36D7B7" size={80} />
                    </div>
                ) : (
                    <>
                        {primerosCincoPilotos.map((piloto, index) => (
                            <div key={index} className="col-md-2 card-call-action-campeonato">
                                <div><h4 className='h4-pos-campeonato'>{piloto.posicion.replace('°', '')}</h4></div>
                                <div><h4 className='h4-piloto'>{piloto.piloto}</h4></div>
                                <div> {piloto.marca && <img src={`images/marcas/${getMarcaImageUrl(piloto.marca)}`} alt="" />}</div>
                            </div>
                        ))}
                        <div className="col-md-2 card-call-action-campeonato ver-tabla-completa">
                            <Link className="nav-link" to={campeonatoUrl} onClick={() => handleButtonClick('campeonato')}>
                                <h4 className='h4-piloto'><span><img src="images/+.png" alt="" /></span>Ver Tabla Completa</h4>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default CallActionCampeonato;
