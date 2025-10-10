import { React, useState } from 'react'
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './ReviewsPopup.css'

Modal.setAppElement('#root');
const ReviewsPopup = () => {
  const [visible, setVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000
    },
    content: {
      backgroundColor: '#f4c430',
      padding: '30px',
      borderRadius: '15px',
      maxWidth: '550px',
      width: '90%',
      margin: '0 auto',
      position: 'relative',
      inset: 'auto',
      border: 'none'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = "https://script.google.com/macros/s/AKfycbwsHt5MEJzgOvmRVoonN-jn3PCEuzDOr0KlVfrCLnHIFrGtJKXZsZhqPCJZ6U0yZ9AipQ/exec";
    
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Name=${e.target.nome.value}&Email=${e.target.email.value}&Mensagem=${e.target.mensagem.value}`
    })
    .then(res => res.text())
    .then(data => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      
      e.target.reset();
      
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setSubmitStatus(null), 300);
      }, 2000);
    })
    .catch(error => {
      console.log(error);
      setSubmitStatus("error");
      setIsSubmitting(false);
    });
  }

  return (
    <div>
      <div className='form-popup'>
        <button onClick={() => setVisible(true)} className='popup-button'>
          <p>Deixe-nos a sua opinião!</p>
        </button>
        <Modal 
          className="formulario"
          isOpen={visible}
          onRequestClose={() => setVisible(false)}
          style={customStyles}
        >
          <button 
            className="close-button" 
            onClick={() => setVisible(false)}
            aria-label="Fechar"
          >
            &times;
          </button>
          
          {submitStatus === "success" ? (
            <div className="reviews-success-message">
              <p>Obrigado pela sua opinião!</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="reviews-form">
                <div className="reviews-form-group">
                  <label className="reviews-label">Nome</label>
                  <input type='text' name="nome" className="reviews-input" required />
                </div>
                <div className="reviews-form-group">
                  <label className="reviews-label">Email</label>
                  <input type='email' name="email" className="reviews-input" required />
                </div>
                <div className="reviews-form-group">
                  <label className="reviews-label">Mensagem</label>
                  <textarea name="mensagem" className="reviews-textarea" required />
                </div>
                {submitStatus === "error" && (
                  <div className="reviews-error-message">
                    <p>Ocorreu um erro. Por favor, tente novamente mais tarde.</p>
                  </div>
                )}
                <div className="reviews-form-group">
                  <button 
                    type="submit" 
                    className="reviews-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </form>
              <div className="privacy-note">
                Ao enviar, concorda com a nossa <Link to="/politica-de-privacidade" onClick={() => setVisible(false)}>Política de Privacidade</Link>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default ReviewsPopup