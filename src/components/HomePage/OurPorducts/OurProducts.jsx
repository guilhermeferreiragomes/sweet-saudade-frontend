import React, {useState, useEffect} from 'react'
import './OurProducts.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'
import productsData from '../../../data/productsData.json'
import Slider from "react-slick";

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

  const ProductCard = ({ product }) => (
    <Link to={`/produtos/${product.slug}`} key={product.id}>
      <div className='home-product-card'>
        <img 
          src={product.image} 
          alt={product.name} 
          className='home-product-image'
        />
        <h3 className='home-product-name'>{product.name}</h3>
        <p className='home-product-pack'>{product.pack}</p>
        <p className='home-product-price'>{product.price}</p>
      </div>
    </Link>
  );

  // Slider settings só para mobile
  const mobileSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className='our-products'>
      <h2 className='our-products-title'>OS NOSSOS DESTAQUES</h2>
      
      {isMobile ? (
        <Slider {...mobileSettings}>
          {firstThreeProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
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