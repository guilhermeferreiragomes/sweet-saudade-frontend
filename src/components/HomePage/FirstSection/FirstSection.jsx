import React from 'react'
import './FirstSection.css'
import roulote from '../../../assets/imagens/roulote_nova.webp'
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa";

const FirstSection = () => {
  return (
    <div className="roulote-image">
      <img src={roulote} alt="Roulote" />
      <h1>SWEET SAUDADE</h1>
      <hr />
      <h2>o sabor de portugal</h2>  
      <div className="social-icons">
        <a href="https://www.instagram.com/sweetsaudade" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} color='#ebb104'/>
        </a>
        <a href="https://www.facebook.com/sweetsaudade" target="_blank" rel="noopener noreferrer">
          <FaFacebookF size={30} color='#ebb104'/>
        </a>
        <a href="https://www.linkedin.com/company/sweetsaudade" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn size={30} color='#ebb104'/>
        </a>
        <a href="https://www.tiktok.com/@sweetsaudade" target="_blank" rel="noopener noreferrer">
          <FaTiktok size={30} color='#ebb104'/>
        </a>
      </div>
      <div className='scroll-container'>
        <a href='#infobar' className="scroll-link">Ver Mais</a>
      </div>
    </div>
  );
}

export default FirstSection
