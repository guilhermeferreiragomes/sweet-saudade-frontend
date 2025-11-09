import React from 'react'
import ProductsList from './ProductsList/ProductsList'
import ProductsMarquee from './ProductsMarquee/ProductsMarquee'
import './ProductsPage.css'
import ProductsImage from '../../assets/imagens/products.webp'
import { Link } from 'react-router-dom'
import { FaRegEnvelope } from "react-icons/fa";
import ReactGA from 'react-ga4';

const ProductsPage = () => {

  const handleOrderClick = () => {
    ReactGA.event({
      category: "Navegação",
      action: "Clique",
      label: "Botão Encomendar (Página Produtos)"
    });
  };

  return (
    <div>
      <div className='products-image-container'>
        <img src={ProductsImage} alt="Produtos" className='products-image' />
      </div>
      <div className='products-title'>
        <h2>OS NOSSOS PRODUTOS</h2>
      </div>
      <div className='products-advice'>
        <p>Todos os produtos disponíveis através de encomenda.<br />
        Pode fazê-lo a partir do formulário na página Contactos.</p>
      </div>
      <ProductsList />
      

      <div className="contact-cta-container">
        <h3 className="contact-cta-title">Pronto para fazer sua encomenda?</h3>
        <Link 
          to="/contactos" 
          className="contact-cta-button"
          onClick={handleOrderClick}
        >
          <FaRegEnvelope className="contact-cta-icon" />
          ENCOMENDAR AGORA
        </Link>
      </div>
      
      { /*<ProductsMarquee /> */}
    </div>
  )
}

export default ProductsPage