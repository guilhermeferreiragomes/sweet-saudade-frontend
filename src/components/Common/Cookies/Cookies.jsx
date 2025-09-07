import React from 'react'
import CookieConsent from "react-cookie-consent";
import './Cookies.css';

const Cookies = () => {
  
  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem('cookies-accepted', 'false');
    window.location.reload();
  };

  return (
    <div className='cookies-container'>
        <CookieConsent
            location="bottom"
            buttonText="Aceitar"
            declineButtonText="Rejeitar"
            cookieName="CookieConsent"
            onAccept={handleAccept}
            onDecline={handleDecline}
            enableDeclineButton
            expires={150}
            buttonWrapperClasses="cookie-buttons-wrapper"
            contentClasses="cookie-content"
        >
           <span className="cookie-text">
             🍪 Utilizamos cookies para melhorar a sua experiência, segurança e análise do tráfego.{" "}
             <a href="/politica-privacidade">
               Saiba mais
             </a>
           </span>
        </CookieConsent>
    </div>
  )
}

export default Cookies