import React, { useState } from 'react'
import './Contactar.css'
import { MdOutlineEmail, MdLocalPhone } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import logo from '../../../assets/sweetsauade_logotipos/logo_transparente.png'
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';


const Contactar = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  function sendEmail(e) {
    e.preventDefault();


    const templateParams = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
    }

    emailjs.send('service_091pqna', 'template_k1o2pq3', templateParams, '8lF7gEp6qdH4ZCx7B')
    .then((response) => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setRecaptchaToken(null);
    })
  }

  return (
    <div className='contactar-container'>
      <h1 className='titulo'>FALE CONNOSCO</h1>
      <div className='contactar-content'>
        <div className='duvidas'>
          <p className="duvidasP">Para dúvidas e mais informações</p>
          <p className='sweet-saudade'> Sweet Saudade </p>
          <ul>
              <li><a href='mailto:sweetsaudade@gmail.com'><MdOutlineEmail size={22} color='#f4c430' /> sweetsaudade@gmail.com</a></li>
              <li><a href='tel:+351912345678'><MdLocalPhone size={20} color='#f4c430' /> +351 912 345 678</a></li>
          </ul>
          <div className="social-mediaContactar">
            <a href='https://www.instagram.com/guilhermeffgomes/' target="_blank" rel="noopener noreferrer">
              <FiInstagram color='#f4c430' size={23} />
            </a>
            <a href='https://www.facebook.com/guilhermeffgomes' target="_blank" rel="noopener noreferrer">
              <FaFacebookF color='#f4c430' size={23} />
            </a>
            <a href='https://www.linkedin.com/in/guilhermeffgomes/' target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn color='#f4c430' size={23} />
            </a>
            <a href='https://www.tiktok.com/@guilhermeffgomes' target="_blank" rel="noopener noreferrer">
              <FaTiktok color='#f4c430' size={23} />
            </a>
          </div>
            <img src={logo} alt="Logo" className="footer-logo" />
        </div>
        <div className='formulario'>
          <p className='duvidasPi'>Formulário para encomendas</p>
          <form className='form' onSubmit={sendEmail}>
            <div className='form-row'>
              <div className='form-group'>
                <label className='label'>Primeiro Nome</label>
                <input
                  className='input'
                  type='text'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='label'>Último Nome</label>
                <input
                  className='input'
                  type='text'
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                />
              </div>
            </div>
            <div className='form-group'>
              <label className='label'>Email</label>
              <input
                className='input'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className='form-group'>
              <label className='label'>Mensagem</label>
              <textarea
                className='textarea'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                required
              />
            </div>
            <div className='recaptcha'>
              <ReCAPTCHA
                sitekey="6LdW7KwrAAAAAAAQwmE8y_fhyM5ftbkrkFlQf0j_"
                onChange={(token) => setRecaptchaToken(token)}
              />
              <button disabled={!recaptchaToken} type='submit' className='submit-btn'>Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contactar
