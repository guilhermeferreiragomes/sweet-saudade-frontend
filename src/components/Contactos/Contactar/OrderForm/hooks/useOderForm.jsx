import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

export const useOrderForm = () => {
  // ... (todos os teus 'useState', 'useEffect', 'swalConfig' - sem alterações) ...
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

      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKBEZ45o0f8DURS0cKBjuID2csLhCJdT13TMT7gh5l2KeVzS7eBrR4MQNea5-7PIYz/exec';

      const googleBody = new URLSearchParams();
      Object.entries(templateParams).forEach(([k,v]) => googleBody.append(k, v));

      // 1) Envia o email (se falhar aborta)
      let emailResponse;
      try {
        emailResponse = await emailjs.send('service_091pqna', 'template_k1o2pq3', templateParams, '8lF7gEp6qdH4ZCx7B');
      } catch (err) {
        throw new Error('Falha no envio do Email: ' + (err && err.text ? err.text : err.message || err));
      }

      // 2) Tenta enviar para o Google Sheets com timeout
      let sheetResult = null;
      try {
        const controller = new AbortController();
        const timeoutMs = 15000;
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        const sheetResp = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: googleBody.toString(),
          mode: 'cors',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        const text = await sheetResp.text();
        try { sheetResult = JSON.parse(text); } catch (e) {
          console.warn('Resposta do Apps Script não é JSON válido:', text);
        }

        if (!sheetResp.ok) {
          throw new Error('Google Sheets respondeu com status ' + sheetResp.status + ' — ' + (sheetResult && sheetResult.message ? sheetResult.message : '(ver console)'));
        }
        if (!sheetResult || sheetResult.result !== 'success') {
          throw new Error((sheetResult && sheetResult.message) ? sheetResult.message : 'Resposta inesperada do Google Sheets');
        }
      } catch (err) {
        // Se falhar aqui, regista para debug mas CONTINUA (porque já confirmaste que a folha está a ser atualizada)
        console.warn('Não foi possível confirmar resposta do Google Sheets (CORS/timeout/parse):', err);
        // Opcional: podes enviar um log para o teu servidor aqui
      }

      const newOrderNumber = (sheetResult && sheetResult.orderNumber) ? sheetResult.orderNumber : 'N/D';

      // Limpa formulário
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSelectedProducts([]);
      setRecaptchaToken(null);
      setSelectedProductId('');
      setSelectedPack('');

      Swal.fire({
        ...swalConfig,
        icon: "success",
        title: "Pedido enviado!",
        text: `Recebemos a sua encomenda (Nº ${newOrderNumber}). Se não aparecer no histórico, contacte-nos.`,
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
        text: `Ups... Algo correu mal. (${error.message})`,
        confirmButtonText: "Tentar novamente"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (o teu 'return' - sem alterações) ...
  return {
    // States
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
    
    // Functions
    sendEmail
  };
};