import React from 'react';
import './AboutUs.css';
import andreines from '../../assets/imagens/andre_e_ines.webp';
import cliente from '../../assets/imagens/rapaz_sorrir.webp';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <div className='aboutus-container'>
      <div className='aboutus-section'>
        <div className='section-content'>
          <div className='content-text'>
            <h1 className='section-title'>
              A NOSSA{" "}
              <span className="relative">
                HISTÓRIA
                <svg
                  viewBox="0 0 286 73"
                  fill="none"
                  className="circle1"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 1.25,
                      ease: "easeInOut",
                    }}
                    d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                    stroke="#EBB104"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h1>
            <p>Um sonho que nasceu do desejo de compartilhar a rica e diversa cultura gastronómica de Portugal com o mundo.</p>
            <p>A nossa história começou com uma paixão familiar por ingredientes autênticos e sabores tradicionais, passados de geração em geração.</p>
            <p>Hoje, essa paixão transforma-se em cada prato que criamos, trazendo um pedaço de Portugal para a sua mesa.</p>
          </div>
          <div className='content-image'>
            <img className='andreines-image' src={andreines} alt='André e Inês' />
          </div>
        </div>
      </div>

      <div className='aboutus-section alternate'>
        <div className='section-content'>
          <div className='content-image'>
            <img src={cliente} alt='Cliente' className='cliente-image' />
          </div>
          <div className='content-text'>
            <h2 className='section-title'>
              A NOSSA{" "}
              <span className="relative">
                MISSÃO
                <svg
                  viewBox="0 0 400 100"
                  fill="none"
                  className="circle2"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 1.25,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                    stroke="#EBB104"
                    strokeWidth="3"
                  />
                </svg>
              </span>
            </h2>
            <p>Inspirados pela saudade dos aromas das tascas e mercados portugueses, decidimos trazer um pedacinho de Portugal até você.</p>
            <p>Cada receita é uma viagem aos sabores autênticos de Portugal, preparada com ingredientes cuidadosamente selecionados.</p>
            <p>Na Sweet Saudade, não vendemos apenas comida, oferecemos uma experiência culinária que celebra a cultura e a tradição portuguesa.</p>
            <Link to="/produtos">
              <button className='aboutus-btn'>OS NOSSOS PRODUTOS</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;