import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import PrincipalesCategoria from '../PrincipalesCategoria/PrincipalesCategoria';
import GeneralesCategoria from '../GeneralesCategoria/GeneralesCategoria';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';

const DetailNoticiasCat = () => {
    const { categoria } = useParams(); 


    return (
        <Layout background={categoria} logo={categoria} >
            <main>
                    <div className="row">
                        <div className="col-md-8">
                            <GeneralesCategoria cat={categoria} /> 
                        </div>

                        <div className="col-md-4">
                            <PublicidadVertical />
                        </div>
                    </div>
            </main>
        </Layout>
    );
}

export default DetailNoticiasCat;
