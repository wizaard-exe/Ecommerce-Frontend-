import React, { useEffect, useState } from 'react';
import './home.css';
import Carousel from '../../components/mui_carousel/Carousel';
import Footer from '../../components/footer/Footer';
import Product from '../../components/product/Prduct';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Loader from '../../components/loader/loader';
import {toast} from 'react-toastify';
import toastOption from '../../utils/toastOption';
import { useSelector } from 'react-redux';


const Home = () => {


const {authenticated} = useSelector(state=>state.authentication);

const [products,setProducts] = useState([]);
const [loading,setLoading] = useState(false);
const [error,setError] = useState(null);


const getData = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(`${import.meta.env.VITE_DOMAIN}/products`);
    if (data.product) {
      setProducts(data.product);
      setLoading(false);
      setError(null);
    }
  } catch (e)
  {
    toast.dismiss();
    toast.error(e.message, toastOption);
    setLoading(false); 
    setError(e);
  }
};

useEffect(() => {
  getData();
}, []);

  return (
    <div className='homePage'>
      <Helmet>
          <title>SuperBuy Online Shopping</title>
      </Helmet>
      <Carousel />

      <div className='homeSection'>
          <h2>Latest Products</h2>
              <div className='productCon'>
                  {loading ? <Loader /> : 
                    products.length > 0 && products.slice(0,4).map((product,key) => (
                        <Product key={key} {...product} />
                    ))
                }
              </div>
    
          <h2>Upcoming Products</h2>
          <div className='productCon'>
            
              {loading ? <Loader />: products.length > 0 && products.slice(0,4).map((product,key) => (
                  <Product key={key} {...product} />
              ))}
          </div>
      </div>

      <Footer />
      
    </div>
  )
}

export default Home