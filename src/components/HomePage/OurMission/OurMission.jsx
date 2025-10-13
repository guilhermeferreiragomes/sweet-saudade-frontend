import React from 'react'
import { Link } from 'react-router-dom'
import './OurMission.css'
import ourMission from '../../../assets/imagens/a_nossa_missao.png'

const OurMission = () => {
  return (
    <div className='ourMission-section'>
      <img src={ourMission} alt='Nossa Missão' />
        <div className='ourMission-text'>
            <h2>A NOSSA MISSÃO</h2>
            <p>
              A Sweet Saudade nasceu do amor por Portugal e pelo prazer de partilhar momentos
              que ficam no coração. <br />
              Aqui, os sabores contam histórias e cada detalhe é preparado com carinho, para que o
              seu dia termine com uma doce saudade, daquelas que aquecem a alma e despertam um sorriso.
            </p>
            <Link to="/sobre-nos">
              <button className='about-us-btn'>SOBRE NÓS <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"/></svg></button>
            </Link>
        </div>
    </div>
  )
}

export default OurMission