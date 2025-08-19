import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Contactos from './pages/Contactos'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contactos" element={<Contactos />} />

        </Routes>
      </Router>
      
    </div>
  )
}

export default App
