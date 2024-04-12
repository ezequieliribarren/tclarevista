import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import PrincipalesCategoria from '../PrincipalesCategoria/PrincipalesCategoria';
import GeneralesCategoria from '../GeneralesCategoria/GeneralesCategoria';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import CallActionCarrerasCat from '../CallActionCarrerasCat/CallActionCarrerasCat';
import CallActionCampeonato from '../CallActionCampeonato/CallActionCampeonato';

const Categoria = () => {
    const { categoria } = useParams();
    useEffect(() => {
        const scrollToTopWithDelay = () => {
            setTimeout(() => {
                window.scrollTo(0, 0); // Llevar la página al tope después de 1 segundo
            }, 500);
        };

        scrollToTopWithDelay();

        return () => {
            clearTimeout(scrollToTopWithDelay); // Limpiar el timeout si el componente se desmonta antes de que se complete el retraso
        };
    }, []);


    return (
        <Layout background={categoria} logo={categoria} >
            <main>
                <div className="container-fluid">
                    <div className='row'>
                        <CallActionCampeonato />
                    </div>

                    <div className="row">
                        <PrincipalesCategoria cat={categoria} />
                    </div>

                    <div className="row">
                        <div className="col-md-8">
                            <GeneralesCategoria cat={categoria} />
                        </div>

                        <div className="col-md-4">
                            <CallActionCarrerasCat />
                            <PublicidadVertical />
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}

export default Categoria;
