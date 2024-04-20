import React from 'react'

const TableInternacionales = ({ campeonatoData }) => {
    return (
        <>
            <table className='tabla-campeonato'>
                <div className="row">
                    <th className="col-1 pos-carreras none-th">
                        <h4>Pos.</h4>
                    </th>
                    <th className="col-7 th-piloto">
                        <h4>Piloto</h4>
                    </th>
                    <th className="col-4">
                        <h4>Puntos</h4>
                    </th>
                </div>
                {campeonatoData.map((item, index) => (
                    <tr key={index} className="row d-flex justify-content-center">
                        <td className="col-1 pos-carreras-td">
                            <h4 className='h4-pos-tabla'>{item.posicion}</h4>
                        </td>
                        <td className="col-7 piloto-carreras-td">
                            <h4 className='h4-piloto'>{item.piloto}</h4>
                        </td>
                        <td className="col-4 grupo-carreras-td">
                            <h4>{item.puntos}</h4>
                        </td>
                    </tr>
                ))}
            </table>
        </>
    );

}

export default TableInternacionales