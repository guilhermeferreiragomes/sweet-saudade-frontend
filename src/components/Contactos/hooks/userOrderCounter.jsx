import { useState, useEffect } from 'react';

export const useOrderCounter = () => {
  const [counter, setCounter] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Ler valor atual do servidor (opcional, útil para mostrar no UI)
  useEffect(() => {
    fetch('/api/counter')
      .then(r => r.json())
      .then(d => {
        setCounter(d?.lastOrder ?? 0);
        setIsLoaded(true);
      })
      .catch(() => {
        // Se falhar, ainda assim marcamos como carregado para não bloquear o UI
        setIsLoaded(true);
      });
  }, []);

  // Pede ao backend o próximo número (incrementa lá)
  const getNextOrder = async () => {
    const r = await fetch('/api/next-order', { method: 'POST' });
    if (!r.ok) throw new Error('Falha a obter próximo número');
    const data = await r.json(); // { orderNumber, orderId }
    setCounter(data.orderNumber);
    return data; // devolve também o orderId
  };

  // Mantemos reset como utilitário (só local)
  const resetCounter = () => {
    setCounter(0);
  };

  return {
    counter,
    getNextOrder, // <--- usar isto em vez de incrementCounter
    resetCounter,
    isLoaded
  };
};