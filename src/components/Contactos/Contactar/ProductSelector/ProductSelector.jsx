import React from 'react';
import productsData from '../../../../data/productsData.json';

const ProductSelector = ({ 
  selectedProductId, 
  setSelectedProductId, 
  selectedPack, 
  setSelectedPack,
  currentQuantity, 
  setCurrentQuantity, 
  onAddProduct 
}) => {

  // Encontra o produto principal com base no ID do primeiro dropdown
  const selectedProduct = selectedProductId ? 
    productsData.find(p => p.id === parseInt(selectedProductId)) : null;

  // Encontra a opção de pack específica (do segundo dropdown)
  const selectedOption = (selectedProduct && selectedPack) ?
    selectedProduct.packOptions.find(opt => opt.pack === selectedPack) : null;


  // Função para lidar com a mudança do PRIMEIRO dropdown (Produto)
  const handleProductChange = (e) => {
    setSelectedProductId(e.target.value);
    // IMPORTANTE: Limpa a seleção do pack quando o produto muda
    setSelectedPack('');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity >= 1) {
      setCurrentQuantity(newQuantity);
    }
  };

  return (
    <div className="product-section">
      <div className="product-selector-container">
        
        {/* --- DROPDOWN 1: PRODUTOS --- */}
        <div className="form-group">
          {/* "1." removido daqui */}
          <label className="label">Selecione o Produto</label>
          <select 
            className="product-select"
            value={selectedProductId}
            onChange={handleProductChange} // Usa a nova função
          >
            <option value="">Escolha um produto...</option>
            {productsData.map(product => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- DROPDOWN 2: PACKS (SÓ APARECE SE UM PRODUTO ESTIVER ESCOLHIDO) --- */}
        {selectedProduct && (
          <div className="form-group">
            {/* "2." removido daqui */}
            <label className="label">Selecione o Pack</label>
            <select 
              className="product-select"
              value={selectedPack}
              onChange={(e) => setSelectedPack(e.target.value)}
            >
              <option value="">Escolha um pack...</option>
              {selectedProduct.packOptions.map(option => (
                <option key={option.pack} value={option.pack}>
                  {option.pack} - {option.price}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* --- PRÉ-VISUALIZAÇÃO (SÓ APARECE SE O PRODUTO E O PACK ESTIVEREM ESCOLHIDOS) --- */}
        {selectedProduct && selectedOption && (
          <div className="product-preview">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name}
              className="product-preview-image"
            />
            <div className="product-preview-info">
              <h5>{selectedProduct.name}</h5>
              <p>{selectedOption.pack}</p>
              <p className="product-price">{selectedOption.price}</p>
            </div>
          </div>
        )}

        <div className="quantity-and-add">
          <div className="quantity-group">
            {/* "3." removido daqui */}
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
            // Botão só fica ativo se AMBOS os dropdowns estiverem preenchidos
            disabled={!selectedProductId || !selectedPack}
          >
            Adicionar Produto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelector;