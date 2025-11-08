import React from 'react'; // Removido { useState }
import './Contactar.css';
import ContactInfo from './ContactInfo/ContactInfo';
import OrderForm from './OrderForm/OrderForm';

const Contactar = () => {
  // O estado 'counter' e a função 'incrementCounter' foram removidos
  
  return (
    <div className='contactar-container'>
      <h1 className='titulo'>FALE CONNOSCO</h1>
      <div className='contactar-content'>
        <ContactInfo />
        
        <OrderForm />
      </div>
    </div>
  );
};

export default Contactar;