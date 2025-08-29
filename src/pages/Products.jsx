import Navbar from '../components/Common/Navbar/Navbar'
import Footer from '../components/Common/Footer/Footer'
import ProductsPage from '../components/Produtcs/ProductsPage'
import ScrollToTopButton from '../components/Common/ScrollToTopButton/ScrollToTopButton'


import React from 'react'

const Products = () => {
  return (
    <div>
      <Navbar />
      <ProductsPage />
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}

export default Products
