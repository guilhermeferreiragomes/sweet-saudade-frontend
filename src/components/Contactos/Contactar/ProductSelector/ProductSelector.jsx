import React from 'react';
import productsData from '../../../../data/productsData.json';

const ProductSelector = ({ 
  currentProduct, 
  setCurrentProduct, 
  currentQuantity, 
  setCurrentQuantity, 
  onAddProduct 
}) => {
  const selectedProductData = currentProduct ? 
    productsData.find(p => p.id === parseInt(currentProduct)) : null;

  const handleQuantityChange = (change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      setCurrentQuantity(newQuantity);
    }
  };

  return (
    <div className="product-section">
      <div className="product-selector-container">
        <div className="form-group">
          <label className="label">Selecionar Produto</label>
          <select 
            className="product-select"
            value={currentProduct}
            onChange={(e) => setCurrentProduct(e.target.value)}
          >
            <option value="">Escolha um produto...</option>
            {productsData.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - {product.pack} - {product.price}
              </option>
            ))}
          </select>
        </div>

        {selectedProductData && (
          <div className="product-preview">
            <img 
              src={selectedProductData.image} 
              alt={selectedProductData.name}
              className="product-preview-image"
            />
            <div className="product-preview-info">
              <h5>{selectedProductData.name}</h5>
              <p>{selectedProductData.pack}</p>
              <p className="product-price">{selectedProductData.price}</p>
            </div>
          </div>
        )}

        <div className="quantity-and-add">
          <div className="quantity-group">
            <label className="label">Quantidade</label>
            <div className="quantity-controls">
              <button 
                type="button" 
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span className="quantity-display">{currentQuantity}</span>
              <button 
                type="button" 
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>

          <button 
            type="button" 
            className="add-product-btn"
            onClick={onAddProduct}
            disabled={!currentProduct}
          >
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;