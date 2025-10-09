import React from 'react'
import '../Politics.css'
import Navbar from '../../Common/Navbar/Navbar'
import Footer from '../../Common/Footer/Footer'

const Privacidade = () => {
  return (
    <div className='politics-container'>
    <Navbar />
      <div className='politics-title'>
        <h2>Política de Privacidade</h2>
      </div>
      <div className='politics-text'>
        <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}</p>
        
        <h3>1. Introdução</h3>
        <p>A Sweet Saudade compromete-se a proteger a sua privacidade. Esta Política de Privacidade explica como recolhemos, usamos, partilhamos e protegemos as suas informações pessoais quando visita o nosso website ou utiliza os nossos serviços.</p>

        <h3>2. Informações que Recolhemos</h3>
        <p><strong>Informações fornecidas diretamente por si:</strong></p>
        <ul>
          <li>Nome e apelido</li>
          <li>Endereço de email</li>
          <li>Informações de contacto (telefone, se fornecido)</li>
          <li>Detalhes das encomendas e preferências de produtos</li>
          <li>Mensagens enviadas através do formulário de contacto</li>
          <li>Opiniões e feedback submetidos no formulário de avaliação</li>
        </ul>

        <p><strong>Informações recolhidas automaticamente:</strong></p>
        <ul>
          <li>Dados de navegação (páginas visitadas, tempo de permanência)</li>
          <li>Endereço IP e informações do dispositivo</li>
          <li>Cookies e tecnologias similares</li>
        </ul>

        <h3>3. Como Utilizamos as Suas Informações</h3>
        <p>Utilizamos as suas informações para:</p>
        <ul>
          <li>Processar e responder às suas encomendas</li>
          <li>Comunicar consigo sobre produtos e serviços</li>
          <li>Melhorar a experiência do nosso website</li>
          <li>Cumprir obrigações legais</li>
          <li>Prevenir fraudes e garantir a segurança</li>
          <li>Analisar feedback e melhorar os nossos serviços</li>
        </ul>

        <h3>4. Formulário de Opiniões</h3>
        <p>O nosso website inclui um formulário onde os utilizadores podem deixar a sua opinião sobre os nossos produtos e serviços.</p>
        <ul>
          <li><strong>Dados recolhidos:</strong> Nome, endereço de email e mensagem</li>
          <li><strong>Finalidade:</strong> Avaliar a satisfação do cliente, melhorar os nossos serviços e responder a questões ou sugestões</li>
          <li><strong>Armazenamento:</strong> Estes dados são armazenados com acesso restrito à equipa da Sweet Saudade</li>
          <li><strong>Período de retenção:</strong> Mantemos estes dados por até 24 meses, após os quais são anonimizados ou eliminados</li>
          <li><strong>Consentimento:</strong> Ao submeter o formulário, consente com o processamento destes dados conforme descrito nesta política</li>
        </ul>
        <p>Para solicitar a eliminação do seu feedback ou modificação dos seus dados, contacte-nos através do email disponível na secção de contacto.</p>

        <h3>5. Partilha de Informações</h3>
        <p>A Sweet Saudade não vende, aluga ou partilha as suas informações pessoais com terceiros, exceto:</p>
        <ul>
          <li>Com o seu consentimento explícito</li>
          <li>Para cumprir obrigações legais</li>
          <li>Com prestadores de serviços que nos ajudam a operar (ex: serviços de email)</li>
          <li>Em caso de transferência de negócio</li>
        </ul>

        <h3>6. Cookies</h3>
        <p>Utilizamos cookies para:</p>
        <ul>
          <li>Garantir o funcionamento adequado do website</li>
          <li>Analisar o tráfego e melhorar os nossos serviços</li>
          <li>Personalizar a sua experiência</li>
        </ul>
        <p>Pode gerir as suas preferências de cookies nas configurações do seu navegador.</p>

        <h3>7. Segurança dos Dados</h3>
        <p>Implementamos medidas técnicas e organizacionais adequadas para proteger as suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>

        <h3>8. Os Seus Direitos</h3>
        <p>Tem o direito de:</p>
        <ul>
          <li>Aceder aos seus dados pessoais</li>
          <li>Retificar informações incorretas</li>
          <li>Solicitar a eliminação dos seus dados</li>
          <li>Opor-se ao processamento dos seus dados</li>
          <li>Retirar o consentimento a qualquer momento</li>
        </ul>

        <h3>9. Retenção de Dados</h3>
        <p>Mantemos as suas informações pessoais apenas pelo tempo necessário para cumprir os fins descritos nesta política ou conforme exigido por lei.</p>

        <h3>10. Transferências Internacionais</h3>
        <p>Os seus dados podem ser transferidos e processados em países fora da União Europeia. Garantimos que essas transferências cumprem os requisitos de proteção de dados aplicáveis.</p>

        <h3>11. Menores de Idade</h3>
        <p>Os nossos serviços não se destinam a menores de 16 anos. Não recolhemos conscientemente informações pessoais de menores sem o consentimento dos pais ou tutores.</p>

        <h3>12. Alterações a Esta Política</h3>
        <p>Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através do nosso website ou por email.</p>

        <h3>13. Contacto</h3>
        <p>Para questões sobre esta Política de Privacidade ou os seus dados pessoais, contacte-nos:</p>
        <ul>
          <li><strong>Email:</strong> sweetsaudade@gmail.com</li>
          <li><strong>Telefone:</strong> +351 912 345 678</li>
        </ul>

        <p><em>Esta Política de Privacidade está em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a legislação portuguesa aplicável.</em></p>
      </div>
      <Footer />
    </div>
  )
}

export default Privacidade