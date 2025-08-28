import React from 'react';
import productsData from '../../../../data/productsData.json';

const ProductSelector = ({ 
  currentProduct, 
  setCurrentProduct, 
  currentQuantity, 
  setCurrentQuantity, 
  onAddProduct 
}) => {
  const getCurrentProductData = () => {
    if (currentProduct) {
      return productsData.find(p => p.id === parseInt(currentProduct));
    }
    return null;
  };

  return (
    <div className='product-selector'>
      <div className='form-group product-select-group'>
        <label className='label'>Produto</label>
        <div className='product-selector-container'>
          <select 
            className='input product-select'
            value={currentProduct}
            onChange={(e) => setCurrentProduct(e.target.value)}
          >
            <option value="">Selecione um produto</option>
            {productsData.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} ({product.pack}) - {product.price}
              </option>
            ))}
          </select>
          {getCurrentProductData() && (
            <div className='product-preview'>
              <img 
                src={getCurrentProductData().image} 
                alt={getCurrentProductData().name}
                className='product-preview-image'
              />
              <div className='product-preview-info'>
                <h5>{getCurrentProductData().name}</h5>
                <p>{getCurrentProductData().description}</p>
                <span className='product-price'>{getCurrentProductData().price}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className='quantity-and-add'>
        <div className='form-group quantity-group'>
          <label className='label'>Quantidade</label>
          <div className='quantity-controls'>
            <button 
              type='button' 
              onClick={() => setCurrentQuantity(Math.max(1, currentQuantity - 1))}
              className='quantity-btn'
            >
              -
            </button>
            <span className='quantity-display'>{currentQuantity}</span>
            <button 
              type='button' 
              onClick={() => setCurrentQuantity(currentQuantity + 1)}
              className='quantity-btn'
            >
              +
            </button>
          </div>
        </div>
        <button 
          type='button' 
          onClick={onAddProduct}
          className='add-product-btn'
          disabled={!currentProduct}
        >
          ADICIONAR
        </button>
      </div>
    </div>
  );
};

export default ProductSelector;