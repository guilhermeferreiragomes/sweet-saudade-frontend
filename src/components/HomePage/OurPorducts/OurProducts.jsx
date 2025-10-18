import React, {useState, useEffect} from 'react'
import './OurProducts.css'
import { Link } from 'react-router-dom'
import productsData from '../../../data/productsData.json'
import Marquee from "react-fast-marquee";

const OurProducts = () => {
  const [isMobile, setIsMobile] = useState(false)
  const firstThreeProducts = productsData.slice(0, 3);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const ProductCard = ({ product }) => {
    // Obter o segundo pack (índice 1) se existir, senão usar o primeiro
    const packOption = product.packOptions && product.packOptions.length > 1 
      ? product.packOptions[1]
      : product.packOptions && product.packOptions.length > 0
        ? product.packOptions[0]
        : null;
    
    const packText = packOption ? packOption.pack : product.pack || '';
    const priceText = packOption ? packOption.price : product.defaultPrice || product.price || '';
    
    return (
      <Link to={`/produtos/${product.slug}`} key={product.id}>
        <div className='home-product-card'>
          <img 
            src={product.image} 
            alt={product.name} 
            className='home-product-image'
          />
          <h3 className='home-product-name'>{product.name}</h3>
          <p className='home-product-pack'>{packText}</p>
          <p className='home-product-price'>{priceText}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className='our-products'>
      <h2 className='our-products-title'>OS NOSSOS DESTAQUES</h2>
      
      {isMobile ? (
        <Marquee 
          speed={30}
        >
          <div className='home-marquee-products'>
            {firstThreeProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Marquee>
      ) : (
        <div className='home-products-container'>
          {firstThreeProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <button className='mais-produtos'>
        <Link to="/produtos">MAIS PRODUTOS</Link>
      </button>
    </div>
  )
}

export default OurProducts