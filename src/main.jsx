import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.scss'
import Root from './Routes/Root';
import { CampeonatoProvider, CarrerasAnualesProvider, NewsProvider } from '../Context/Context';
import Tc from './Routes/Tc';
import Tcpk from './Routes/Tcpk';
import Rally from './Routes/Rally';
import Tc2000 from './Routes/Tc2000';
import Tc2000series from './Routes/Tc2000series';
import Tcm from './Routes/Tcm';
import Tcp from './Routes/Tcp';
import Tcpm from './Routes/Tcpm';
import Tn from './Routes/Tn';
import Tp from './Routes/Tp';
import Tr from './Routes/Tr';
import Trseries from './Routes/Trseries';
import F2Nacional from './Routes/F2Nacional';
import Nosotros from './Routes/Nosotros';
import Contacto from './Routes/Contacto';
import VideoDetail from './Components/VideoDetail/VideoDetail';


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
    path: "/tc",
    element: (
      <NewsProvider>
        <Tc />
      </NewsProvider>
    ),
  },
  {
    path: "/tcpk",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tcpk />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/rally-argentino",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Rally />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tc2000",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tc2000 />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tc2000-series",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tc2000series />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tcm",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tcm />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tcp",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tcp />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tcpm",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tcpm />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tn",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tn />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tp",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tp />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tr",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tr />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/tr-series",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tr />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
  {
    path: "/f2-nacionales",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <Tr />
        </CampeonatoProvider>
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
    path: "/video/:videoId",
    element: (
      <NewsProvider>
        <CampeonatoProvider>
          <VideoDetail />
        </CampeonatoProvider>
      </NewsProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
