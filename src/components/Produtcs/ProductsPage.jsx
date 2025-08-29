import React from 'react'
import ProductsList from './ProductsList/ProductsList'
import ProductsMarquee from './ProductsMarquee/ProductsMarquee'
import './ProductsPage.css'
import ProductsImage from '../../assets/imagens/products.webp'


const ProductsPage = () => {
  return (
    <div>
      <div className='products-image-container'>
        <img src={ProductsImage} alt="Produtos" className='products-image' />
      </div>
      <div className='products-title'>
        <h2>OS NOSSOS PRODUTOS</h2>
      </div>
      <div className='products-advice'>
        <p>Todos os produtos disponíveis através de encomenda. Pode fazê-lo a partir do formulário na página Contactos.</p>
      </div>
      <ProductsList />
      <ProductsMarquee />
    </div>
  )
}

export default ProductsPage

