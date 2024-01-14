import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './wishlist.css';
import { IoMdHeartEmpty } from "react-icons/io";
import { Link } from 'react-router-dom';

const Wishlist = (img) => {
  return (
    <div className='wishlistPage'>
        {/* <div className='emptyWishlist'>
            <div><IoMdHeartEmpty className='emptyWishlistIcon'/></div>
            <span>Empty Wishlist</span>
        </div> */}
        <div  className="wishlistCon">
            <h4>WISHLIST</h4>
            <div  className='wishlist'>
                <Link to="/product/:id" className='imgDiv'>
                    <img  src={'./camera.jpg'}/>
                </Link>
                <span>WIZAARD PRODUCT</span>
                <h5>₹2500</h5>
               <div className='removeIcon'><DeleteIcon className='delIcon' /></div>
            </div>
        </div>
    </div>
  )
}

export default Wishlist