import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.scss'
import Root from './Routes/Root';
import { CampeonatoProvider, CarrerasAnualesProvider, NewsProvider, TcProvider, TcpProvider, TcpmProvider, TcpkProvider, TcmProvider, TcppkProvider, RallyProvider, F1Provider, MgpProvider, IndyProvider, NasProvider, RmunProvider, FeProvider, TablaCampeonatoProvider, TrProvider, TrSeriesProvider, TpProvider, Tc2000Provider, TnProvider } from '../Context/Context';
import Nosotros from './Routes/Nosotros';
import Contacto from './Routes/Contacto';
import DetailCarrerasCat from './Components/DetailCarrerasCat/DetailCarrerasCat';
import DetailVideosCat from './Components/DetailVideosCat/DetailVideosCat';
import DetailCampeonatoCat from './Components/DetailCampeonatoCat/DetailCampeonatoCat';
import Categoria from './Components/Categoria/Categoria';
import NoticiaDetail from './Components/NoticiaDetail/NoticiaDetail';
import DetailFecha from './Components/DetailFecha/DetailFecha';
import DetailNoticiasCat from './Components/DetailNoticiasCat/DetailNoticiasCat';
import CarrerasAnuales from './Components/CarrerasAnuales/CarrerasAnuales';
import ResultadoEnVivo from './ResultadoEnVivo/ResultadoEnVivo';


const router = createHashRouter([
  {
    path: "/",
    element: (
      <CarrerasAnualesProvider>
        <NewsProvider>
        <RallyProvider>
             <Root />
        </RallyProvider>
        </NewsProvider>
      </CarrerasAnualesProvider>

    ),
  },

  {
    path: "/vivo/:categoria/:tanda/:ip",
    element: (
      <ResultadoEnVivo />
    ),
  },
  {
    path: "/:categoria", // Utiliza un parámetro para la categoría
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
                              <RmunProvider>
                                <FeProvider>
                                  <TrProvider>
                                    <TrSeriesProvider>
                                      <TpProvider>
                                        <Tc2000Provider>
                                          <TnProvider>
                                            <Categoria />
                                          </TnProvider>
                                        </Tc2000Provider>
                                      </TpProvider>
                                    </TrSeriesProvider>
                                  </TrProvider>
                                </FeProvider>
                              </RmunProvider>
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
    path: '/:categoria/noticias',
    element: (
      <NewsProvider>
        <DetailNoticiasCat />
      </NewsProvider>
    ),
  },

  {
    path: '/:categoria/videos',
    element: (

      <DetailVideosCat />

    ),
  },
  {
    path: '/:categoria/campeonato',
    element: (
      <NewsProvider>
        <TablaCampeonatoProvider>
          <DetailCampeonatoCat />
        </TablaCampeonatoProvider>

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
                              <RmunProvider>
                                <FeProvider>
                                  <TrProvider>
                                    <TrSeriesProvider>
                                      <TpProvider>
                                        <Tc2000Provider>
                                          <TnProvider>
                                            <DetailCarrerasCat />
                                          </TnProvider>
                                        </Tc2000Provider>
                                      </TpProvider>
                                    </TrSeriesProvider>
                                  </TrProvider>
                                </FeProvider>
                              </RmunProvider>
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
    path: '/carreras-anuales',
    element: (
      <CarrerasAnualesProvider>
        <CarrerasAnuales />
      </CarrerasAnualesProvider>
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
                              <RmunProvider>
                                <FeProvider>
                                  <TrProvider>
                                    <TrSeriesProvider>
                                      <TpProvider>
                                        <Tc2000Provider>
                                          <TnProvider>
                                            <DetailFecha />
                                          </TnProvider>
                                        </Tc2000Provider>
                                      </TpProvider>
                                    </TrSeriesProvider>
                                  </TrProvider>
                                </FeProvider>
                              </RmunProvider>
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
