import React, { useState, useRef } from 'react';

const Radio = ({ url, route }) => {
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Manejar el clic en el div de la radio para mostrar el reproductor y reproducir automáticamente
  const handleRadioClick = () => {
    setUserInteracted(true);
    setIsPlaying(true); // Establecer el estado de reproducción como true
    audioRef.current.play(); // Reproducir automáticamente
  };

  // Renderizar el componente dependiendo de si el usuario ha interactuado o no
  return (
    <div>
      {userInteracted ? (
        // Si el usuario ha interactuado, mostrar el reproductor de audio con controles
        <div onClick={handleRadioClick} >
          <audio ref={audioRef} controls autoPlay={isPlaying}>
            <source src={url} type='audio/mpeg' />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : (
        // Si el usuario no ha interactuado, mostrar solo la información de la radio
        <div className='content-radio' onClick={handleRadioClick}>
          <span className='span-radio'>
            <img src="images/point.png" alt="Radio Tc La Revista" />
          </span>
          <h3>
             RADIO 890 AM
          </h3>
        </div>
      )}
    </div>
  );
};

export default Radio;
