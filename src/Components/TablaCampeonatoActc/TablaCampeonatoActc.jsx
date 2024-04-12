import React, { useState, useEffect } from 'react';

const TablaCampeonatoActc = ({campeonatoData, categoria}) => {


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

  // const getCarImageUrl = (piloto) => {
  //   const pilotoLowerCase = piloto.toLowerCase();
  //   if (pilotoLowerCase.includes('todino')) {
  //     return 'todino.png';
  //   } else if (pilotoLowerCase.includes('santero')) {
  //     return 'santero.png';
  //   }
  //   else if (pilotoLowerCase.includes('gini')) {
  //     return 'gini.png';
  //   }
  //   else if (pilotoLowerCase.includes('urcera')) {
  //     return 'urcera.png';
  //   }
  //   else if (pilotoLowerCase.includes('werner')) {
  //     return 'werner.png';
  //   }
  //   else if (pilotoLowerCase.includes('lambiris')) {
  //     return 'lambiris.png';
  //   }
  //   else if (pilotoLowerCase.includes('martínez, agustín')) {
  //     return 'martinez-a.png';
  //   }
  //   else if (pilotoLowerCase.includes('iglesia')) {
  //     return 'iglesia.png';
  //   }
  //   else if (pilotoLowerCase.includes('martínez, tobías')) {
  //     return 'martinez-t.png';
  //   }
  //   else if (pilotoLowerCase.includes('ardusso')) {
  //     return 'ardusso.png';
  //   }
  //   else if (pilotoLowerCase.includes('fritzler')) {
  //     return 'fritzler.png';
  //   }
  //   else if (pilotoLowerCase.includes('álvarez')) {
  //     return 'alvarez.png';
  //   }
  //   else if (pilotoLowerCase.includes('quijada')) {
  //     return 'quijada.png';
  //   }
  //   else if (pilotoLowerCase.includes('de benedictis')) {
  //     return 'debenedictis.png';
  //   }
  //   else if (pilotoLowerCase.includes('ebarlín')) {
  //     return 'ebarlin.png';
  //   }
  //   else if (pilotoLowerCase.includes('bonelli')) {
  //     return 'bonelli.png';
  //   }
  //   else if (pilotoLowerCase.includes('craparo')) {
  //     return 'craparo.png';
  //   }
  //   else if (pilotoLowerCase.includes('catalán')) {
  //     return 'catalan.png';
  //   }
  //   else if (pilotoLowerCase.includes('landa')) {
  //     return 'landa.png';
  //   }
  //   else if (pilotoLowerCase.includes('catalán')) {
  //     return 'catalan.png';
  //   }
  //   else if (pilotoLowerCase.includes('chapur')) {
  //     return 'chapur.png';
  //   }
  //   else if (pilotoLowerCase.includes('londero')) {
  //     return 'londero.png';
  //   }
  //   else if (pilotoLowerCase.includes('ciantini')) {
  //     return 'ciantini.png';
  //   }
  //   else if (pilotoLowerCase.includes('jakos')) {
  //     return 'jakos.png';
  //   }

  //   else if (pilotoLowerCase.includes('agrelo')) {
  //     return 'agrelo.png';
  //   }

  //   else if (pilotoLowerCase.includes('ferrante')) {
  //     return 'ferrante.png';
  //   }

  //   else if (pilotoLowerCase.includes('spataro')) {
  //     return 'spataro.png';
  //   }

  //   else if (pilotoLowerCase.includes('cotignola')) {
  //     return 'cotignola.png';
  //   }

  //   else if (pilotoLowerCase.includes('mangoni')) {
  //     return 'mangoni.png';
  //   }
  //   else if (pilotoLowerCase.includes('benvenuti')) {
  //     return 'benvenuti.png';
  //   }
  //   else if (pilotoLowerCase.includes('trosset')) {
  //     return 'trosset.png';
  //   }
  //   else if (pilotoLowerCase.includes('carinelli')) {
  //     return 'carinelli.png';
  //   }
  //   else if (pilotoLowerCase.includes('de carlo')) {
  //     return 'de-carlo.png';
  //   }
  //   else if (pilotoLowerCase.includes('trucco')) {
  //     return 'trucco.png';
  //   }
  //   else if (pilotoLowerCase.includes('castellano')) {
  //     return 'casatellano.png';
  //   }
  //   else if (pilotoLowerCase.includes('iribarne')) {
  //     return 'iribarne.png';
  //   }
  //   else if (pilotoLowerCase.includes('candela')) {
  //     return 'candela.png';
  //   }
  //   else if (pilotoLowerCase.includes('garbelino')) {
  //     return 'garbelino.png';
  //   }
  //   else if (pilotoLowerCase.includes('fontana')) {
  //     return 'fontana.png';
  //   }
  //   else if (pilotoLowerCase.includes('ledesma')) {
  //     return 'ledesma.png';
  //   }
  //   else if (pilotoLowerCase.includes('alaux')) {
  //     return 'alaux.png';
  //   }
  //   else if (pilotoLowerCase.includes('vázques')) {
  //     return 'vazques.png';
  //   }
  //   else if (pilotoLowerCase.includes('abella')) {
  //     return 'abella.png';
  //   }
  //   else if (pilotoLowerCase.includes('jalaf')) {
  //     return 'jalaf.png';
  //   }
  //   else if (pilotoLowerCase.includes('ciantini')) {
  //     return 'ciantini.png';
  //   }


  //   else {
  //     return 'default.png';
  //   }
  // };

  
    
  return (
    <>
      <table className='tabla-campeonato'>
        <div className="row">
          {categoria !== 'rally-argentino' && (
            <>
              <th className="col-1 pos-carreras none-th">
                <h4>Pos.</h4>
              </th>
              <th className="col-1 none-th">
                <h4>N°</h4>
              </th>
              <th className="col-5 th-piloto">
                <h4>Piloto</h4>
              </th>
            </>
          )}
          {categoria === 'tn' && (
            <>
              <th className="col-2">
                <h4>Auto</h4>
              </th>
              <th className="col-3">
                <h4 className='h4-vueltas'>Puntos</h4>
              </th>
            </>
          )}
          {categoria !== 'rally-argentino' && categoria !== 'tn' && (
            <>
              <th className="col-2 th-victorias none-th">
                <img src="images/cup.png" alt="" />
              </th>
              <th className="col-1 none-th">
                <h4>Marca</h4>
              </th>
              <th className="col-2">
                <h4>Puntos</h4>
              </th>
            </>
          )}
        </div>
        {campeonatoData.map((item, index) => (
          <tr key={index} className="row d-flex justify-content-center">
            {categoria === 'rally-argentino' && (
              <>
                <td className="col-1 pos-carreras-td">
                  <h4 className='h4-pos-tabla'>{index + 1}</h4>
                </td>
                <td className="col-5 piloto-carreras-td">
                  <h4 className='h4-piloto'>{item.piloto}</h4>
                </td>
                <td className="col-3 grupo-carreras-td">
                  <h4>{item.puntos}</h4>
                </td>
              </>
            )}
            {categoria !== 'rally-argentino' && (
              <>
                <td className="col-1 pos-carreras-td">
                  <h4 className='h4-pos-tabla'>{item.posicion}</h4>
                </td>
                <td className="col-1 nro-piloto-td">
                  <h4 className='h4-nro-piloto'>{item.nro}</h4>
                </td>
                <td className="col-5 piloto-carreras-td">
                  <h4 className='h4-piloto'>{item.piloto}</h4>
                </td>
                
              </>
            )}
            {categoria === 'tn' && (
              <>
                <td className="col-2 vueltas-carreras-td display-none">
                  <h4>{item.victorias}</h4>
                </td>
                <td className="col-3 vueltas-carreras-td">
                  <h4 className='h4-vueltas'>{item.marca}</h4>
                </td>
              </>
            )}
            {categoria !== 'rally-argentino' && categoria !== 'tn' && (
              <>
                <td className="col-2 vueltas-carreras-td">
                  <h4>{item.victorias}</h4>
                </td>
                <td className="col-1 marca-carreras-td">
                  {item.marca && <img src={`images/marcas/${getMarcaImageUrl(item.marca)}`} alt="" />}
                </td>
                <td className="col-2 grupo-carreras-td">
                  <h4>{item.puntos}</h4>
                </td>
              </>
            )}
          </tr>
        ))}
      </table>
    </>
  );
};

export default TablaCampeonatoActc;