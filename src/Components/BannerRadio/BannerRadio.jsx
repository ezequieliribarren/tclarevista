import React from 'react'
import { HashLink as Link } from 'react-router-hash-link';


const BannerRadio = () => {
  return (
    <section id='banner-radio'>
      <Link to='/radio'>
        <img src="images/banner-radio.png" alt="Radio Tc La Revista" className='banner-desktop' />
        <img src="images/banner-mobile.png" alt="" className='banner-mobile' />
      </Link>
    </section>
  )
}

export default BannerRadio