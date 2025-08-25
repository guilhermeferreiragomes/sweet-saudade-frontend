import React from 'react'
import './OurProducts.css'
import { Link } from 'react-router-dom'

const OurProducts = () => {
  return (
    <div className='our-products'>
      <h2 className='our-products-title'>OS NOSSOS DESTAQUES</h2>
      <div className='produtos'>
        <img src="/products/bola_berlim.png" alt="Bola de Berlim" className='bola-berlim' />
        <img src="/products/pastel_de_nata.png" alt="Pastel de Nata" className='pastel-nata' />
        <img src="/products/3_croquetes.png" alt="Croquetes" className='croquetes' />
      </div>
      <button className='mais-produtos'>
        <Link to="/produtos">MAIS PRODUTOS</Link>
      </button>
    </div>
  )
}

export default OurProducts
