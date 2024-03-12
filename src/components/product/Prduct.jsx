import React from 'react'
import { Link } from 'react-router-dom';
import  './product.css';
import RatingStar from '../ratingStar/RatingStar';

const Product = ({_id, images, name, rating, price,num,reviews}) => {
  return (
    <Link className="product" to={`/product/${_id}`}>
      <div className="productImg">
        <img src={images[0]}/>
      </div>
      <div className="productDetails">
        <h4>{name}</h4>
        <div className='rating '> <div className="ratingCom" ><RatingStar edit={false} value={rating} /></div> <span>{`(${reviews.length} reviews)`}</span></div>
        <h3>₹{price}</h3>
      </div>
    </Link>
  )
}

export default Product