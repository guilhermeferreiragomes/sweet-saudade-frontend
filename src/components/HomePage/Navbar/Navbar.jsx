import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../../assets/sweetsauade_logotipos/logo_transparente.png'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <Link to="/" className="logo-link">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

        <div className="language-switcher">
            <button className="lang-btn">PT</button>
            <button className="lang-btn">EN</button>
        </div>
        
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
            <li>PRODUTOS</li>
            <li>SOBRE NÓS</li>
            <li>CONTACTOS</li>
        </ul>


    </nav>
  )
}

export default Navbar
