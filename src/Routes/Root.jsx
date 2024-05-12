import React from 'react'
import Layout from '../Layout/Layout'
import PubliHorizontal from '../Components/PubliHorizontal/PubliHorizontal'
import BannerRadio from '../Components/BannerRadio/BannerRadio'
import PublicidadVertical from '../Components/PublicidadVertical/PublicidadVertical'
import Principales from '../Components/Principales/Principales'
import Generales from '../Components/Generales/Generales'
import CallActionVideos from '../Components/CallActionVideos/CallActionVideos'
import CallActionCarreras from '../Components/CallActionCarreras/CallActionCarreras'
import Vivo from '../Components/Vivo/Vivo'
import VideosCarousel from '../Components/VideosCarousel/VideosCarousel'

const Root = () => {

  return (
      <Layout>
        <main className='p-3'>
          <div className="container-fluid">
            <div className="row">
       <Vivo/>
            </div>
            <div className="row">
              {/* PODIO EN VIVO */}
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              {/* VINCULAR */}
            </div>
            <Principales />
            <div className="row">
              <div className="col-lg-8">
                <Generales />
              </div>
              <div className="col-lg-4">
                <div className="row">
                  <CallActionCarreras />
                </div>
                <div className="row">
                  <PublicidadVertical />
                </div>
              </div>
            </div>            
            <div className="row">
             <VideosCarousel/>
            </div>
            <div className="row">
              <BannerRadio />
            </div>

            <div className="row">
              <PubliHorizontal />
            </div>
          </div>

        </main>
      </Layout>
  )
}

export default Root