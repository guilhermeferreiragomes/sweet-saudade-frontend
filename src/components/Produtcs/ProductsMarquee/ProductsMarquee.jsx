import React, { useState, useEffect } from 'react'
import './ProductsMarquee.css'
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom'

const ProductsMarquee = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className='products-marquee'>
      <Link to={`/contactos`}>
      <Marquee 
        className='marquee' 
        gradient={!isMobile}
        gradientColor='#ebb104'
        speed={50}
        autoFill={true}
      >
        <h1>ENCOMENDE JÁ O MELHOR DE PORTUGAL! &nbsp;&nbsp;</h1>
      </Marquee>
      </Link>
    </div>
  )
}

export default ProductsMarquee