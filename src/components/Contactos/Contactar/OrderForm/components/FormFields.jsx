import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import ProductSelector from '../../ProductSelector/ProductSelector';
import SelectedProducts from './SelectedProducts.jsx';

const FormFields = ({ 
  firstName, setFirstName,
  lastName, setLastName, 
  email, setEmail,
  phone, setPhone,
  message, setMessage,
  recaptchaToken, setRecaptchaToken,
  cookiesAccepted,
  isSubmitting,
  onSubmit,
  
  // --- ALTERAÇÃO AQUI ---
  // Props do ProductSelector atualizados
  selectedProductId, setSelectedProductId,
  selectedPack, setSelectedPack,
  // --- FIM DA ALTERAÇÃO ---
  
  currentQuantity, setCurrentQuantity,
  onAddProduct,
  // Props dos produtos selecionados
  selectedProducts,
  onRemoveProduct
}) => {
  return (
    <form className='form' onSubmit={onSubmit}>
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
      
      <div className='form-group'>
        <label className='label'>Telemóvel <span style={{color: 'red'}}>*</span></label>
        <input
          className='input'
          type='tel'
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
          disabled={!cookiesAccepted}
        />
      </div>

      {/* ProductSelector */}
      <div style={{ opacity: cookiesAccepted ? 1 : 0.5 }}>
        <ProductSelector
          // --- ALTERAÇÃO AQUI ---
          // Passar os novos props para o ProductSelector
          selectedProductId={selectedProductId}
          setSelectedProductId={setSelectedProductId}
          selectedPack={selectedPack}
          setSelectedPack={setSelectedPack}
          // --- FIM DA ALTERAÇÃO ---

          currentQuantity={currentQuantity}
          setCurrentQuantity={setCurrentQuantity}
          onAddProduct={onAddProduct}
          disabled={!cookiesAccepted}
        />
      </div>

      {/* Produtos selecionados ANTES da mensagem */}
      <SelectedProducts 
        selectedProducts={selectedProducts}
        onRemoveProduct={onRemoveProduct}
      />

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
          {isSubmitting ? 'A enviar...' : 'Enviar'}
        </button>
      </div>
    </form>
  );
};

export default FormFields;