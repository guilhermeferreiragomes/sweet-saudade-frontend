import Navbar from '../components/Common/Navbar/Navbar'
import Footer from '../components/Common/Footer/Footer'
import Contactar from '../components/Contactos/Contactar/Contactar'
import ScrollToTopButton from '../components/Common/ScrollToTopButton/ScrollToTopButton'



import React from 'react'

const Contactos = () => {
  return (
    <div>
      <Navbar />
      <Contactar />
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default Contactos
