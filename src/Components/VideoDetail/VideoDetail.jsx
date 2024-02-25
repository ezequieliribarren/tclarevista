// VideoDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VideoDetail = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    // Aquí podrías hacer una solicitud para obtener los detalles del video con el ID proporcionado
    // Por simplicidad, este ejemplo solo establece un objeto de video de ejemplo
    const fetchVideoDetails = async () => {
      // Hacer la solicitud para obtener los detalles del video usando el videoId
      // const response = await fetch(`API_URL/${videoId}`);
      // const data = await response.json();
      // setVideoDetails(data);

      // Ejemplo: Setear un objeto de video de ejemplo
      const exampleVideoDetails = {
        id: videoId,
        title: 'Título del video',
        description: 'Descripción del video',
        // Otros detalles del video...
      };
      setVideoDetails(exampleVideoDetails);
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!videoDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{videoDetails.title}</h2>
      <p>{videoDetails.description}</p>
      {/* Aquí puedes mostrar el video utilizando el ID */}
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoDetails.id}`}
        title={videoDetails.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoDetail;
