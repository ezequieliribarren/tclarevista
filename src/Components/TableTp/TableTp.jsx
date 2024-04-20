import React, { useState } from 'react';

const TableTp = ({ campeonatoData }) => {
    const [claseActual, setClaseActual] = useState('clase3'); // Inicialmente muestra la clase 3
    const [selectedButton, setSelectedButton] = useState('clase3'); // Inicialmente marca el botón de clase 3

    const handleClaseChange = (clase) => {
        setClaseActual(clase);
        setSelectedButton(clase); // Actualiza el botón seleccionado
    };

    return (
        <>
            <div className="buttons-container">
                <button
                    className={`button-tanda ${selectedButton === 'clase1' ? 'selected-button' : ''}`}
                    onClick={() => handleClaseChange('clase1')}
                >
                    Clase 1
                </button>
                <button
                    className={`button-tanda ${selectedButton === 'clase2' ? 'selected-button' : ''}`}
                    onClick={() => handleClaseChange('clase2')}
                >
                    Clase 2
                </button>
                <button
                    className={`button-tanda ${selectedButton === 'clase3' ? 'selected-button' : ''}`}
                    onClick={() => handleClaseChange('clase3')}
                >
                    Clase 3
                </button>
            </div>
            <table className='tabla-campeonato'>
                <thead>
                    <tr className="row">
                        <th className="col-1 pos-carreras none-th">
                            <h4>Pos.</h4>
                        </th>
                        <th className="col-1 pos-carreras none-th">
                            <h4>N°</h4>
                        </th>
                        <th className="col-5 th-piloto">
                            <h4>Piloto</h4>
                        </th>
                        <th className="col-2">
                            <h4>Auto</h4>
                        </th>
                        <th className="col-3">
                            <h4 className='h4-vueltas'>Puntos</h4>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {campeonatoData[claseActual].map((item, index) => (
                        <tr key={index} className="row d-flex justify-content-center">
                            <td className="col-1 pos-carreras-td">
                                <h4 className='h4-pos-tabla'>{item.posicion}</h4>
                            </td>
                            <td className="col-1 vueltas-carreras-td">
                                <h4 className='h4-vueltas'>{item.nro}</h4>
                            </td>
                            <td className="col-5 piloto-carreras-td">
                                <h4 className='h4-piloto'>{item.piloto}</h4>
                            </td>
                            <td className="col-2 vueltas-carreras-td">
                                <h4>{item.auto}</h4>
                            </td>
                            <td className="col-3 grupo-carreras-td">
                                <h4 className='h4-vueltas'>{item.puntos}</h4>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default TableTp;