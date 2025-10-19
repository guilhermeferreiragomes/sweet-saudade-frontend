import React, { useState } from 'react';
import { MdOutlineEmail, MdLocalPhone } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTiktok, FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";
import logo from '../../../../assets/sweetsauade_logotipos/logo_transparente.png';

const ContactInfo = () => {
  // Estado para o acordeão das informações
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

  const toggleInfo = () => {
    setIsInfoExpanded(!isInfoExpanded);
  };

  return (
    <div className='duvidas'>
      <div className="info-accordion-container">
        <button 
          type="button"
          className={`info-accordion-header ${isInfoExpanded ? 'active' : ''}`}
          onClick={toggleInfo}
        >
          <div className="accordion-title">
            <FaInfoCircle />
            <span>Informações de contacto</span>
          </div>
          {isInfoExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        <p className="duvidasP desktop-title">Para dúvidas e mais informações</p>
        
        <div className={`info-content ${isInfoExpanded ? 'expanded' : ''}`}>
          <p className="duvidasP mobile-title">Para dúvidas e mais informações</p>
          <p className='sweet-saudade'> Sweet Saudade </p>
          <ul>
            <li>
              <a href='mailto:info.sweetsaudade@gmail.com'>
                <MdOutlineEmail size={22} color='#f4c430' /> info.sweetsaudade@gmail.com
              </a>
            </li>
            <li>
              <a href='tel:+351912345678'>
                <MdLocalPhone size={20} color='#f4c430' /> +351 912 345 678
              </a>
            </li>
          </ul>
          <div className="social-mediaContactar">
            <a 
              href='https://www.instagram.com/guilhermeffgomes/' 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FiInstagram color='#f4c430' size={23} />
            </a>
            <a 
              href='https://www.facebook.com/guilhermeffgomes' 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaFacebookF color='#f4c430' size={23} />
            </a>
            <a 
              href='https://www.linkedin.com/in/guilhermeffgomes/' 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaLinkedinIn color='#f4c430' size={23} />
            </a>
            <a 
              href='https://www.tiktok.com/@guilhermeffgomes' 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaTiktok color='#f4c430' size={23} />
            </a>
          </div>
          <img src={logo} alt="Logo" className="footer-logo" />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;