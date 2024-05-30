import React from 'react';

const TableF1 = ({ campeonatoData, getMarcaImageUrl, getNacionalidadImgUrl }) => {




    return (
        <table className='tabla-campeonato container-fluid'>
            <thead>
                <tr className='row'>
                    <th className="col-1 pos-carreras none-th">
                        <h4>Pos.</h4>
                    </th>
                    <th className="col-2 none-th">
                        <h4>Nac.</h4>
                    </th>
                    <th className="col-5 th-piloto">
                        <h4>Piloto</h4>
                    </th>
                    <th className="col-2 none-th">
                        <h4>Marca</h4>
                    </th>
                    <th className="col-2">
                        <h4>Puntos</h4>
                    </th>
                </tr>
            </thead>
            <tbody>
                {campeonatoData.map((item, index) => (
                    <tr key={index} className="row d-flex justify-content-center">
                        <td className="col-1 pos-carreras-td">
                            <h4 className='h4-pos-tabla'>{item.posicion}</h4>
                        </td>
                        <td className="col-2 marca-carreras-td">
                            <img style={{width: "4.5rem"}} src={`images/banderas/${getNacionalidadImgUrl(item.nacionalidad)}`} alt="" />
                        </td>
                        <td className="col-5 piloto-carreras-td">
                            <h4 className='h4-piloto'>{item.piloto}</h4>
                        </td>
                        <td className="col-2 marca-carreras-td">
                            {item.marca && <img src={`images/marcas/${getMarcaImageUrl(item.marca)}`} alt="" />}
                        </td>
                        <td className="col-2 grupo-carreras-td">
                            <h4>{item.puntos}</h4>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableF1;
