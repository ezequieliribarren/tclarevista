import React, { useState, useEffect } from 'react';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import TablaCampeonatoTc2000 from '../TablaCampeonatoTc2000/TablaCampeonatoTc2000';

const CampeonatoTc2000 = () => {
    const params = useParams();
    const categoria = params.categoria
    const [campeonatoData, setCampeonatoData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        // Realizar la solicitud a la API
        fetch('http://localhost:5000/api/campeonato/tc2000')
            .then(response => response.json())
            .then(data => {
                // Actualizar el estado con los datos obtenidos
                setCampeonatoData(data);
                // Cambiar el estado de loading a false
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // En caso de error, cambiar el estado de loading a false también
                setLoading(false);
            });
    }, []);

    return (
        <Layout background={categoria} logo={categoria}>
            <div className="container-fluid" id='campeonato'>
                <div className="row">
                    <div className="col-lg-10">
                        {loading ? (
                            <div className="spinner-container">
                                <ClipLoader color="#FE0" size={80} />
                            </div>
                        ) : (
                            <TablaCampeonatoTc2000 campeonatoData={campeonatoData} />
                        )}
                    </div>
                    <div className="col-lg-2">
                        <PublicidadVertical />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CampeonatoTc2000;
