import React, { useState, useRef } from 'react';

const RadioMobile = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStopButton, setShowStopButton] = useState(false);
  const audioRef = useRef(null);

  const handleRadioClick = () => {
    setIsPlaying(!isPlaying);
    setShowStopButton(!showStopButton);

    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const handleStopButtonClick = () => {
    setIsPlaying(false);
    setShowStopButton(false);
    audioRef.current.pause();
  };

  return (
    <div className='content-radio' onClick={handleRadioClick}>
      <audio ref={audioRef} src={url} style={{ display: 'none' }} />
      {showStopButton ? (
        <button onClick={handleStopButtonClick} style={{ fontFamily: 'roboto-bold', fontSize: "2rem", color: '#fe0', backgroundColor: "transparent", border: "none"  }}>X</button>
      ) : (
        <img src="images/mic.png" alt="Radio" />
      )}
      {!showStopButton && (
        <span className='span-radio'>
          <img src="images/point.png" alt="Radio Tc La Revista" />
        </span>
      )}
    </div>
  );
};

export default RadioMobile;
