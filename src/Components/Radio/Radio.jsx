import React, { useState } from 'react';

const Radio = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} src={url}></audio>
      <button onClick={togglePlay}>{isPlaying ? 'Pausar' : 'Reproducir'}</button>
    </div>
  );
};

export default Radio;
