import { FaChevronDown, FaChevronUp, FaFileInvoice } from 'react-icons/fa';
import productsData from '../../../../data/productsData.json';

import CookieNotice from './components/CookieNotice.jsx';
import FormFields from './components/FormFields.jsx';

import { useCookies } from './hooks/useCookies.jsx';
import { useOrderForm } from './hooks/useOderForm.jsx';

const OrderForm = () => {
  const { cookiesAccepted, acceptCookies } = useCookies();
  const {
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    phone, setPhone,
    message, setMessage,
    recaptchaToken, setRecaptchaToken,
    selectedProducts, setSelectedProducts,
    currentProduct, setCurrentProduct,
    currentQuantity, setCurrentQuantity,
    isSubmitting,
    isFormExpanded, setIsFormExpanded,
    sendEmail
  } = useOrderForm();

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

  const handleSubmit = (e) => {
    sendEmail(e, cookiesAccepted);
  };

  return (
    <div className='formulario'>
      <div className="form-accordion-container">
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

        <p className='duvidasPi desktop-title'>Formulário para encomendas</p>
        
        <div className={`form-content ${isFormExpanded ? 'expanded' : ''}`}>
          
          {!cookiesAccepted && <CookieNotice onAccept={acceptCookies} />}

          <FormFields
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            email={email} setEmail={setEmail}
            phone={phone} setPhone={setPhone}
            message={message} setMessage={setMessage}
            recaptchaToken={recaptchaToken} setRecaptchaToken={setRecaptchaToken}
            cookiesAccepted={cookiesAccepted}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            currentQuantity={currentQuantity}
            setCurrentQuantity={setCurrentQuantity}
            onAddProduct={addProduct}
            selectedProducts={selectedProducts}
            onRemoveProduct={removeProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;