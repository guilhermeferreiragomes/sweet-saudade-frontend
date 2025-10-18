import React from 'react'
import './ProductDetail.css'
import { useParams } from 'react-router-dom'
import productsData from '../../../data/productsData.json'
import Navbar from '../../Common/NavBar/Navbar'
import Footer from '../../Common/Footer/Footer'
import { Link } from 'react-router-dom'
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const ProductDetail = () => {
  const { slug } = useParams()
  const product = productsData.find(item => item.slug === slug)
  
  if (!product) {
    return <div>Product not found</div>
  }
  
  // Verificar se o produto tem opções de pacote
  const hasPackOptions = product.packOptions && product.packOptions.length > 0;

  return (
    <div className='product-detail-container'>
      <Navbar />
      <div className='go-back-btn'>
        <Link to="/produtos">
          <MdOutlineKeyboardArrowLeft className='go-back-icon' color='#606060' size={24} />
          <p className='go-back-text'>Todos os Produtos</p>
        </Link>
      </div>
      <div className='product-detail'>
        <img src={product.image} alt={product.name} className='product-image' />
        <div className='product-information'>
          <h2 className='product-name'>{product.name}</h2>
          
          {/* Lista de opções de pacote disponíveis */}
          {hasPackOptions && (
            <div className="product-pack-options">
              <h3 className="pack-options-title">Opções disponíveis:</h3>
              <div className="pack-options-list">
                {product.packOptions.map((option, index) => (
                  <div key={index} className="pack-option-item">
                    <span className="pack-name">{option.pack}</span>
                    <span className="pack-price">{option.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <Link to="/contactos">
            <button className='add-to-cart'>ENCOMENDAR</button>
          </Link>
        </div>
      </div>
      
      {/* Descrição do produto movida para fora do layout principal */}
      <div className="product-description-wrapper">
        <div className="product-description-container">
          <h2 className="description-title">Sobre o Produto</h2>
          <p className="product-description">{product.description}</p>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ProductDetail