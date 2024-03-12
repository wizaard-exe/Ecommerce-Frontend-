import React, { useEffect, useState } from 'react'
import './order.css';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toastOption from '../../utils/toastOption';
import {toast} from 'react-toastify';
import axios from 'axios';

 const Order = () => {


    const [userOrder,setUserOrder] = useState([]);

    useEffect(()=>{
        const fetchOrder = async()=> 
        {
            toast.dismiss();
            try{
                const {data} = await axios.get(`${import.meta.env.VITE_DOMAIN}/search/order`,{withCredentials:true});
                setUserOrder(data.orders);
            }   
            catch(e)
            {
                console.log(e);
                toast.error(e.message,toastOption);
            }
        }
        fetchOrder();
    },[]);
  return (
    <div className='orderPage'>
        <Helmet>
            <title>Your Orders</title>
        </Helmet>
    
        {5 > 0 ? (
        <div className='orderCon'>

        <table >

            <thead>
                <tr colSpan={5}>
                    <td>Items</td>
                    <td>Product Id</td>
                    <td style={{ textAlign: 'center' }}>Items Qty</td>
                    <td>Amount </td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
            {userOrder && userOrder.length > 0
            ? userOrder.map((order, orderKey) => (
                order.orderedProducts.map((product, productKey) => (
                    <tr key={productKey}>
                    <td>
                        <Link to={`/product/${product.productId}`} className='imgCon'>
                        <img src={product.img} alt={product.name} />
                        </Link>
                    </td>
                    <td>{order._id}</td>
                    <td style={{ textAlign: 'center' }} >{product.quantity}</td>
                    <td>₹{product.price}</td>
                    <td>{order.orderStatus}</td>
                    </tr>
                ))
                ))
            : <tr>
                <td colSpan={5}>No orders found.</td>
                </tr>
            }
      </tbody>


        </table>
        </div>
        ) : ( <div className='noOrder'>
                No Order
        </div>
        )}
    </div>
  )
}

export default Order;