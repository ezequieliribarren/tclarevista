import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useParams } from 'react-router-dom';

const Huella = () => {
    const { categoria } = useParams();

    // Obtener la sección actual de la URL
    const currentSection = window.location.hash.split('/')[2];

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
                return 'Turismo Pista';
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

    // Función para capitalizar la primera letra de una cadena
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className='huella'>
            <div>
                <Link to={`/${categoria}#`}>
                    <h4><span><img src="images/flecha.png" alt="" /></span>{getCategoriaNombre(categoria)}</h4>
                </Link>
            </div>
            <div>
                {/* Mostrar enlace solo si hay una sección actual */}
                {currentSection && (
                    <Link to={`/${categoria}/${currentSection}#`}>
                        <h4><span><img src="images/flecha.png" alt="" /></span>{capitalizeFirstLetter(currentSection)}</h4>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Huella;
