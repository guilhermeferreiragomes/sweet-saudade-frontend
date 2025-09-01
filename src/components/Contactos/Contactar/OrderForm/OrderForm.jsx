import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import ProductSelector from '../ProductSelector/ProductSelector';
import productsData from '../../../../data/productsData.json';
import Swal from 'sweetalert2';
import { FaChevronDown, FaChevronUp, FaFileInvoice } from 'react-icons/fa';

const OrderForm = ({ counter, incrementCounter }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(1);
  
  // Estado para o acordeão do formulário
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  // Configuração customizada do SweetAlert2
  const swalConfig = {
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      content: 'custom-swal-content',
      confirmButton: 'custom-swal-confirm-btn',
      cancelButton: 'custom-swal-cancel-btn'
    },
    buttonsStyling: false
  };

  const toggleForm = () => {
    setIsFormExpanded(!isFormExpanded);
  };

  const addProduct = () => {
    if (currentProduct) {
      const product = productsData.find(p => p.id === parseInt(currentProduct));
      const numericPrice = parseFloat(product.price.replace('€', '').replace(',', '.'));
      
      const newProduct = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        pack: product.pack,
        price: product.price,
        numericPrice: numericPrice, 
        image: product.image,
        quantity: currentQuantity,
        date: new Date().toISOString()
      };
      
      setSelectedProducts([...selectedProducts, newProduct]);
      setCurrentProduct('');
      setCurrentQuantity(1);
    }
  };

  const removeProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== id));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      Swal.fire({
        ...swalConfig,
        position: "center",
        icon: "warning",
        title: "Verificação necessária",
        text: "Por favor, complete a verificação reCAPTCHA",
        confirmButtonText: "OK",
        showConfirmButton: true
      });
      return;
    }

    if (selectedProducts.length === 0) {
      Swal.fire({
        ...swalConfig,
        position: "center",
        icon: "warning",
        title: "Produtos em falta",
        text: "Por favor, selecione pelo menos um produto antes de enviar o pedido.",
        showConfirmButton: true,
        confirmButtonText: "OK"
      });
      return;
    }

    const nextOrderNumber = counter + 1;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-PT');
    
    const productsList = selectedProducts.map(item => 
      `${item.name} (${item.pack}) - Quantidade: ${item.quantity} - Preço: ${(item.numericPrice * item.quantity).toFixed(2)}€`
    ).join('\n');

    const templateParams = {
      firstName,
      lastName,
      email,
      message,
      products: productsList,
      counter: nextOrderNumber,
      orderNumber: nextOrderNumber,
      date: formattedDate
    };

    emailjs.send('service_091pqna', 'template_k1o2pq3', templateParams, '8lF7gEp6qdH4ZCx7B')
    .then(() => {
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setSelectedProducts([]);
      setRecaptchaToken(null);
      incrementCounter();
      Swal.fire({
        ...swalConfig,
        icon: "success",
        title: "Pedido enviado!",
        text: "Recebemos o seu pedido! Aguarde a nossa resposta.",
        confirmButtonText: "Continuar",
        timer: 4000,
        timerProgressBar: true
      });
    })
    .catch(() => {
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Erro no envio",
        text: "Ups... Algo correu mal. Tente novamente!",
        confirmButtonText: "Tentar novamente"
      });
    });
  };


  return (
    <div className='formulario'>
      <div className="form-accordion-container">
        {/* Mobile Accordion Header */}
        <button 
          type="button"
          className={`form-accordion-header ${isFormExpanded ? 'active' : ''}`}
          onClick={toggleForm}
        >
          <div className="accordion-title">
            <FaFileInvoice />
            <span>Formulário para encomendas</span>
          </div>
          {isFormExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Desktop Title (always visible on desktop) */}
        <p className='duvidasPi desktop-title'>Formulário para encomendas</p>
        
        {/* Form Content */}
        <div className={`form-content ${isFormExpanded ? 'expanded' : ''}`}>
          <form className='form' onSubmit={sendEmail}>
            <div className='form-row'>
              <div className='form-group'>
                <label className='label'>Primeiro Nome <span style={{color: 'red'}}>*</span></label>
                <input
                  className='input'
                  type='text'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  required
                />
              </div>
              <div className='form-group'>
                <label className='label'>Último Nome <span style={{color: 'red'}}>*</span></label>
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
              <label className='label'>Email <span style={{color: 'red'}}>*</span></label>
              <input
                className='input'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            <ProductSelector
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
              currentQuantity={currentQuantity}
              setCurrentQuantity={setCurrentQuantity}
              onAddProduct={addProduct}
            />

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
                      <span className='selected-product-name'>{item.name}</span>
                      <span className='selected-product-details'>{item.pack} | Quantidade: {item.quantity}</span>
                      <span className='selected-product-price'>{(item.numericPrice * item.quantity).toFixed(2)}€</span>
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

            <div className='form-group'>
              <label className='label'>Mensagem</label>
              <textarea
                className='textarea'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </div>
            
            <div className='recaptcha'>
              <ReCAPTCHA
                sitekey="6LdOUbIrAAAAAHKGJivU10flGcPhFVMpPDgDu_Hs"
                onChange={(token) => setRecaptchaToken(token)}
              />
              <button disabled={!recaptchaToken} type='submit' className='submit-btn'>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;