import React from 'react'

const TableRallyArgentino = ({ campeonatoData, getMarcaImageUrl }) => {
    return (
        <>
          <table className='tabla-campeonato'>
            <div className="row">
              <th className="col-1 pos-carreras none-th">
                <h4>Pos.</h4>
              </th>
              <th className="col-5 th-piloto">
                <h4>Piloto</h4>
              </th>
              <th className="col-3">
                <h4>Marca</h4>
              </th>
              <th className="col-3">
                <h4>Puntos</h4>
              </th>
            </div>
            {/* Renderizar filas de la tabla para rally-argentino */}
            {campeonatoData.map((item, index) => (
              <tr key={index} className="row d-flex justify-content-center">
                <td className="col-1 pos-carreras-td">
                  <h4 className='h4-pos-tabla'>{index + 1}</h4>
                </td>
                <td className="col-5 piloto-carreras-td">
                  <h4 className='h4-piloto'>{item.piloto}</h4>
                </td>
                <td className="col-3 marca-carreras-td">
                  {item.marca && <img src={`images/marcas/${getMarcaImageUrl(item.marca)}`} alt="" />}
                </td>
                <td className="col-3 grupo-carreras-td">
                  <h4>{item.puntos}</h4>
                </td>
              </tr>
            ))}
          </table>
        </>
      );
    };

export default TableRallyArgentino