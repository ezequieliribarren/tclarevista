import React, { useState, useEffect } from 'react';
import Layout from '../../LayoutCategoria/LayoutCategoria';
import { useParams } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import TablaCampeonatoActc from '../TablaCampeonatoActc/TablaCampeonatoActc';
import PublicidadVertical from '../PublicidadVertical/PublicidadVertical';
import { useTablaCampeonato } from '../../../Context/Context';

const DetailCampeonatoCat = () => {
  const { categoria } = useParams();
  const [tipoCampeonato, setTipoCampeonato] = useState('regular');
  const [campeonatoData, setCampeonatoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useTablaCampeonato();

  const copaDeOroURL = context[0]?.c[2]?.v || ''; // Obtener el valor de la fila 0 columna 2 o establecer una cadena vacía si está vacía

// Luego, en el renderizado del botón de "Copa de Oro", puedes verificar si la URL no está vacía antes de renderizar el botón:

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
        const response = await fetch(`http://localhost:5000/api/${tipoCampeonato === 'regular' ? 'campeonatos' : 'copa-de-oro'}/${categoria}`);
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

  const handleTipoCampeonatoChange = (tipo) => {
    setTipoCampeonato(tipo);
  };


  return (
    <Layout background={categoria} logo={categoria}>
      <div className="row">
        <div className="col-lg-10">
          <div className='select-campeonato'>
            <button className={`button-campeonato ${tipoCampeonato === 'regular' ? 'selected' : ''}`} onClick={() => handleTipoCampeonatoChange('regular')}>Tabla Regular</button>
            {renderizarBotonCopaDeOro()}
          </div>      
          {loading && (
            <div className="spinner-container">
              <CircleLoader color="#36D7B7" size={80} />
            </div>
          )}
          {!loading && <TablaCampeonatoActc campeonatoData={campeonatoData} />}
        </div>
        <div className="col-lg-2">
          <PublicidadVertical />
        </div>
      </div>
    </Layout>
  );
};

export default DetailCampeonatoCat;
