import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.scss'
import Root from './Routes/Root';
import { CampeonatoProvider, CarrerasAnualesProvider, NewsProvider } from '../Context/Context';
import Tc from './Routes/Tc';
import Tcpk from './Routes/Tcpk';


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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
