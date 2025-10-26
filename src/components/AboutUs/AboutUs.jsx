import React from 'react'
import './aboutus.css'
import andreines from '../../assets/imagens/andre_e_ines.webp'
import { motion } from 'framer-motion'

const AboutUs = () => {
  return (
    <div className='aboutus-container'>
      <div className="parent">
        <div className="div1">
          <img src={andreines} className='andreines-img' alt="André e Inês" />
        </div>

        <div className="div2">
          <div>
            <div className="historia-header">
              <h1 className='historia-titulo'>A NOSSA HISTÓRIA</h1>
              <motion.svg
                className='coracao-tiny'
                viewBox="0 0 24 24"
                width="18"
                height="18"
                initial={{ opacity: 1 }}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#EBB104"
                  strokeWidth="2.7"
                  fill="none"
                />
              </motion.svg>
            </div>
            <p className='historia-texto'>
              Inspirada na palavra “saudade” - esse sentimento tão português que liga corações,
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

        <div className="div3"> </div>
        <div className="div4"> </div>
      </div>
    </div>
  )
}

export default AboutUs