import React, { useState, useEffect } from "react";

const PreloaderVivo = () => {
  const [progress, setProgress] = useState(0);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      }
    }, 80); // 9 segundos en milisegundos

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      const blinkInterval = setInterval(() => {
        setBlink((prevBlink) => !prevBlink);
      }, 500); // Cambio de estado cada 500ms
      return () => clearInterval(blinkInterval);
    }
  }, [progress]);

  const handleChange = (e) => {
    setProgress(parseInt(e.target.value));
  };

  const progressBarStyle = {
    width: `${progress}%`,
    height: "20px",
    backgroundColor: "#fe0",
    transition: "width 0.1s ease-in-out",
  };

  const h3Style = {
    color: blink && progress === 100 ? "#000" : "#fe0",
    transition: "color 0.5s ease-in-out",
  };

  return (
    <div className="preloader-container">
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        className="preloader"
        onChange={handleChange}
      />
      <div className="progress-bar" style={progressBarStyle}></div>
      <div style={{ textAlign: "center" }}>
        <h3 className="mt-2" style={h3Style}>
          {progress}%
        </h3>
      </div>
    </div>
  );
};

export default PreloaderVivo;
