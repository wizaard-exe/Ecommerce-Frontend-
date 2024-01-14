import React from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Home from './pages/home_page/Home';
import Navbar from './components/navbar/Navbar';
import Search from './pages/search_page/Search';
import SinglePage from './pages/singlePage/Single_page';
import Login from './pages/login_page/Login';
import Cart from './pages/cart_page/Cart';
import Wishlist from './pages/wishlist_page/Wishlist';
import Profile  from './pages/profile_page/Profile';
import UpdateProfile from './pages/update_profile/UpdateProfile';
import Order from './pages/order_page/Order';
import ChangePass from './pages/change_pass/ChangePass';
import SelectBox from './components/selectBox/SelectBox';
function App() {


  return (
    <div className='appCon'> 
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/product/:id" element={<SinglePage />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/update/profile" element={< UpdateProfile />}/>
          <Route path="/order" element={< Order />}/>
          <Route path="/change/password" element={< ChangePass  />}/>
          <Route path="/check" element={<SelectBox />}/>
        </Routes>
    </div>
  )
}

export default App
