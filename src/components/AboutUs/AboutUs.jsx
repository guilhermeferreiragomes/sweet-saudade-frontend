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
              A NOSSA HISTÓRIA
              <svg
                viewBox="10 -15 120 90"
                fill="none"
                className="circle1"
                z-index="2900"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{
                    duration: 1.25,
                    ease: "easeInOut",
                  }}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke="#EBB104"
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
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
                  viewBox="12 5 90 80"
                  fill="none"
                  className="circle2"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                      d="M20 10
                       C28 10, 28 30, 20 30
                       C12 30, 12 10, 20 10
                       M20 12
                       C22 18, 18 22, 20 28"
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