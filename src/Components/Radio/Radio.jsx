import React, { useState, useRef } from 'react';

const Radio = ({ url }) => {
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Manejar el clic en el div de la radio para mostrar el reproductor
  const handleRadioClick = () => {
    setUserInteracted(true);
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Renderizar el componente dependiendo de si el usuario ha interactuado o no
  return (
    <div className='radio'>
      {userInteracted ? (
        // Si el usuario ha interactuado, mostrar el reproductor de audio con controles
        <div onClick={handleRadioClick}>
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
