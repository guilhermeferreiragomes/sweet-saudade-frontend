import React from 'react'
import './ProductsMarquee.css'
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom'


const ProductsMarquee = () => {
  return (
    <div className='products-marquee'>
      <Link to={`/contactos`}>
      <Marquee 
        className='marquee' 
        gradient={true} 
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
