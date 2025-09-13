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
        
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
            <li><Link to="/" onClick={toggleMenu}><h3>INÍCIO</h3></Link></li>
            <li><Link to="/produtos" onClick={toggleMenu}><h3>PRODUTOS</h3></Link></li>
            <li><Link to="/sobre-nos" onClick={toggleMenu}><h3>SOBRE NÓS</h3></Link></li>
            <li><Link to="/contactos" onClick={toggleMenu}><h3>CONTACTOS</h3></Link></li>
        </ul>


    </nav>
  )
}

export default Navbar
