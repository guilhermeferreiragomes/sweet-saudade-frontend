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
    
    // --- ALTERAÇÃO AQUI ---
    // Buscar os novos estados
    selectedProductId, setSelectedProductId,
    selectedPack, setSelectedPack,
    // --- FIM DA ALTERAÇÃO ---

    currentQuantity, setCurrentQuantity,
    isSubmitting,
    isFormExpanded, setIsFormExpanded,
    sendEmail
  } = useOrderForm();

  const toggleForm = () => {
    setIsFormExpanded(!isFormExpanded);
  };

  // --- FUNÇÃO addProduct ATUALIZADA ---
  const addProduct = () => {
    // Agora verifica os dois estados separados
    if (selectedProductId && selectedPack) {
      
      const product = productsData.find(p => p.id === parseInt(selectedProductId));
      const option = product.packOptions.find(opt => opt.pack === selectedPack);
      
      if (!product || !option) return; 

      const numericPrice = parseFloat(option.price.replace('€', '').replace(',', '.'));
      
      const newProduct = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        pack: option.pack,
        price: option.price,
        numericPrice: numericPrice, 
        image: product.image,
        quantity: currentQuantity,
        date: new Date().toISOString()
      };
      
      setSelectedProducts([...selectedProducts, newProduct]);
      
      // Limpar os seletores e a quantidade
      setSelectedProductId('');
      setSelectedPack('');
      setCurrentQuantity(1);
    }
  };
  // --- FIM DA ATUALIZAÇÃO ---

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
            
            // --- ALTERAÇÃO AQUI ---
            // Passar os novos props para o FormFields
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
            selectedPack={selectedPack}
            setSelectedPack={setSelectedPack}
            // --- FIM DA ALTERAÇÃO ---

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