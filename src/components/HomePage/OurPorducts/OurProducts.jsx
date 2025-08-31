import React from 'react'
import './OurProducts.css'
import '../../Produtcs/ProductsList/ProductsList.css'
import { Link } from 'react-router-dom'
import productsData from '../../../data/productsData.json'

const OurProducts = () => {
  const firstThreeProducts = productsData.slice(0, 3);

  return (
    <div className='our-products'>
      <h2 className='our-products-title'>OS NOSSOS DESTAQUES</h2>
      <div className='Product'>
        {firstThreeProducts.map(product => (
          <Link to={`/produtos/${product.slug}`} key={product.id}>
            <div className='Product-card'>
              <img 
                src={product.image} 
                alt={product.name} 
                className='Product-image'
            />
            <h3 className='Product-name'>{product.name}</h3>
            <p className='Product-pack'>{product.pack}</p>
            <p className='Product-price'>{product.price}</p>
          </div>
        </Link>
        ))}
      </div>
      <button className='mais-produtos'>
        <Link to="/produtos">MAIS PRODUTOS</Link>
      </button>
    </div>
  )
}

export default OurProducts
