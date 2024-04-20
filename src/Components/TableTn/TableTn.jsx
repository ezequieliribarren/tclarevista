import React from 'react'

const TableTn = ({ campeonatoData, getMarcaImageUrl }) => {
    return (
        <>
            <table className='tabla-campeonato'>
                <div className="row">
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
                </div>
                {campeonatoData.map((item, index) => (
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
                            <h4>{item.victorias}</h4>
                        </td>     <td className="col-3 grupo-carreras-td">
                            <h4 className='h4-vueltas'>{item.marca}</h4>
                        </td>

                    </tr>
                ))}
            </table>
        </>
    );
};

export default TableTn;