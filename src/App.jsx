import React, { useEffect } from 'react';
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
import DeliveryAddress from './pages/delivery_address_page/Delivery';
import ConfirmOrder from './pages/confirm_order/Confirm_order';
import Payment from './pages/payment_page/Payment_page';
import Dashboard from './admin/dashboard/Dashboard';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch,useSelector } from 'react-redux';
import { getUser } from './redux/action/auth_action';
import { Navigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const {authenticated,user} = useSelector(state=>state.authentication);
  
  useEffect(()=>{
    dispatch(getUser());
  },[dispatch,authenticated]);

  return (

    <div className='appCon'> 
    <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/search" element={<Search />}/>
          <Route path="/product/:id" element={<SinglePage />}/>

          <Route path="/login" element={authenticated ?  <Navigate to="/profile" /> : <Login/>}/>

          {/* Only Logged in User  */}
          
          <Route path="/cart" element={authenticated ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/wishlist" element={authenticated ? <Wishlist /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/update/profile" element={authenticated ? <UpdateProfile /> : <Navigate to="/login" />} />
          <Route path="/order" element={authenticated ? <Order /> : <Navigate to="/login" />} />
          <Route path="/change/password" element={authenticated ? <ChangePass /> : <Navigate to="/login" />} />
          <Route path="/delivery/address" element={authenticated && user.cart && user.cart.length > 0 ? <DeliveryAddress /> : <Navigate to="/cart" />} />
          <Route path="/confirm/order" element={authenticated && user.cart && user.cart.length > 0 ? <ConfirmOrder /> : <Navigate to="/login" />} />
          {/* <Route path="/delivery/payment" element={authenticated ? <Payment /> : <Navigate to="/login" />} /> */}
          <Route path="/admin/dashboard" element={authenticated  ? <Dashboard /> : <Navigate to="/login" />} />

          {/* <Route path="/check" element={< Confirm_order  />}/> */}
        </Routes>
    </div>
    
  )
}

export default App
