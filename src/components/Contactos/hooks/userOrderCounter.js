import { useState, useEffect } from 'react';

const getStoredCounter = () => {
  try {
    const stored = localStorage.getItem('orderCounter');
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('Erro ao ler o contador do localStorage:', error);
    return 0;
  }
};

const setStoredCounter = (value) => {
  try {
    localStorage.setItem('orderCounter', value.toString());
  } catch (error) {
    console.error('Erro ao guardar o contador no localStorage:', error);
  }
};

export const useOrderCounter = () => {
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega o valor do localStorage quando o componente é montado
  useEffect(() => {
    const storedValue = getStoredCounter();
    setCounter(storedValue);
    setIsLoaded(true);
  }, []);

  const incrementCounter = () => {
    setCounter(prevCounter => {
      const newCounter = prevCounter + 1;
      setStoredCounter(newCounter);
      return newCounter;
    });
  };

  const resetCounter = () => {
    setCounter(0);
    setStoredCounter(0);
  };

  return { 
    counter, 
    incrementCounter, 
    resetCounter,
    isLoaded 
  };
};