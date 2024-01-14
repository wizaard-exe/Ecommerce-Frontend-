import React from 'react';
import './carousel.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

const Responsive_Carousel = () => {
  const options = {
    showArrow:true,
    axis:"horizontal",
    width:'100%',
    preventMovementUntilSwipeScrollTolerance:true,
    showIndicators:false,
    showArrows:true,
    autoplay:false,
    interval:"2000",
    showStatus:false,
    showThumbs:false,
    infiniteLoop:true,
    emulateTouch:true
  }
  return (
    <div className='carouselCon'>
        <Carousel {...options}>
              <div className='imgCon'>
                  <img src="/banner1.webp" />
              </div>
              <div className='imgCon'>
                  <img src="/banner2.webp" />
              </div>
              <div className='imgCon'>
                  <img src="/banner3.webp" />
              </div>
              <div className='imgCon'>
                  <img src="/banner4.webp" />
              </div>
              <div className='imgCon'>
                  <img src="/banner5.webp" />
              </div>
        </Carousel>
    </div>
  )
}

export default Responsive_Carousel