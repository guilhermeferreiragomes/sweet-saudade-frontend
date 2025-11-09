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
  
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedPack, setSelectedPack] = useState('');

  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [isFormExpanded, setIsFormExpanded] = useState(() => {
    return window.innerWidth <= 768;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleResize = () => {
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

    // Validações (sem alteração)
    if (!cookiesAccepted) {
      Swal.fire({ ...swalConfig, position: "center", icon: "error", title: "Cookies necessários", text: "Para sua segurança, é necessário aceitar cookies para usar este formulário.", confirmButtonText: "Entendi", showConfirmButton: true });
      return;
    }
    if (!recaptchaToken) {
      Swal.fire({ ...swalConfig, position: "center", icon: "warning", title: "Verificação necessária", text: "Por favor, complete a verificação reCAPTCHA", confirmButtonText: "OK", showConfirmButton: true });
      return;
    }
    if (selectedProducts.length === 0) {
      Swal.fire({ ...swalConfig, position: "center", icon: "warning", title: "Produtos em falta", text: "Por favor, selecione pelo menos um produto antes de enviar o pedido.", showConfirmButton: true, confirmButtonText: "OK" });
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

      // --- ALTERAÇÃO PRINCIPAL AQUI ---

      // 1. O URL continua a ser o teu mais recente
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwJvwvgVxKJojw_b8begfTSbqZidoldsrBif4o_e8U0DMwg3f_72Y7HvPQowFkIcdSq1Q/exec';

      // 2. Criar FormData
      // Isto envia os dados como 'multipart/form-data', o que EVITA o preflight de CORS
      const formData = new FormData();
      formData.append('firstName', templateParams.firstName);
      formData.append('lastName', templateParams.lastName);
      formData.append('email', templateParams.email);
      formData.append('phone', templateParams.phone);
      formData.append('message', templateParams.message);
      formData.append('products', templateParams.products);
      formData.append('date', templateParams.date);

      // 3. O 'fetch' para o Google Sheets foi alterado
      const googleSheetPromise = fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData, // Envia FormData em vez de JSON
        // NÃO definimos 'Content-Type', o browser faz isso automaticamente
      });
      
      // 4. O envio para o EmailJS não muda
      const emailJsPromise = emailjs.send('service_091pqna', 'template_k1o2pq3', templateParams, '8lF7gEp6qdH4ZCx7B');

      // --- FIM DA ALTERAÇÃO ---

      const [sheetResponse, emailResponse] = await Promise.all([
        googleSheetPromise, 
        emailJsPromise
      ]);

      if (!sheetResponse.ok) {
        throw new Error('Falha ao contactar o Google Sheets');
      }
      
      const sheetResult = await sheetResponse.json();
      
      if (sheetResult.result !== 'success') {
         throw new Error(sheetResult.message || 'Erro desconhecido do Google Sheets');
      }
      
      const newOrderNumber = sheetResult.orderNumber;
      
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('')
      setMessage('');
      setSelectedProducts([]);
      setRecaptchaToken(null);
      setSelectedProductId('');
      setSelectedPack('');

      Swal.fire({
        ...swalConfig,
        icon: "success",
        title: "Pedido enviado!",
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
    firstName, setFirstName,
    lastName, setLastName,
    email, setEmail,
    phone, setPhone,
    message, setMessage,
    recaptchaToken, setRecaptchaToken,
    selectedProducts, setSelectedProducts,
    selectedProductId, setSelectedProductId,
    selectedPack, setSelectedPack,
    currentQuantity, setCurrentQuantity,
    isSubmitting,
    isFormExpanded, setIsFormExpanded,
    sendEmail
  };
};