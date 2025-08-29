import './Contactar.css';
import ContactInfo from './ContactInfo/ContactInfo';
import OrderForm from './OrderForm/OrderForm';
import { useOrderCounter } from '../hooks/userOrderCounter.js';

const Contactar = () => {
  const { counter, incrementCounter } = useOrderCounter();

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