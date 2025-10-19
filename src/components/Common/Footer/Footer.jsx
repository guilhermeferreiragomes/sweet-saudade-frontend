import './Footer.css'
import logo from '../../../assets/sweetsauade_logotipos/logo_transparente.png'
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import { MdOutlineEmail, MdLocalPhone } from "react-icons/md";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-media">
          <Link to={'/home'}>
              <img src={logo} alt="Logo" className="footer-logo" />
          </Link>
          <p>Encontra-nos aqui.</p>
          <div className="social-media">
            <a href='https://www.instagram.com/guilhermeffgomes/' target="_blank" rel="noopener noreferrer">
              <FiInstagram color='white' size={23} />
            </a>
            <a href='https://www.facebook.com/guilhermeffgomes' target="_blank" rel="noopener noreferrer">
              <FaFacebookF color='white' size={23} />
            </a>
            <a href='https://www.linkedin.com/in/guilhermeffgomes/' target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn color='white' size={23} />
            </a>
            <a href='https://www.tiktok.com/@guilhermeffgomes' target="_blank" rel="noopener noreferrer">
              <FaTiktok color='white' size={23} />
            </a>
          </div>
        </div>
        <div className='text'>
          <div className='ligacoes'>
            <h3>Ligações</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/produtos">Produtos</a></li>
              <li><a href="/sobre-nos">Sobre Nós</a></li>
            </ul>
          </div>
          <div className='politicas'>
            <h3>Políticas</h3>
            <ul>
              <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
              <li><a href="/termos-e-condicoes">Termos e Condições</a></li>
              <br />
            </ul>
          </div>
          <div className='contactos'>
            <h3>Contactos</h3>
            <ul>
              <li><a href='/contactos'>Encomendas</a></li>
              <li><a href='mailto:info.sweetsaudade@gmail.com'><MdOutlineEmail size={22} /> info.sweetsaudade@gmail.com</a></li>
              <li><a href='tel:+351919710329'><MdLocalPhone size={20} /> +351 919 710 329</a></li>
            </ul>
          </div>
        </div>
      </div>
     <hr className="footer-divider" />
     <div className='footer-bottom'>
      <div className="footer-bottom-left">
        <a href='https://www.linkedin.com/in/guilhermeffgomes/' target='_blank' rel="noopener noreferrer" className="card-credit-minimal">
          <div className="card-credit-shine"></div>
          <span className="card-credit-author">
            <span>Créditos:</span>
            <span>Guilherme Gomes</span>
            <FaLinkedinIn className="card-credit-icon" />
          </span>
        </a>
      </div>
      <div className="footer-bottom-right">
        <p>&copy; {new Date().getFullYear()} Sweet Saudade. Todos os direitos reservados.</p>
      </div>
      </div>
    </div>
  );
}

export default Footer