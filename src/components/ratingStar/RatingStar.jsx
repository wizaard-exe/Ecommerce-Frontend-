import React, { useState, useEffect } from 'react';
import RatingStars from 'react-rating-stars-component';

const RatingStar = ({ edit, half, onchange, value, reset,setReset }) => {
  const [key, setKey] = useState(0);

  const options = {
    activeColor: 'rgb(236, 152, 0)',
    value: reset ? 0 : value || 0,
    isHalf: half !== undefined ? half : true,
    edit,
    size: window.innerWidth <= 768 ? 15 : 25,
  };

  useEffect(() => {
    if (reset) {
      setKey((prevKey) => prevKey + 1);
      setReset(false)
    }
  }, [reset]);

  const ratingChange = (newRating) => {
    if (onchange) {
      onchange(newRating);
    }
  };

  return (
    <div key={key}>
      <RatingStars {...options} onChange={ratingChange} />
    </div>
  );
};

export default RatingStar;
