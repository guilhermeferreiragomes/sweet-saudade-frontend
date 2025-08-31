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
            <p className='product-price'>{product.price}</p>
            <p className='product-description'>{product.description}</p>
            <p className='product-pack'>{product.pack}</p>
            <Link to="/contactos">
              <button className='add-to-cart'>ENCOMENDAR</button>
            </Link>
          </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetail
