import React from 'react';
import './home.css';
import Carousel from '../../components/mui_carousel/Carousel';
import Footer from '../../components/footer/Footer';
import Product from '../../components/product/Prduct';
const Home = () => {
  return (
    <div className='homePage'>
      <Carousel />
      <div className='homeSection'>
          <h2>Latestn Products</h2>
          <div className='productCon'>
              <Product img="/phone.webp" />
              <Product img="/camera.jpg" />
              <Product img="/phone.webp" />
              <Product img="/camera.jpg" />

          </div>
          <h2>Upcoming Products</h2>
          <div className='productCon'>
              <Product img="/phone.webp" />
              <Product img="/camera.jpg" />
              <Product img="/phone.webp" />
              <Product img="/camera.jpg" />
          </div>
      </div>
      <Footer />
      
    </div>
  )
}

export default Home