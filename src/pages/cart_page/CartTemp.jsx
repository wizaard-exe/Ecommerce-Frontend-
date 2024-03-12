import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import toastOption from '../../utils/toastOption.js';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/action/auth_action.js';


export const CartTemp = ({product}) => 
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [maxStock,setMaxStock] = useState(0);
    const [qty,setQty] = useState(product.quantity || 1);

    const redirect = () =>{
        navigate(`/product/${product.id}`);
    }

    const increament = ()=>{
        setQty((qty)=>Math.min(maxStock,qty+1));
    }
    const decreament = ()=>{
        setQty((qty)=>Math.max(qty-1,1))
    }

    useEffect(()=>{
        const fetchStock = async ()=>{
            try{
                const {data} = await axios.get(`${import.meta.env.VITE_DOMAIN}/product/${product.id}`);
                if(!data)
                {
                    return console.log('error');
                }
                setMaxStock(data.singleProduct.stock);
            }
            catch(e)
            {
                console.log(e);
            }
        } 
        fetchStock();
    },[])


    useEffect(()=>{
        const addToQty = async () =>{
            try{
                const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/cart`,{productId:product.id,quantity:qty},{withCredentials:true,headers:{"Content-Type": "application/json"}});

                if(!data)
                {
                    toast.error("Error Occured",toastOption);
                }
                dispatch(getUser());
            }
            catch(e)
            {
                toast.error(e.message,toastOption);
            }
        }
        addToQty();
        
    },[qty,maxStock,dispatch]);
  
    const removeFromItem = async ()=>
    {
        try{
            const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/remove/cart`,{productId:product.id},{withCredentials:true,headers:{"Content-Type":"application/json"}});
            if(data)
            {
                toast.success(data.message,toastOption);
                dispatch(getUser());
            }
            else{
                return toast.success("Error Occured!",toastOption);
            }
        }
        catch(e)
        {
            console.log(e);
            toast.error(e.message,toastOption);
        }
    }

  return (
    <div className='cart'>
        <div className='leftCart'>
            <div className='imgDiv' onClick={redirect}>
                <img src={product.img}/>
            </div>

            <div>
                <span>{product.name}</span>
                <h5>{`₹${product.price}`}</h5>
            </div>
        </div>

        <div className='rightCart'>
            <div>
                <button onClick={increament} disabled={maxStock > 0 ? false : true}>+</button>
                <span>{maxStock === 0 ? maxStock : qty}</span>
                <button onClick={decreament} disabled={maxStock > 0 ? false : true} >-</button>
            </div>
            <p className='removeIcon'><DeleteIcon className='delIcon' onClick={removeFromItem} /></p>
        </div>
    </div>
  )
}
