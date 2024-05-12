import React, { useState, useEffect } from 'react';

const Contador = () => {
  const [contador, setContador] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (contador > 0) {
        setContador(contador - 1);
      } else {
        setTimeout(() => {
          setContador(5); // Reinicia el contador después de 2 segundos
        }, 2000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contador]);

  return (
    <div className="contador">
      {contador > 0 ? (
        <>
          <h4 style={{color: "#fe0"}}>Actualizando en {contador}</h4>
          <div className="progress-bar" style={{ width: `${(5 - contador) * 20}%`, backgroundColor: '#fe0' }}></div>
        </>
      ) : (
        <>
          <h4 style={{color: "#fe0"}}>Actualizando...</h4>
          <div className="progress-bar" style={{ width: '100%', backgroundColor: '#fe0' }}></div>
        </>
      )}
    </div>
  );
};

export default Contador;
