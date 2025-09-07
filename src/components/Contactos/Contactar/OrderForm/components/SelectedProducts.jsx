import React from 'react';

const SelectedProducts = ({ selectedProducts, onRemoveProduct }) => {
  if (selectedProducts.length === 0) {
    return null;
  }

  return (
    <div className='selected-products'>
      <h4>Produtos selecionados:</h4>
      {selectedProducts.map(item => (
        <div key={item.id} className='selected-product-item'>
          <img 
            src={item.image} 
            alt={item.name}
            className='selected-product-image'
          />
          <div className='selected-product-info'>
            <span className='selected-product-name'>{item.name}</span>
            <span className='selected-product-details'>{item.pack} | Quantidade: {item.quantity}</span>
            <span className='selected-product-price'>{(item.numericPrice * item.quantity).toFixed(2)}€</span>
          </div>
          <button 
            type='button' 
            onClick={() => onRemoveProduct(item.id)}
            className='remove-btn'
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
};

export default SelectedProducts;