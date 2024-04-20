import React, { useEffect, useState } from 'react';
import { useRmun } from '../../../Context/Context';

const FechaRallyMundial = () => {
  const context = useRmun();
  const [selectedButton, setSelectedButton] = useState(null);

  const getLastButtonRallyMundial = () => {
    const buttons = [
      'ss1', 'ss2', 'ss3', 'ss4', 'ss5', 'ss6', 'ss7', 'ss8', 'ss9', 'ss10', 'ss11', 'ss12', 'ss13', 'ss14', 'ss15', 'ss16', 'ss17', 'ss18', 'ss19', 'ss20', 'ss21', 'ss22', 'ss23', 'ss24', 'ss25', 'ss26', 'ss27', 'ss28', 'ss29', 'ss30', 'final',
    ];

    if (!context) {
      return [];
    }

    const availableButtons = buttons.filter(button => context.c[buttons.indexOf(button) + 9]?.v);
    return availableButtons[availableButtons.length - 1];
  };

  useEffect(() => {
    const lastButton = getLastButtonRallyMundial();
    setSelectedButton(lastButton);
  }, [context]); // Asegúrate de que useEffect se ejecute cada vez que cambie el contexto


  const fetchLastButtonData = async (button) => {
    try {
      // Construye la URL del endpoint
      const endpoint = `http://localhost:5000/${categoria}/${button}/${id}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      const data = await response.json();
      console.log('Datos recibidos:', data);
      // Actualiza el estado con los datos recibidos
      // setSelectedButton(data); // Actualiza según la estructura de los datos recibidos
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
    }
  };

  return (
    <div>
      <div className='buttons-up-carreras'>
        <div>
          {context && context.c[9]?.v && (
            <button
              value={context.c[9]?.v}
              className={`button-tanda ${selectedButton === 'p1' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss1', 'SS1')}>
              SS1
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p2' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss2', 'SS2')}>
              SS2
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p3' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss3', 'SS3')}>
              SS3
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p4' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss4', 'SS4')}>
              SS4
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p5' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss5', 'SS5')}>
              SS5
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p6' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss6', 'SS6')}>
              SS6
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p7' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss7', 'SS7')}>
              SS7
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p8' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss8', 'SS8')}>
              SS8
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p9' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss9', 'SS9')}>
              SS9
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p10' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss10', 'SS10')}>
              SS10
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p11' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss11', 'SS11')}>
              SS11
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p12' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss12', 'SS12')}>
              SS12
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p13' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss13', 'SS13')}>
              SS13
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p14' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss14', 'SS14')}>
              SS14
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p15' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss15', 'SS15')}>
              SS15
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p16' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss16', 'SS16')}>
              SS16
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p17' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss17', 'SS17')}>
              SS17
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p18' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss18', 'SS18')}>
              SS18
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p19' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss19', 'SS19')}>
              SS19
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p20' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss20', 'SS20')}>
              SS20
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p21' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss21', 'SS21')}>
              SS21
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p22' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss22', 'SS22')}>
              SS22
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p23' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss23', 'SS23')}>
              SS23
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p24' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss24', 'SS24')}>
              SS24
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p25' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss25', 'SS25')}>
              SS25
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p26' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss26', 'SS26')}>
              SS26
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p27' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss27', 'SS27')}>
              SS27
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p28' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss28', 'SS28')}>
              SS28
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p29' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss29', 'SS29')}>
              SS29
            </button>
          )}

          {context && context.c[10]?.v && (
            <button
              value={context.c[10]?.v}
              className={`button-tanda ${selectedButton === 'p30' ? 'selected-button' : ''}`}
              onClick={() => handleButtonClick('ss30', 'SS30')}>
              SS30
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default FechaRallyMundial;