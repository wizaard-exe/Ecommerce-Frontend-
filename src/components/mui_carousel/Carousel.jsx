import React from 'react'
import Carousel from 'react-material-ui-carousel';
import './style.css';;

const MuiCaousel = () => {
 const items = ['/banner4.webp','/banner1.webp','/banner2.webp','/banner3.webp','/banner5.webp']

  const options = {
    autoPlay:true,
    animation:"fade",
    stopAutoPlayOnHover:true,
    interval:5000,
    duration:600,
    indicators: window.innerWidth <= 778 ? false : true,
    swipe: window.innerWidth <= 778 ? true: false,
    fullHeightHover:true,
    navButtonsAlwaysInvisible:window.innerWidth <= 778 ? true: false,
  }
  return (
    <div className='carouselCon'>
      <Carousel {...options}>
        {
          items.map((item,key)=>(
            <div key={key} className='item' >
              <img src={item}/>
            </div>
          ))
        }
      </Carousel>
    </div>
  );
}
export default MuiCaousel;