import React from 'react'
import { Link } from 'react-router-dom';
import  './product.css';
import RatingStar from '../ratingStar/RatingStar';
const Product = ({img}) => {
  return (
    <Link className="product" to={`/product/${`:id`}`}>
      <div className="productImg">
        <img src={img}/>
      </div>
      <div className="productDetails">
        <h4>Sony Alpha ILCE 6100L 24.2 MP Mirrorless Digital SLR Camera with 16-50 mm Power Zoom LensSony Alpha ILCE 6100L</h4>
        <div className='rating '> <div className="ratingCom" ><RatingStar edit={false} /></div> <span>{`(${ 251} reviews)`}</span></div>
        <h3> ₹ 15000</h3>
      </div>
    </Link>
  )
}

export default Product