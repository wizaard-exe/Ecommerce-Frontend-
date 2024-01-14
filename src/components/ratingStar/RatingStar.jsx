import React, { useState, useEffect } from 'react';
import RatingStars from 'react-rating-stars-component';

const RatingStar = ({ edit,half,onchange}) => {

  const options = {
    activeColor: 'rgb(236, 152, 0)',
    value: 0,
    isHalf: half !== undefined ? half : true,
    edit,
    size: window.innerWidth <= 768 ? 15 : 25,
  };
  const ratingChange = (newRating)=>{
    if(onchange)
    {
      onchange(newRating)
    }
  }

  return (
    <div>
      <RatingStars {...options} onChange={ratingChange}/>
    </div>
  );
};

export default RatingStar;
