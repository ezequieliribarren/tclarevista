import React, { useState, useEffect } from 'react';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import { useParams } from 'react-router-dom';
import { CircleLoader, ClipLoader } from 'react-spinners';
import TablaCampeonatoActc from '../TablaCampeonatoActc/TablaCampeonatoActc';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { useTablaCampeonato } from '../../../Context/Context';
import TableF1 from '../TableF1/TableF1';
import TableRallyArgentino from '../TableRallyArgentino/TableRallyArgentino';
import TableTn from '../TableTn/TableTn';
import TableTopRace from '../TableTopRace/TableTopRace';
import TableInternacionales from '../TableInternacionales/TableInternacionales';
import TableTp from '../TableTp/TableTp';

const DetailCampeonatoCat = () => {
  const { categoria } = useParams();
  const [tipoCampeonato, setTipoCampeonato] = useState('regular');
  const [campeonatoData, setCampeonatoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useTablaCampeonato();

  const copaDeOroURL = context[0]?.c[2]?.v || '';
  

  const renderizarBotonCopaDeOro = () => {
    if (copaDeOroURL) {
      return (
        <button className={`button-campeonato ${tipoCampeonato === 'copa-de-oro' ? 'selected' : ''}`} onClick={() => handleTipoCampeonatoChange('copa-de-oro')}>Copa de Oro</button>
      );
    } else {
      return null; // No renderizar el botón si la URL está vacía
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let apiUrl = '';
        if (categoria === 'rally-argentino') {
          apiUrl = 'http://localhost:5000/api/campeonato/rally-argentino';
        } else if (categoria === 'tc2000') {
          apiUrl = 'http://localhost:5000/api/campeonato/tc2000';
        }
        else if (categoria === 'tp') {
          apiUrl = 'http://localhost:5000/api/campeonato/tp';
        }
        else if (categoria === 'f1') {
          apiUrl = 'http://localhost:5000/api/campeonato/f1';
        }
        else if (categoria === 'moto-gp') {
          apiUrl = 'http://localhost:5000/api/campeonato/moto-gp';
        }
        else if (categoria === 'nascar') {
          apiUrl = 'http://localhost:5000/api/campeonato/nascar';
        }
        else if (categoria === 'indycar-series') {
          apiUrl = 'http://localhost:5000/api/campeonato/indycar-series';
        }
        else if (categoria === 'rally-mundial') {
          apiUrl = 'http://localhost:5000/api/campeonato/rally-mundial';
        }
        else if (categoria === 'formula-e') {
          apiUrl = 'http://localhost:5000/api/campeonato/formula-e';
        }
        else {
          apiUrl = `http://localhost:5000/api/${tipoCampeonato === 'regular' ? 'campeonatos' : 'copa-de-oro'}/${categoria}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('No se pudo obtener los datos');
        }
        const data = await response.json();
        setCampeonatoData(data);
      } catch (error) {
        console.error('Error al obtener los datos del campeonato:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoria, tipoCampeonato]);

  console.log(categoria)


  const handleTipoCampeonatoChange = (tipo) => {
    setTipoCampeonato(tipo);
  };


  const getNacionalidadImgUrl = (nacionalidad) => {
    if (nacionalidad && nacionalidad.includes('NED')) {
      return 'holanda.png';
    } else if (nacionalidad && nacionalidad.includes('AUS')) {
      return 'austria.png';
    } else if (nacionalidad && nacionalidad.includes('ESP')) {
      return 'españa.png';
    } else if (nacionalidad && nacionalidad.includes('MEX')) {
      return 'mexico.png';
    } else if (nacionalidad && nacionalidad.includes('MON')) {
      return 'monaco.png';
    } else if (nacionalidad && nacionalidad.includes('CAN')) {
      return 'canada.png';
    } else if (nacionalidad && nacionalidad.includes('DEN')) {
      return 'dinamarca.png';
    } else if (nacionalidad && nacionalidad.includes('GBR')) {
      return 'reino-unido.png';
    } else if (nacionalidad && nacionalidad.includes('CAN')) {
      return 'canada.png';
    } else if (nacionalidad && nacionalidad.includes('GER')) {
      return 'alemania.png';
    } else if (nacionalidad && nacionalidad.includes('JPN')) {
      return 'japon.png';
    } else if (nacionalidad && nacionalidad.includes('THA')) {
      return 'tailandia.png';
    } else if (nacionalidad && nacionalidad.includes('CHN')) {
      return 'china.png';
    } else if (nacionalidad && nacionalidad.includes('FRA')) {
      return 'francia.png';
    } else if (nacionalidad && nacionalidad.includes('FIN')) {
      return 'finlandia.png';
    } else if (nacionalidad && nacionalidad.includes('USA')) {
      return 'estados-unidos.png';
    } else {
      // Si la nacionalidad no coincide con ninguna, puedes devolver una imagen por defecto
      return 'default.png';
    }
  };

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
    else if (marca && marca.includes('Red Bull Racing')) {
      return 'red.png';
    }
    else if (marca && marca.includes('Ferrari')) {
      return 'ferrari.png';
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
    <Layout background={categoria} logo={categoria}>
      <div className="container-fluid" id='campeonato'>
        <div className="row">
       
            <div className='select-campeonato'>
              {(categoria === 'tc' || categoria === 'tcp' || categoria === 'tcm' || categoria === 'tcpk' || categoria === 'tcppk' || categoria === 'tcm') && <button className={`button-campeonato ${tipoCampeonato === 'regular' ? 'selected' : ''}`} onClick={() => handleTipoCampeonatoChange('regular')}>Tabla Regular</button>}
              {renderizarBotonCopaDeOro()}
            </div>
            {loading && (
              <div className="spinner-container">
                <ClipLoader color="#FE0" size={80} />
              </div>
            )} <h2>{campeonatoData.length > 0 && campeonatoData[0].disputadas}</h2>           <div className="col-lg-10">
            {!loading && categoria === 'tp' && <TableTp campeonatoData={campeonatoData} />}
            {!loading && categoria === 'tn' && <TableTn campeonatoData={campeonatoData} getMarcaImageUrl={getMarcaImageUrl} />}
            {!loading && categoria === 'rally-argentino' && <TableRallyArgentino campeonatoData={campeonatoData} getMarcaImageUrl={getMarcaImageUrl} />}
            {!loading && categoria === 'f1' && <TableF1 campeonatoData={campeonatoData} getMarcaImageUrl={getMarcaImageUrl} getNacionalidadImgUrl={getNacionalidadImgUrl} />}
            {!loading && ((categoria === 'tc' || categoria === 'tcp' || categoria === 'tcm' || categoria === 'tcpk' || categoria === 'tcppk' || categoria === 'tcm') && <TablaCampeonatoActc campeonatoData={campeonatoData} getMarcaImageUrl={getMarcaImageUrl} />)}
            {!loading && ((categoria === 'moto-gp' || categoria === 'rally-mundial' || categoria === 'nascar' || categoria === 'indycar-series' || categoria === 'formula-e') && <TableInternacionales campeonatoData={campeonatoData} />)}
            {!loading && ((categoria === 'tr' || categoria === 'tr-series') && <TableTopRace campeonatoData={campeonatoData} />)}
          </div>
          <div className="col-lg-2">
            <PublicidadVertical />
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default DetailCampeonatoCat;
