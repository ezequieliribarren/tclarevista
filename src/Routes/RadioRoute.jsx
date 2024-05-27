import React, { useRef, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';

const RadioRoute = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true); // Para asegurar que la reproducción se inicie automáticamente
  const url = 'http://01.solumedia.com.ar:8420/;stream.nsv'; // Reemplaza con la URL de tu radio

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  return (
    <Layout>
      <div style={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <audio ref={audioRef} controls autoPlay={isPlaying}>
          <source src={url} type='audio/mpeg' />
        </audio>
      </div>
    </Layout>
  );
};

export default RadioRoute;
