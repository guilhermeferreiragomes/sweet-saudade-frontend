import { useState, useEffect } from 'react';

export const useOrderCounter = () => {
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // URL do backend no Render (substitui pela tua URL real)
  const API_BASE_URL = 'https://sweet-saudade-full.onrender.com'; // ← ALTERAR AQUI

  useEffect(() => {
    const fetchCounter = async () => {
      try {
        console.log('Tentando buscar contador...');
        const response = await fetch(`${API_BASE_URL}/api/counter`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Contador recebido:', data);
        
        setCounter(data?.lastOrder ?? 0);
        setIsLoaded(true);
      } catch (error) {
        console.error('Erro ao buscar contador:', error);
        setIsLoaded(true);
        setCounter(0);
      }
    };

    fetchCounter();
  }, []);

  const getNextOrder = async () => {
    try {
      console.log('Pedindo próxima encomenda...');
      const response = await fetch(`${API_BASE_URL}/api/next-order`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Próxima encomenda:', data);
      
      setCounter(data.orderNumber);
      return data;
    } catch (error) {
      console.error('Erro ao obter próxima encomenda:', error);
      throw error;
    }
  };

  const resetCounter = () => {
    setCounter(0);
  };

  return {
    counter,
    getNextOrder,
    resetCounter,
    isLoaded
  };
};