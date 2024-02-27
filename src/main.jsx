import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.scss'
import Root from './Routes/Root';
import { CampeonatoProvider, CarrerasAnualesProvider, NewsProvider } from '../Context/Context';
import Nosotros from './Routes/Nosotros';
import Contacto from './Routes/Contacto';
import DetailCarrerasCat from './Components/DetailCarrerasCat/DetailCarrerasCat';
import DetailVideosCat from './Components/DetailVideosCat/DetailVideosCat';
import DetailCampeonatoCat from './Components/DetailCampeonatoCat/DetailCampeonatoCat';
import Categoria from './Components/Categoria/Categoria';
import NoticiaDetail from './Components/NoticiaDetail/NoticiaDetail';


const router = createHashRouter([
  {
    path: "/",
    element: (
      <CarrerasAnualesProvider>
        <NewsProvider>
          <Root />
        </NewsProvider>
      </CarrerasAnualesProvider>

    ),
  },
  {
    path: "/:categoria", // Utiliza un parámetro para la categoría
    element: (
      <NewsProvider>
        <Categoria />
      </NewsProvider>
    ),
  },
  
  {
    path: "/nosotros",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Nosotros />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/contacto",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Contacto />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },

  {
    path: '/:categoria/videos',
    element: (
      <NewsProvider>
        <DetailVideosCat />
      </NewsProvider>
    ),
  },
  {
    path: '/:categoria/campeonato',
    element: (
      <NewsProvider>
        <DetailCampeonatoCat />
      </NewsProvider>
    ),
  },
  {
    path: '/:categoria/carreras',
    element: (
      <NewsProvider>
        <DetailCarrerasCat />
      </NewsProvider>
    ),
  },

  {
    path: "/noticia/:id",
    element: (
      <NewsProvider>
        <NoticiaDetail />
      </NewsProvider>
    ),
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
