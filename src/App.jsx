import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Contactos from './pages/Contactos'
import Products from './pages/Products'
import ScrollToTop from './components/Hooks/ScrollToTop'
import ProductDetail from './components/Produtcs/ProductDetail/ProductDetail'
import SobreNos from './pages/SobreNos'
import Cookies from './components/Common/Cookies/Cookies'
import Privacidade from './components/Politics/Privacidade/Privacidade'
import Termos from './components/Politics/T&C/termos'
import RouteChangeTracker from './components/Analytics/RouteChangeTracker'

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <RouteChangeTracker />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:slug" element={<ProductDetail />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path='/politica-de-privacidade' element={<Privacidade />} />
          <Route path='termos-e-condicoes' element={<Termos />} />
        </Routes>
        <Cookies />
      </Router>
      
    </div>
  )
}

export default App