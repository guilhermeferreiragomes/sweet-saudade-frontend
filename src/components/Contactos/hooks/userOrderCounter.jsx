import { useState, useEffect } from 'react';

export const useOrderCounter = () => {
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ler valor do localStorage ao carregar
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sweet-saudade-counter');
      if (saved) {
        const parsed = parseInt(saved, 10);
        setCounter(isNaN(parsed) ? 0 : parsed);
      }
      setIsLoaded(true);
    } catch (error) {
      console.warn('Erro ao ler localStorage:', error);
      setCounter(0);
      setIsLoaded(true);
    }
  }, []);

  // Salvar no localStorage sempre que counter muda
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sweet-saudade-counter', counter.toString());
    }
  }, [counter, isLoaded]);

  // Gerar próximo número de encomenda
  const getNextOrder = () => {
    const nextNumber = counter + 1;
    setCounter(nextNumber);
    
    // Gerar ID com data
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const paddedNumber = String(nextNumber).padStart(6, '0');
    
    const orderId = `SS-${year}${month}${day}-${paddedNumber}`;
    
    return {
      orderNumber: nextNumber,
      orderId: orderId
    };
  };

  const resetCounter = () => {
    setCounter(0);
    localStorage.removeItem('sweet-saudade-counter');
  };

  return {
    counter,
    getNextOrder,
    resetCounter,
    isLoaded
  };
};