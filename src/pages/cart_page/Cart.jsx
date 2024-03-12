import React, { useEffect, useState } from 'react'
import './cart.css';
import './responsive.css';
import { CartTemp } from './CartTemp';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {useSelector} from "react-redux";

const Cart = () => {


    const {user} = useSelector(state=>state.authentication);
    const navigate = useNavigate();

    const [subTotal,setSubTotal]= useState(0);
    const [shipingCharges,setShippingCharges]= useState(149);

    useEffect(()=>
    {
        if(user && user.cart)
        {
            const calculateSubt = user.cart.reduce((total,product)=>{return total+(product.price * product.quantity)},0);
            setSubTotal(calculateSubt);  
        }
    },[user.cart]);


    return (
    <div className='cartPage' >
        <Helmet>
            <title>Cart Items</title>
        </Helmet>

        {user.cart && user.cart.length > 0 ? (
        <div className='cartCon'>

            <div className="left">
                {user.cart.map((product,key)=>(
                    <CartTemp key={key} product={product} />
                ))}
            </div>

            <div className="right">
                <div>
                    <span>Num of Items: </span>
                    <span>{user.cart.length}</span>
                </div>

                <div>
                    <span>Total Amount: </span>
                    <span>{`₹${subTotal}`}</span>
                </div>
                <button onClick={()=>navigate("/delivery/address")}>BUY NOW</button>
            </div>

        </div>
        ):(
            <div className='emptyCart'>
                <div >
                    <RemoveShoppingCartIcon className='emptyCartIcon' />   
                </div>
                <span>Empty Cart</span>
            </div>
        )}
    </div>
  )
}

export default Cart