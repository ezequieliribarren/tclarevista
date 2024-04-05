import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

const Domingo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'http://localhost:5000/ip1menu',
          'http://localhost:5000/ip2menu',
          'http://localhost:5000/ip3menu',
          'http://localhost:5000/ip4menu'
        ];

        // Realizar fetch a todas las URLs en paralelo
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const jsonResponses = await Promise.all(responses.map(response => response.json()));
        
        // Iterar sobre los arrays de respuesta y encontrar el conjunto de datos correspondiente al domingo
        let domingoData = [];
        for (let i = 0; i < jsonResponses.length; i++) {
          const response = jsonResponses[i];
          const domingo = response.find(obj => obj && obj.title && obj.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === "domingo");
          if (domingo) {
            domingoData = domingo.items.map(item => ({ ...item, categoria: domingo.categoria })); // Agregar la categoría a cada item
            break; // Detener la iteración si se encontraron datos de domingo
          }
        }

        setData(domingoData);
        setLoading(false); // Establecer loading a false cuando se reciben los datos
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // En caso de error, también establecer loading a false
      }
    };

    fetchData();
  }, []);

  return (
    <div className='contenedor-vivo'>
      {loading ? ( // Si loading es true, mostrar el spinner
        <div className="spinner-container">
          <ClipLoader color="#FE0" size={80} />
        </div>
      ) : ( // Si loading es false, mostrar los datos
        data.map((item, index) => (
          <div className='vivo' key={index}>
            <h4 className="tanda">{item.tanda}</h4>
            <p className="categoria">{item.categoria}</p> {/* Renderizar la categoría */}
            {item.estado && <img src={item.estado} alt="Estado" />}
          </div>
        ))
      )}
    </div>
  );
};

export default Domingo;