import React from 'react'
import './OurProducts.css'
import line from '../../../assets/imagens/line.png'
import bolaBerlim from '../../../assets/imagens/bola_berlim.png'
import pastelNata from '../../../assets/imagens/pastel_de_nata.png'
import croquetes from '../../../assets/imagens/3_croquetes.png'


const OurProducts = () => {
  return (
    <div className='our-products'>
      <h2 className='our-products-title'>OS NOSSOS DESTAQUES</h2>
      <img src={line} alt="Linha" className='linha' />
      <div className='produtos'>
        <img src={bolaBerlim} alt="Bola de Berlim" className='bola-berlim' />
        <img src={pastelNata} alt="Pastel de Nata" className='pastel-nata' />
        <img src={croquetes} alt="Croquetes" className='croquetes' />
      </div>
      <button className='mais-produtos'>MAIS PRODUTOS</button>
    </div>
  )
}

export default OurProducts
