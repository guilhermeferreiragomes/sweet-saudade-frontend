import React from 'react'
import CookieConsent from "react-cookie-consent";


const Cookies = () => {
  return (
    <div className='cookies-container'>
        <CookieConsent
            location="bottom"
            buttonText="Aceitar"
            declineButtonText="Rejeitar"
            declineButtonStyle={{ background: "#4e503b", color: "#fff",  fontSize: "14px", borderRadius: "5px", padding: "10px 20px", marginLeft: "10px" }}
            cookieName="CookieConsent"
            style={{ background: "#262724", height: "80px", display: "flex", alignItems: "center", fontSize: "17px" }}
            buttonStyle={{ background:"#EBB104", color: "#4e503b", fontSize: "14px", borderRadius: "5px", padding: "10px 20px" }}
            expires={150}
            enableDeclineButton
            >
           🍪 Este site utiliza cookies para podermos melhorar a sua experiência e a sua segurança.
        </CookieConsent>
      
    </div>
  )
}

export default Cookies
