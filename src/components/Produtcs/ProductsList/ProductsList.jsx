import React from 'react'
import productsData from '../../../data/productsData'
import './ProductsList.css'
import { Link } from 'react-router-dom'

const ProductsList = () => {
  return (
    <div className='ProductsList-container'>
        <div className='ProductsList'>
            <div className='Product'>
                {productsData.map((product) => {
                    
                    // --- LÓGICA DE EXIBIÇÃO ATUALIZADA ---
                    // Tenta obter o segundo pack (índice 1, ex: Caixa)
                    const packOption = product.packOptions && product.packOptions.length > 1 
                        ? product.packOptions[1]
                        // Se não existir, usa o primeiro (índice 0, ex: Unitário)
                        : product.packOptions && product.packOptions.length > 0
                            ? product.packOptions[0]
                            // Como fallback, se não houver packOptions
                            : null;
                    
                    // Define o texto com base no que foi encontrado
                    const packText = packOption ? packOption.pack : (product.pack || ''); // Fallback final
                    const priceText = packOption ? packOption.price : (product.defaultPrice || product.price || 'Em breve'); // Fallback final
                    // --- FIM DA ATUALIZAÇÃO ---
                    
                    return (
                        <div key={product.id} className='Product-card'>
                            <Link to={`/produtos/${product.slug}`}>
                                <img src={product.image} alt={product.name} className='Product-image' />
                                <h3 className='Product-name'>{product.name}</h3>
                                <p className='Product-pack'>{packText}</p>
                                <h4 className='Product-price'>{priceText}</h4>
                            </Link>
                            <Link to={`/produtos/${product.slug}`}>
                                <button className='Add-to-cart-button'>SABER MAIS</button>
                            </Link>
                        </div>
                    );
                })}   
            </div>
        </div>
    </div>
  )
}

export default ProductsList