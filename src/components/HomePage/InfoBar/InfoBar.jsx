import React from 'react'
import './InfoBar.css'
import point from '../../../assets/imagens/location-pointer.png'

const InfoBar = () => {
  return (
    <div className="info-bar" id="infobar">
      <h2>PRIMEIRO E TERCEIRO DOMINGO DE CADA MÊS</h2>
      <div className='link'>
      <a href='https://maps.app.goo.gl/xinGUgv4nxM9CXMG8' target='_blank' rel="noopener noreferrer">

        <p> <img src={point} alt="Location Pointer" className="location-icon" /> Feira da Adroana</p>
    </a>
    </div>
    </div>
  )
}

export default InfoBar
