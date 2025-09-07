import React, { useState, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import ProductSelector from '../ProductSelector/ProductSelector';
import productsData from '../../../../data/productsData.json';
import Swal from 'sweetalert2';
import { FaChevronDown, FaChevronUp, FaFileInvoice } from 'react-icons/fa';

const OrderForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(1);
  
  // 🆕 ESTADO PARA CONTROLAR ENVIO
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para o acordeão do formulário
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

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

  // Verificar cookies no mount
  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted') === 'true';
    setCookiesAccepted(accepted);
  }, []);

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

  // 🆕 NOVA FUNÇÃO: Chamar backend Railway
  const incrementOrderCounter = async () => {
    try {
      const response = await fetch('https://sweet-saudade-backend-production.up.railway.app/api/encomenda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      console.log('Encomenda registada:', result.orderNumber);
      
      return result.counter;
      
    } catch (error) {
      console.error('Erro ao registar encomenda:', error);
      return null;
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    // 🆕 SCROLL TO TOP IMEDIATAMENTE
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 🆕 PREVENIR MÚLTIPLOS ENVIOS
    if (isSubmitting) {
      return; // Se já está enviando, não faz nada
    }

    // 🚫 BLOQUEIO REALISTA - Sem cookies = não funciona
    if (!cookiesAccepted) {
      Swal.fire({
        ...swalConfig,
        position: "center",
        icon: "error",
        title: "Cookies necessários",
        text: "Para sua segurança, é necessário aceitar cookies para usar este formulário.",
        confirmButtonText: "Entendi",
        showConfirmButton: true
      });
      return;
    }

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

    // 🆕 BLOQUEAR BOTÃO DURANTE ENVIO
    setIsSubmitting(true);

    try {
      // 🆕 OBTER O COUNTER DO BACKEND
      const orderCounter = await incrementOrderCounter();
      
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
        date: formattedDate,
        counter: orderCounter || 'N/A'
      };

      // Enviar email
      await emailjs.send('service_091pqna', 'template_k1o2pq3', templateParams, '8lF7gEp6qdH4ZCx7B');
      
      // Limpar formulário
      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setSelectedProducts([]);
      setRecaptchaToken(null);

      Swal.fire({
        ...swalConfig,
        icon: "success",
        title: "Pedido enviado!",
        text: "Recebemos a sua encomenda! Aguarde a nossa resposta.",
        confirmButtonText: "Continuar",
        timer: 4000,
        timerProgressBar: true
      });

    } catch (error) {
      console.error('Erro:', error);
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Erro no envio",
        text: "Ups... Algo correu mal. Tente novamente!",
        confirmButtonText: "Tentar novamente"
      });
    } finally {
      // 🆕 DESBLOQUEAR BOTÃO APÓS ENVIO (sucesso ou erro)
      setIsSubmitting(false);
    }
  };

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    localStorage.setItem('CookieConsent', 'true');
    setCookiesAccepted(true);
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
          
          {/* ⚠️ AVISO SE COOKIES REJEITADOS */}
          {!cookiesAccepted && (
            <div style={{
              backgroundColor: '#ffebee',
              border: '1px solid #f44336',
              borderRadius: '5px',
              padding: '20px',
              margin: '20px 0',
              color: '#d32f2f',
              textAlign: 'center'
            }}>
              <strong>Aceite as cookies para utilizar o formulário</strong>
              <button
                type="button"
                onClick={acceptCookies}
                style={{
                  backgroundColor: '#EBB104',
                  color: '#262724',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s',
                  marginTop: '10px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d4a004'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#EBB104'}
              >
                🍪 Aceitar Cookies
              </button>
            </div>
          )}

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
                  disabled={!cookiesAccepted}
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
                  disabled={!cookiesAccepted}
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
                disabled={!cookiesAccepted}
              />
            </div>

            <div style={{ opacity: cookiesAccepted ? 1 : 0.5 }}>
              <ProductSelector
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
                currentQuantity={currentQuantity}
                setCurrentQuantity={setCurrentQuantity}
                onAddProduct={addProduct}
                disabled={!cookiesAccepted}
              />
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
                disabled={!cookiesAccepted}
              />
            </div>
            
            <div className='recaptcha'>
              {cookiesAccepted && (
                <ReCAPTCHA
                  sitekey="6LdOUbIrAAAAAHKGJivU10flGcPhFVMpPDgDu_Hs"
                  onChange={(token) => setRecaptchaToken(token)}
                />
              )}
              
              <button 
                disabled={!cookiesAccepted || !recaptchaToken || isSubmitting} 
                type='submit' 
                className='submit-btn'
                style={{ 
                  opacity: (!cookiesAccepted || !recaptchaToken || isSubmitting) ? 0.5 : 1,
                  cursor: (!cookiesAccepted || !recaptchaToken || isSubmitting) ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;