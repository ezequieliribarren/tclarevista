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
function tc() {
  return generarEnlaceConParametros("1872673772");
}
function tcp() {
  return generarEnlaceConParametros("2030835384");
} 
function tcm() {
  return generarEnlaceConParametros("2138676913");
} 
function tcpm() {
  return generarEnlaceConParametros("489487000");
} 
function tcpk() {
  return generarEnlaceConParametros("0");
} 
function tcppk() {
  return generarEnlaceConParametros("1112076324");
} 
function rally() {
  return generarEnlaceConParametros("934475876");
} 
function f1() {
  return generarEnlaceConParametros("1870545693");
} 
function motogp() {
  return generarEnlaceConParametros("1456952227");
} 
function indycar() {
  return generarEnlaceConParametros("239413181");
} 
function nascar() {
  return generarEnlaceConParametros("287281711");
} 
function rmun() {
  return generarEnlaceConParametros("1226827878");
} 
function fe() {
  return generarEnlaceConParametros("672242614");
} 
function tablascampeonatos() {
  return generarEnlaceConParametros("1579842406");
} 
function tr() {
  return generarEnlaceConParametros("1197579525");
} 
function trseries() {
  return generarEnlaceConParametros("435208865");
} 
function tp() {
  return generarEnlaceConParametros("1432416990");
}
function tc2000() {
  return generarEnlaceConParametros("901761059");
}
function tn() {
  return generarEnlaceConParametros("249354540");
}
function tn3() {
  return generarEnlaceConParametros("162407611");
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

// CONTEXT CAMPEONATO HOJA DE CALCULO
const TablaCampeonatoContext = createContext();

export const TablaCampeonatoProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tablascampeonatos();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TablaCampeonatoContext.Provider value={data}>
      {children}
    </TablaCampeonatoContext.Provider>
  );
};

export const useTablaCampeonato = () => {
  return useContext(TablaCampeonatoContext);
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

// CONTEXT-CATEGORIAS

// TC

const TcContext = createContext();

export const TcProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlaceTc = tc();

    const fetchData = async () => {
      try {
        const response = await fetch(enlaceTc);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2); 
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TcContext.Provider value={data}>
      {children}
    </TcContext.Provider>
  );
};

export const useTc = () => {
  return useContext(TcContext);
};


// TCP

const TcpContext = createContext();

export const TcpProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tcp();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TcpContext.Provider value={data}>
      {children}
    </TcpContext.Provider>
  );
};

export const useTcp = () => {
  return useContext(TcpContext);
};


// TCM

const TcmContext = createContext();

export const TcmProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tcm();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TcmContext.Provider value={data}>
      {children}
    </TcmContext.Provider>
  );
};

export const useTcm = () => {
  return useContext(TcmContext);
};


// TCPM

const TcpmContext = createContext();

export const TcpmProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tcpm();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TcpmContext.Provider value={data}>
      {children}
    </TcpmContext.Provider>
  );
};

export const useTcpm = () => {
  return useContext(TcpmContext);
};


// TCPK

const TcpkContext = createContext();

export const TcpkProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tcpk();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TcpkContext.Provider value={data}>
      {children}
    </TcpkContext.Provider>
  );
};

export const useTcpk = () => {
  return useContext(TcpkContext);
};


// TCPPK

const TcppkContext = createContext();

export const TcppkProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tcppk();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TcppkContext.Provider value={data}>
      {children}
    </TcppkContext.Provider>
  );
};

export const useTcppk = () => {
  return useContext(TcppkContext);
};


// TN 
const TnContext = createContext();

export const TnProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tn();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TnContext.Provider value={data}>
      {children}
    </TnContext.Provider>
  );
};

export const useTn = () => {
  return useContext(TnContext);
};

// TN3 
const Tn3Context = createContext();

export const Tn3Provider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tn3();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <Tn3Context.Provider value={data}>
      {children}
    </Tn3Context.Provider>
  );
};

export const useTn3 = () => {
  return useContext(Tn3Context);
};



// RALLY-ARGENTINO

const RallyContext = createContext();
export const RallyProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = rally();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <RallyContext.Provider value={data}>
      {children}
    </RallyContext.Provider>
  );
};

export const useRally = () => {
  return useContext(RallyContext);
};


// TP C3
const TpContext = createContext();
export const TpProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tp();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TpContext.Provider value={data}>
      {children}
    </TpContext.Provider>
  );
};

export const useTp = () => {
  return useContext(TpContext);
};

// TC2000
const Tc2000Context = createContext();
export const Tc2000Provider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tc2000();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <Tc2000Context.Provider value={data}>
      {children}
    </Tc2000Context.Provider>
  );
};

export const useTc2000 = () => {
  return useContext(Tc2000Context);
};




// INTERNACIONALES

// FORMULA 1

const F1Context = createContext();
export const F1Provider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = f1();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <F1Context.Provider value={data}>
      {children}
    </F1Context.Provider>
  );
};

export const useF1 = () => {
  return useContext(F1Context);
};


// MOTO-GP

const MgpContext = createContext();
export const MgpProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = motogp();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <MgpContext.Provider value={data}>
      {children}
    </MgpContext.Provider>
  );
};

export const useMgp = () => {
  return useContext(MgpContext);
};


// INDYCAR

const IndyContext = createContext();
export const IndyProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = indycar();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <IndyContext.Provider value={data}>
      {children}
    </IndyContext.Provider>
  );
};

export const useIndy = () => {
  return useContext(IndyContext);
};


// NASCAR

const NasContext = createContext();
export const NasProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = nascar();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <NasContext.Provider value={data}>
      {children}
    </NasContext.Provider>
  );
};

export const useNas = () => {
  return useContext(NasContext);
};


// RALLY - MUNDIAL

const RmunContext = createContext();
export const RmunProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = rmun();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <RmunContext.Provider value={data}>
      {children}
    </RmunContext.Provider>
  );
};

export const useRmun = () => {
  return useContext(RmunContext);
};



// FORMULA - E 

const FeContext = createContext();
export const FeProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = fe();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <FeContext.Provider value={data}>
      {children}
    </FeContext.Provider>
  );
};

export const useFe = () => {
  return useContext(FeContext);
};


// TOP RACE

const TrContext = createContext();
export const TrProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = tr();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TrContext.Provider value={data}>
      {children}
    </TrContext.Provider>
  );
};

export const useTr = () => {
  return useContext(TrContext);
};



// TOP RACE SERIES

const TrSeriesContext = createContext();
export const TrSeriesProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const enlace = trseries();

    const fetchData = async () => {
      try {
        const response = await fetch(enlace);
        const textData = await response.text();
        const jsonData = textData.substring(47, textData.length - 2);
        const parsedData = JSON.parse(jsonData);
        setData(parsedData.table.rows);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <TrSeriesContext.Provider value={data}>
      {children}
    </TrSeriesContext.Provider>
  );
};

export const useTrSeries = () => {
  return useContext(TrSeriesContext);
};















