import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Contactos from './pages/Contactos'
import Products from './pages/Products'
import ScrollToTop from './components/Hooks/ScrollToTop'
import ProductDetail from './components/Produtcs/ProductDetail/ProductDetail'
import SobreNos from './pages/SobreNos'

const App = () => {
  return (
    <div>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/produtos/:slug" element={<ProductDetail />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
        </Routes>
      </Router>
      
    </div>
  )
}

export default App
