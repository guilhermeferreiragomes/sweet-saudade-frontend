import React, { useState } from 'react';
import './Contactar.css';
import ContactInfo from './ContactInfo/ContactInfo';
import OrderForm from './OrderForm/OrderForm';

const Contactar = () => {
  const [counter, setCounter] = useState(0);
  
  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };

  return (
    <div className='contactar-container'>
      <h1 className='titulo'>FALE CONNOSCO</h1>
      <div className='contactar-content'>
        <ContactInfo />
        
        <OrderForm 
          counter={counter}
          incrementCounter={incrementCounter}
        />
      </div>
    </div>
  );
};

export default Contactar;