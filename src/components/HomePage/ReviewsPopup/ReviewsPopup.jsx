import { React, useState } from 'react'
import Modal from 'react-modal';
import './ReviewsPopup.css'

// É importante definir o elemento raiz da aplicação para acessibilidade
Modal.setAppElement('#root'); // Ajuste para o ID do seu elemento raiz se for diferente

const ReviewsPopup = () => {
  const [visible, setVisible] = useState(false)

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Background escuro semi-transparente
      zIndex: 1000
    },
  };

  return (
    <div>
      <div className='form-popup'>
        <button onClick={() => setVisible(true)} className='popup-button'>
          <p>Deixe-nos a sua opinião!</p>
        </button>
        <Modal className="formulario"
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={customStyles}
        >
            <form className="reviews-form">
              <div className="reviews-form-group">
                <label className="reviews-label">Nome</label>
                <input type='text' className="reviews-input" />
              </div>
              <div className="reviews-form-group">
                <label className="reviews-label">Email</label>
                <input type='email' className="reviews-input" />
              </div>
              <div className="reviews-form-group">
                <label className="reviews-label">Mensagem</label>
                <textarea className="reviews-textarea" />
              </div>
              <div className="reviews-form-group">
                <button type="submit" className="reviews-submit-btn">
                  Enviar
                </button>
              </div>
            </form>
        </Modal>
      </div>
    </div>
  )
}

export default ReviewsPopup
