import React from 'react'
import './InfoBar.css'
import point from '../../../assets/imagens/location-pointer.png'

const InfoBar = () => {
  return (
    <div className="info-bar" id="infobar">
      <h2>PRIMEIRO E ÚLTIMO FIM DE SEMANA DE CADA MÊS</h2>
      <div className='link'>
      <a href='https://www.cascais.pt/area/mercado-da-vila-um-centro-de-vida-em-cascais' target='_blank' rel="noopener noreferrer">
        
        <p> <img src={point} alt="Location Pointer" className="location-icon" /> Mercado da Vila de Cascais</p>
    </a>
    </div>
    </div>
  )
}

export default InfoBar
