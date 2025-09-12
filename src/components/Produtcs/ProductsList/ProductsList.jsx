import React from 'react'
import productsData from '../../../data/productsData'
import './ProductsList.css'
import { Link } from 'react-router-dom'

const ProductsList = () => {
  return (
    <div className='ProductsList-container'>
        <div className='ProductsList'>
            <div className='Product'>
                {productsData.map((product) => (
                    <div key={product.id} className='Product-card'>
                        <Link to={`/produtos/${product.slug}`}>
                            <img src={product.image} alt={product.name} className='Product-image' />
                            <h3 className='Product-name'>{product.name}</h3>
                            <p className='Product-pack'>{product.pack}</p>
                            <h4 className='Product-price'>{product.price}</h4>
                        </Link>
                        <Link to={`/contactos`}>
                            <button className='Add-to-cart-button'>ENCOMENDAR</button>
                        </Link>
                    </div>
                ))}   
            </div>
        </div>
    </div>
  )
}

export default ProductsList