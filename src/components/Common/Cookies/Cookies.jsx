import React, { useEffect } from 'react'
import CookieConsent from "react-cookie-consent";

const Cookies = () => {
  
  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    // Recarregar para ativar funcionalidades
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem('cookies-accepted', 'false');
    // Recarregar para desativar funcionalidades
    window.location.reload();
  };

  return (
    <div className='cookies-container'>
        <CookieConsent
            location="bottom"
            buttonText="Aceitar"
            declineButtonText="Rejeitar"
            declineButtonStyle={{ 
              background: "#4e503b", 
              color: "#fff",  
              fontSize: "14px", 
              borderRadius: "5px", 
              padding: "10px 20px", 
              marginLeft: "10px" 
            }}
            cookieName="CookieConsent"
            style={{ 
              background: "#262724", 
              height: "80px", 
              display: "flex", 
              alignItems: "center", 
              fontSize: "17px" 
            }}
            buttonStyle={{ 
              background:"#EBB104", 
              color: "#4e503b", 
              fontSize: "14px", 
              borderRadius: "5px", 
              padding: "10px 20px" 
            }}
            expires={150}
            enableDeclineButton
            onAccept={handleAccept}
            onDecline={handleDecline}
        >
           🍪 Utilizamos cookies para melhorar a sua experiência, segurança e análise do tráfego.{" "} 
           <a href="/politica-privacidade" style={{color: '#EBB104', textDecoration: 'underline', fontSize: '14px'}}>
             Saiba mais
           </a>
        </CookieConsent>
    </div>
  )
}

export default Cookies