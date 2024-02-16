import React, { createContext, useContext, useState, useEffect } from 'react';

// FUNCION PARA GENERAR ENLACES
function generarEnlaceConParametros(sheetId) {
  var spreadsheetId = "15F2oc2Aki9WnGWgKFo4Ms3kzpuUR3BoUe8nkM15-Vgo";
  var enlace = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&gid=${sheetId}`;
  return enlace;
}

// HOJA DE CARRERAS ANUALES
function carrerasAnuales() {
  return generarEnlaceConParametros("832902135");
}

// CONTEXT DE NOTICIAS
const NewsContext = createContext();
export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
        try {
            const response = await fetch('http://localhost:5000/api/noticias');

      
          if (!response.ok) {
            // Manejar errores de la respuesta (puedes personalizar según tus necesidades)
            console.error('Error al obtener noticias. Código de estado:', response.status);
            return;
          }
      
          const data = await response.json();
      
          if (Object.keys(data).length > 0) {
            setNews(data);
          } else {
            console.error('La respuesta de la API no contiene datos JSON válidos.');
          }
        } catch (error) {
          console.error('Error al obtener noticias:', error);
        }
      }
      
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news }}>
      {children}
    </NewsContext.Provider>
  );
};

// CONTEXT CAMPEONATOS
const CampeonatoContext = createContext();
export const useCampeonatoContext = () => useContext(CampeonatoContext);

export const CampeonatoProvider = ({ children }) => {
  const [campeonato, setCampeonato] = useState([]);

  useEffect(() => {
    async function fetchCampeonato() {
        try {
            const response = await fetch('http://localhost:5000/api/campeonatos');

      
          if (!response.ok) {
            // Manejar errores de la respuesta (puedes personalizar según tus necesidades)
            console.error('Error al obtener campeonato. Código de estado:', response.status);
            return;
          }
      
          const data = await response.json();
      
          if (Object.keys(data).length > 0) {
            setCampeonato(data);
          } else {
            console.error('La respuesta de la API no contiene datos JSON válidos.');
          }
        } catch (error) {
          console.error('Error al obtener noticias:', error);
        }
      }
      
    fetchCampeonato();
  }, []);

  return (
    <CampeonatoContext.Provider value={{ campeonato }}>
      {children}
    </CampeonatoContext.Provider>
  );
};


// CONTEXT CARRERAS ANUALES
const CarrerasAnualesContext = createContext();

export const CarrerasAnualesProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlaceCarrerasAnuales = carrerasAnuales();

    const fetchData = async () => {
      try {
        const response = await fetch(enlaceCarrerasAnuales);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos desde Google Sheets:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <CarrerasAnualesContext.Provider value={data}>
      {children}
    </CarrerasAnualesContext.Provider>
  );
};

export const useCarrerasAnuales = () => {
  return useContext(CarrerasAnualesContext);
};