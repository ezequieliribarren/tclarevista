import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.scss'
import Root from './Routes/Root';
import { CampeonatoProvider, CarrerasAnualesProvider, NewsProvider, TcProvider, TcpProvider, TcpmProvider, TcpkProvider, TcmProvider, TcppkProvider, RallyProvider, F1Provider, MgpProvider, IndyProvider, NasProvider } from '../Context/Context';
import Nosotros from './Routes/Nosotros';
import Contacto from './Routes/Contacto';
import DetailCarrerasCat from './Components/DetailCarrerasCat/DetailCarrerasCat';
import DetailVideosCat from './Components/DetailVideosCat/DetailVideosCat';
import DetailCampeonatoCat from './Components/DetailCampeonatoCat/DetailCampeonatoCat';
import Categoria from './Components/Categoria/Categoria';
import NoticiaDetail from './Components/NoticiaDetail/NoticiaDetail';
import DetailFecha from './Components/DetailFecha/DetailFecha';


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
          <Nosotros />
      </NewsProvider>
    ),
  },
  {
    path: "/contacto",
    element: (
      <NewsProvider>
          <Contacto />
      </NewsProvider>
    ),
  },

  {
    path: '/:categoria/videos',
    element: (
      <NewsProvider>
        <TcpmProvider>
          <TcProvider>
            <TcmProvider>
              <TcpkProvider>
                <TcppkProvider>
                  <TcpProvider>
                    <RallyProvider>
                      <F1Provider>
                        <MgpProvider>
                        <IndyProvider>
                        <NasProvider>
                             <DetailVideosCat />
                        </NasProvider>
                        </IndyProvider>
                        </MgpProvider>
                      </F1Provider>
                    </RallyProvider>
                  </TcpProvider>
                </TcppkProvider>
              </TcpkProvider>
            </TcmProvider>
          </TcProvider>
        </TcpmProvider>
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
        <TcpmProvider>
          <TcProvider>
            <TcmProvider>
              <TcpkProvider>
                <TcppkProvider>
                  <TcpProvider>
                    <RallyProvider>
                      <F1Provider>
                        <MgpProvider>
                          <IndyProvider>
                            <NasProvider>
                             <DetailCarrerasCat /> 
                            </NasProvider>
                          </IndyProvider>
                        </MgpProvider>
                      </F1Provider>
                    </RallyProvider>
                  </TcpProvider>
                </TcppkProvider>
              </TcpkProvider>
            </TcmProvider>
          </TcProvider>
        </TcpmProvider>
      </NewsProvider>
    ),
  },

  {
    path: "/noticia/:id",
    element: (
      <NewsProvider>
        <TcpmProvider>
          <TcProvider>
            <TcmProvider>
              <TcpkProvider>
                <TcppkProvider>
                  <TcpProvider>
                    <RallyProvider>
                      <F1Provider>
                        <MgpProvider>
                          <IndyProvider>
                          <NasProvider>
                             <NoticiaDetail />
                          </NasProvider>
                          </IndyProvider>
                        </MgpProvider>
                      </F1Provider>
                    </RallyProvider>
                  </TcpProvider>
                </TcppkProvider>
              </TcpkProvider>
            </TcmProvider>
          </TcProvider>
        </TcpmProvider>
      </NewsProvider>
    ),
  },

  {
    path: '/:categoria/carreras/:id',
    element: (
      <NewsProvider>
        <TcpmProvider>
          <TcProvider>
            <TcmProvider>
              <TcpkProvider>
                <TcppkProvider>
                  <TcpProvider>
                    <RallyProvider>
                      <F1Provider>
                        <MgpProvider>
                          <IndyProvider>
                          <NasProvider>
                           <DetailFecha />  
                          </NasProvider>
                          </IndyProvider>
                        </MgpProvider>
                      </F1Provider>
                    </RallyProvider>
                  </TcpProvider>
                </TcppkProvider>
              </TcpkProvider>
            </TcmProvider>
          </TcProvider>
        </TcpmProvider>
      </NewsProvider>
    ),
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
