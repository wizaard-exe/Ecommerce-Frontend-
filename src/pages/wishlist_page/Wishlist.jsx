import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './wishlist.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import toastOption from '../../utils/toastOption';
import axios from 'axios';
import { getUser } from '../../redux/action/auth_action';

const Wishlist = () => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.authentication);

    const removeItem = async (id) =>{
        try{
            const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/remove/wishlist`,{productId:id},{withCredentials:true,headers:{"Content-Type":"application/json"}});

            if(!data)
            {
                return toast.error("Error Occured!",toastOption);
            }
            toast.success(data.message,toastOption);
            dispatch(getUser());
        }
        catch(e)
        {
            console.log(e);
            return toast.error(e.message,toastOption);
        }
    }

    return (

    <div className='wishlistPage'>
        <Helmet>
            <title>Your Wishlist</title>
        </Helmet>

        {user.wishlist && user.wishlist.length > 0 ? (
        <div  className="wishlistCon">
            <h4>WISHLIST</h4>
            {
                user.wishlist.map((product,key)=>(
                    <div  key={key} className='wishlist'>
                        <Link to={`/product/${product.id}`} className='imgDiv'>
                            <img  src={product.img}/>
                        </Link>
                        <span>{product.name}</span>
                        <h5>{`₹${product.price}`}</h5>
                    <div className='removeIcon' onClick={()=>removeItem(product.id)}><DeleteIcon className='delIcon' /></div>
                </div>
                ))
            }

        </div>
        ) :                 
        
        (<div className='emptyWishlist'>
            <div><IoMdHeartEmpty className='emptyWishlistIcon'/></div>
            <span>Empty Wishlist</span>
        </div>)}
    </div>
  )
}

export default Wishlist