import React, { useState, useEffect, use } from 'react'
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);




  useEffect(() => {
    const checkHeight = () => {
      if(window.scrollY > 500) {
        setIsVisible(true);
    } else {
        setIsVisible(false);
    }
  };

    window.addEventListener('scroll', checkHeight);


    return () => window.removeEventListener('scroll', checkHeight);
  }, []);

    const scrollToTop2 = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`go-top-btn ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop2}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <FaArrowUp className='go-top-btn-icon' size={24} />
    </button>
  );
};

export default ScrollToTopButton;