import { React, useState } from 'react'
import Modal from 'react-modal';
import './ReviewsPopup.css'

const ReviewsPopup = () => {

    const [visible, setVisible] = useState(false)

  return (
    <div>
      <div className='form-popup'>
      <button onClick={() => setVisible(true)} className='popup-button'>
        <p>Deixe-nos a sua opinião!</p>
      </button>
      <Modal isOpen={visible} onRequestClose={() => setVisible(false)}>
        <form>
            
        </form>
      </Modal>
      </div>
    </div>
  )
}

export default ReviewsPopup
