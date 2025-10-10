export const incrementOrderCounter = async () => {
  try {
    const response = await fetch('https://sweet-saudade-backend.onrender.com/api/encomenda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    console.log('Encomenda registada:', result.orderNumber);
    
    return result.counter;
    
  } catch (error) {
    console.error('Erro ao registar encomenda:', error);
    return null;
  }
};