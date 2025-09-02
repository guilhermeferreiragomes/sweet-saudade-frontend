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
                Na Sweet Saudade, queremos mais do que servir café — queremos despertar memórias. Levamos os sabores e afetos de Portugal a cada esquina, numa experiência onde tradição e calor humano andam de mãos dadas. <br />
                A nossa missão é criar um espaço onde cada visita seja uma viagem ao coração de Portugal, repleta de sorrisos, aromas e histórias que aquecem a alma. Queremos que cada cliente se sinta em casa, rodeado por sabores que falam de amor e tradição.
            </p>
            <Link to="/sobre-nos">
              <button className='about-us-btn'>SOBRE NÓS <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"/></svg></button>
            </Link>
        </div>
    </div>
  )
}

export default OurMission