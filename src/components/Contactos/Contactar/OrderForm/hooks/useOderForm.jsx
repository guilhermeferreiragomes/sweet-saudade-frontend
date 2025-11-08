import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export const useOrderForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [message, setMessage] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [isFormExpanded, setIsFormExpanded] = useState(() => {
    // Check if we're on mobile by screen width
    return window.innerWidth <= 768;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Only auto-expand on mobile
      if (window.innerWidth <= 768) {
        setIsFormExpanded(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const sendEmail = async (e, cookiesAccepted) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isSubmitting) return;

    // Validações (Cookies, reCAPTCHA, Produtos)
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

    setIsSubmitting(true);

    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('pt-PT');
      
      const productsList = selectedProducts.map(item => 
        `${item.name} (${item.pack}) - Quantidade: ${item.quantity} - Preço: ${(item.numericPrice * item.quantity).toFixed(2)}€`
      ).join('\n');

      const templateParams = {
        firstName,
        lastName,
        email,
        phone,
        message,
        products: productsList,
        date: formattedDate,
      };

      // --- URL ATUALIZADO ---
      // URL do Google Apps Script (fornecido por ti)
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfVqcw2ohSw4joEcluaWjmBYh77DBtRjx2QT0pjSwhPoXVsef-9EcliExPPu0zjgr6lA/exec';

      // 3. Criar a promessa para o Google Sheets
      const googleSheetPromise = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateParams),
      });

      // 4. Criar a promessa para o EmailJS
      const emailJsPromise = emailjs.send('service_091pqna', 'template_k1o2pq3', templateParams, '8lF7gEp6qdH4ZCx7B');

      // 5. Executar ambas as promessas. 
      const [sheetResponse, emailResponse] = await Promise.all([
        googleSheetPromise, 
        emailJsPromise
      ]);

      // 6. Ler a resposta do Google Sheets
      if (!sheetResponse.ok) {
        throw new Error('Falha ao contactar o Google Sheets');
      }
      
      const sheetResult = await sheetResponse.json();
      
      if (sheetResult.result !== 'success') {
         throw new Error(sheetResult.message || 'Erro desconhecido do Google Sheets');
      }
      
      const newOrderNumber = sheetResult.orderNumber; // Captura o nº da encomenda
      
      // 7. Limpar o formulário
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('')
      setMessage('');
      setSelectedProducts([]);
      setRecaptchaToken(null);

      // 8. Mensagem de Sucesso Atualizada
      Swal.fire({
        ...swalConfig,
        icon: "success",
        title: "Pedido enviado!",
        // Mostra o número da encomenda ao utilizador
        text: `Recebemos a sua encomenda (Nº ${newOrderNumber})! Aguarde a nossa resposta.`,
        confirmButtonText: "Continuar",
        timer: 4000,
        timerProgressBar: true
      });

    } catch (error) {
      console.error('Erro num dos envios (EmailJS ou Google Sheets):', error);
      Swal.fire({
        ...swalConfig,
        icon: "error",
        title: "Erro no envio",
        text: "Ups... Algo correu mal. Tente novamente!",
        confirmButtonText: "Tentar novamente"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // States
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
    
    // Functions
    sendEmail
  };
};