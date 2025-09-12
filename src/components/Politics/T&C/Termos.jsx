import React from 'react'
import '../Politics.css'
import Navbar from '../../Common/Navbar/Navbar'
import Footer from '../../Common/Footer/Footer'

const Termos = () => {
  return (
    <div className='politics-container'>
    <Navbar />
      <div className='politics-title'>
        <h2>Termos e Condições</h2>
      </div>
      <div className='politics-text'>
        <p><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}</p>
        
        <h3>1. Aceitação dos Termos</h3>
        <p>Ao aceder e utilizar o website da Sweet Saudade, concorda em ficar vinculado a estes Termos e Condições. Se não concorda com qualquer parte destes termos, não deve utilizar os nossos serviços.</p>

        <h3>2. Sobre a Sweet Saudade</h3>
        <p>A Sweet Saudade é uma empresa especializada na produção e comercialização de doces tradicionais portugueses. Oferecemos produtos artesanais de alta qualidade através do nosso website e sistemas de encomenda.</p>

        <h3>3. Uso do Website</h3>
        <p><strong>Uso permitido:</strong></p>
        <ul>
          <li>Navegar e consultar informações sobre produtos</li>
          <li>Fazer encomendas através do formulário disponível</li>
          <li>Contactar-nos para esclarecimentos</li>
          <li>Partilhar conteúdo nas redes sociais</li>
        </ul>

        <p><strong>Uso proibido:</strong></p>
        <ul>
          <li>Utilizar o website para fins ilegais</li>
          <li>Transmitir vírus ou código malicioso</li>
          <li>Violar direitos de propriedade intelectual</li>
          <li>Fazer engenharia reversa do website</li>
        </ul>

        <h3>4. Produtos e Preços</h3>
        <p>Os produtos apresentados no website estão sujeitos a disponibilidade. Os preços podem ser alterados sem aviso prévio. Todos os preços incluem IVA à taxa legal em vigor.</p>

        <h3>5. Encomendas</h3>
        <p><strong>Processo de encomenda:</strong></p>
        <ul>
          <li>Selecione os produtos desejados no formulário</li>
          <li>Preencha os seus dados de contacto</li>
          <li>Aguarde a nossa confirmação por email</li>
          <li>Confirme os detalhes e forma de pagamento</li>
        </ul>

        <p><strong>Confirmação:</strong> Todas as encomendas estão sujeitas à nossa confirmação e aceitação. Reservamo-nos o direito de recusar encomendas.</p>

        <h3>6. Pagamento</h3>
        <p>O pagamento será acordado após confirmação da encomenda. Aceitamos diferentes métodos de pagamento que serão comunicados no momento da confirmação.</p>

        <h3>7. Entrega</h3>
        <p>Os prazos e condições de entrega serão comunicados após confirmação da encomenda. A Sweet Saudade compromete-se a cumprir os prazos acordados, salvo circunstâncias excecionais.</p>

        <h3>8. Política de Devolução</h3>
        <p>Devido à natureza perecível dos nossos produtos alimentares:</p>
        <ul>
          <li>Devoluções apenas em caso de produto defeituoso</li>
          <li>Reclamações devem ser feitas no prazo de 24 horas</li>
          <li>Produtos devem estar nas condições originais</li>
        </ul>

        <h3>9. Propriedade Intelectual</h3>
        <p>Todo o conteúdo do website (textos, imagens, logótipos, receitas) é propriedade da Sweet Saudade e está protegido por direitos de autor. É proibida a reprodução sem autorização.</p>

        <h3>10. Limitação de Responsabilidade</h3>
        <p>A Sweet Saudade não se responsabiliza por:</p>
        <ul>
          <li>Danos indiretos ou consequenciais</li>
          <li>Perda de dados ou lucros</li>
          <li>Interrupções do website por motivos técnicos</li>
          <li>Reações alérgicas (consulte sempre os ingredientes)</li>
        </ul>

        <h3>11. Informações Sobre Alergénios</h3>
        <p>Os nossos produtos podem conter alergénios. Informações detalhadas estão disponíveis mediante solicitação. Clientes com alergias devem informar-nos antes da encomenda.</p>

        <h3>12. Proteção de Dados</h3>
        <p>O tratamento dos seus dados pessoais está descrito na nossa Política de Privacidade, que faz parte integrante destes termos.</p>

        <h3>13. Alterações aos Termos</h3>
        <p>Reservamo-nos o direito de alterar estes termos a qualquer momento. As alterações entram em vigor imediatamente após publicação no website.</p>

        <h3>14. Resolução de Conflitos</h3>
        <p>Em caso de litígio, tentaremos uma resolução amigável. Se não for possível, aplicar-se-á a legislação portuguesa e a jurisdição dos tribunais portugueses.</p>

        <h3>15. Contacto</h3>
        <p>Para esclarecimentos sobre estes termos:</p>
        <ul>
          <li><strong>Email:</strong> sweetsaudade@gmail.com</li>
          <li><strong>Telefone:</strong> +351 912 345 678</li>
        </ul>

        <h3>16. Disposições Gerais</h3>
        <p>Se alguma cláusula destes termos for considerada inválida, as restantes permanecem em vigor. Estes termos constituem o acordo completo entre as partes.</p>

        <p><em>Estes Termos e Condições estão em conformidade com a legislação portuguesa e comunitária aplicável.</em></p>
      </div>
    <Footer />
    </div>
  )
}

export default Termos