import React from 'react'
import './aboutus.css'
import  andreines from '../../assets/imagens/andre_e_ines.webp'

const AboutUs = () => {
  return (
    <div className='aboutus-container'>
      <div class="parent">
        <div class="div1">
          <img src={andreines} className='andreines-img'></img>

        </div>
        <div class="div2"> 
          <div>
            <h1 className='historia-titulo'>A NOSSA HISTÓRIA</h1>
            <p className='historia-texto'>Inspirada na palavra “saudade” - esse sentimento tão português que liga corações,
                lugares e recordações, a Sweet Saudade é mais do que um espaço: é uma
                homenagem à essência de Portugal, às suas tradições e à arte de saborear a vida
                com calma e prazer.
                Na Sweet Saudade encontra delícias únicas e saborosas e, sobretudo, encontra
                amor.
                É com o máximo carinho que preparamos cada produto, para que possa alegrar o
                seu dia e o de quem o rodeia.
                Queremos que, no final do dia, sinta saudade — mas uma doce saudade, daquelas
                que aquecem o coração e deixam um sorriso de gratidão.
                Presencialmente, oferecemos sorrisos, abraços e conversas sinceras.
                Mais do que um espaço, somos um lugar de magia, feito de momentos simples,
                partilhados com quem nos visita.
              </p>
          </div>
        </div>
        <div class="div3"> </div>
        <div class="div4"> </div>
      </div>        
      </div>
      
  )
}

export default AboutUs
