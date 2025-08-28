import { useState } from 'react';

const getStoredCounter = () => {
  const stored = localStorage.getItem('orderCounter');
  return stored ? parseInt(stored) : 0;
};

export const useOrderCounter = () => {
  const [counter, setCounter] = useState(getStoredCounter());

  const incrementCounter = () => {
    setCounter(prevCounter => {
      const newCounter = prevCounter + 1;
      localStorage.setItem('orderCounter', newCounter.toString());
      return newCounter;
    });
  };

  return { counter, incrementCounter };
};