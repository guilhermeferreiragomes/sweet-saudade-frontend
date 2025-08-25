import React, { useState } from 'react'
import './Contactar.css'
import { MdOutlineEmail, MdLocalPhone } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTiktok } from "react-icons/fa";
import logo from '../../../assets/sweetsauade_logotipos/logo_transparente.png'
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import productsData from '../../../data/productsData.json';

const getStoredCounter = () => {
  const stored = localStorage.getItem('orderCounter');
  return stored ? parseInt(stored) : 0;
};

const Contactar = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [counter, setCounter] = useState(getStoredCounter());
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const incrementCounter = () => {
    setCounter(prevCounter => {
      const newCounter = prevCounter + 1;
      localStorage.setItem('orderCounter', newCounter.toString());
      return newCounter;
    });
  }

  const addProduct = () => {
    if (currentProduct) {
      const product = productsData.find(p => p.id === parseInt(currentProduct));
      const newProduct = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        pack: product.pack,
        price: product.price,
        image: product.image,
        quantity: currentQuantity
      };
      
      setSelectedProducts([...selectedProducts, newProduct]);
      setCurrentProduct('');
      setCurrentQuantity(1);
    }
  };

  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== id));
  };

  const getCurrentProductData = () => {
    if (currentProduct) {
      return productsData.find(p => p.id === parseInt(currentProduct));
    }
    return null;
  };

  function sendEmail(e) {
    e.preventDefault();

    if (!recaptchaToken) {
      alert('Por favor, complete a verificação reCAPTCHA');
      return;
    }

    const nextOrderNumber = counter + 1;
    
    const productsList = selectedProducts.map(item => 
      `${item.name} (${item.pack}) - Quantidade: ${item.quantity} - Preço: ${item.price}`
    ).join('\n');

    const templateParams = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
      products: productsList,
      counter: nextOrderNumber,
      orderNumber: nextOrderNumber
    }

    emailjs.send('service_091pqna', 'template_k1o2pq3', templateParams, '8lF7gEp6qdH4ZCx7B')
    .then((response) => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setSelectedProducts([]);
      setRecaptchaToken(null);
      incrementCounter();
      alert(`Encomenda #${nextOrderNumber} enviada com sucesso!`);
    })
    .catch((error) => {
      console.error('Erro ao enviar email:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    });
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

            <div className='product-section'>
              <h3>Produtos</h3>
              <div className='product-selector'>
                <div className='form-group product-select-group'>
                  <label className='label'>Produto</label>
                  <div className='product-selector-container'>
                    <select 
                      className='input product-select'
                      value={currentProduct}
                      onChange={(e) => setCurrentProduct(e.target.value)}
                    >
                      <option value="">Selecione um produto</option>
                      {productsData.map(product => (
                        <option key={product.id} value={product.id}>
                          {product.name} ({product.pack}) - {product.price}
                        </option>
                      ))}
                    </select>
                    {getCurrentProductData() && (
                      <div className='product-preview'>
                        <img 
                          src={getCurrentProductData().image} 
                          alt={getCurrentProductData().name}
                          className='product-preview-image'
                        />
                        <div className='product-preview-info'>
                          <h5>{getCurrentProductData().name}</h5>
                          <p>{getCurrentProductData().description}</p>
                          <span className='product-price'>{getCurrentProductData().price}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className='quantity-and-add'>
                  <div className='form-group quantity-group'>
                    <label className='label'>Quantidade</label>
                    <div className='quantity-controls'>
                      <button 
                        type='button' 
                        onClick={() => setCurrentQuantity(Math.max(1, currentQuantity - 1))}
                        className='quantity-btn'
                      >
                        -
                      </button>
                      <span className='quantity-display'>{currentQuantity}</span>
                      <button 
                        type='button' 
                        onClick={() => setCurrentQuantity(currentQuantity + 1)}
                        className='quantity-btn'
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    type='button' 
                    onClick={addProduct}
                    className='add-product-btn'
                    disabled={!currentProduct}
                  >
                    ADICIONAR
                  </button>
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div className='selected-products'>
                  <h4>Produtos selecionados:</h4>
                  {selectedProducts.map(item => (
                    <div key={item.id} className='selected-product-item'>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className='selected-product-image'
                      />
                      <div className='selected-product-info'>
                        <span className='product-name'>{item.name}</span>
                        <span className='product-details'>({item.pack}) - Qtd: {item.quantity}</span>
                        <span className='product-price'>{item.price}</span>
                      </div>
                      <button 
                        type='button' 
                        onClick={() => removeProduct(item.id)}
                        className='remove-btn'
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                sitekey="6LdOUbIrAAAAAHKGJivU10flGcPhFVMpPDgDu_Hs"
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
