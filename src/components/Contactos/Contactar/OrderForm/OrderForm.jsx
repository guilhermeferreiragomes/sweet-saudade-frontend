import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from '@emailjs/browser';
import ProductSelector from '../ProductSelector/ProductSelector';
import productsData from '../../../../data/productsData.json';

const OrderForm = ({ counter, incrementCounter }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(1);

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
      alert('Por favor, complete a verificação reCAPTCHA');
      return;
    }

    const nextOrderNumber = counter + 1;
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    const productsList = selectedProducts.map(item => 
      `${item.name} (${item.pack}) - Quantidade: ${item.quantity} - Preço: ${(item.numericPrice * item.quantity).toFixed(2)}€`
    ).join('\n');

    const templateParams = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      message: message,
      products: productsList,
      counter: nextOrderNumber,
      orderNumber: nextOrderNumber,
      date: formattedDate
    };

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
  };

  return (
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
                    <span className='product-name'>{item.name}</span>
                    <span className='product-details'>{item.pack} | Quantidade: {item.quantity}</span>
                    <span className='product-price'>{(item.numericPrice * item.quantity).toFixed(2)}€</span>
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
          <button disabled={!recaptchaToken} type='submit' className='submit-btn'>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;