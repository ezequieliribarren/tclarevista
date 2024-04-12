import React from 'react';

const TablaCampeonatoTc2000 = ({ campeonatoData }) => {


    const getMarcaImageUrl = (marca) => {
        if (marca && marca.includes('chevrolet')) {
          return 'chevrolet.png';
        } else if (marca && marca.includes('ford')) {
          return 'ford.png';
        }
        else if (marca && marca.includes('mustang')) {
          return 'mustang.png';
        }
        else if (marca && marca.includes('dodge')) {
          return 'dodge.png';
        }
        else if (marca && marca.includes('torino')) {
          return 'torino.png';
        }
        else if (marca && marca.includes('camaro')) {
          return 'camaro.png';
        }
        else if (marca && marca.includes('toyota')) {
          return 'toyota.png';
        }
        else if (marca && marca.includes('volkswagen')) {
          return 'volkswagen.png';
        }
        else if (marca && marca.includes('citroen')) {
          return 'citroen.png';
        }
        else if (marca && marca.includes('renault')) {
          return 'renault.png';
        }
        else if (marca && marca.includes('fiat')) {
          return 'fiat.png';
        }
        else if (marca && marca.includes('honda')) {
          return 'honda.png';
        }
        else {
          // Si la marca no coincide con chevrolet ni ford, puedes devolver una imagen por defecto
          return 'default.png';
        }
      };



    return (
        <table className='tabla-campeonato'>
            <thead>
                <tr className="row">
                    <th className="col-1 pos-carreras none-th">
                        <h4>Pos.</h4>
                    </th>
                    <th className="col-5 th-piloto">
                        <h4>Piloto</h4>
                    </th>
                    <th className="col-3">
                        <h4>Marca</h4>
                    </th>
                    <th className="col-2">
                        <h4>Puntos</h4>
                    </th>
                </tr>
            </thead>
            <tbody>
                {campeonatoData.map((item, index) => (
                    <tr key={index} className="row">
                        <td className="col-1 pos-carreras-td">
                            <h4 className='h4-pos-tabla'>{item.posicion}</h4>
                        </td>
                        <td className="col-5 piloto-carreras-td">
                            <h4 className='h4-piloto'>{item.piloto}</h4>
                        </td>
                         <td className="col-3 marca-carreras-td">
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
}

export default TablaCampeonatoTc2000;
