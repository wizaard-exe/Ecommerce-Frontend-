import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './multiCarousel.css';
import { Link } from 'react-router-dom';

const MultiCarousel = () => {
    
    const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    }
  };
  return (
        <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            slidesToSlide={1}
            responsive={responsive}
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all 0.5s"
            transitionDuration={1000}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            >
            <Link to="/product/:id"><img src="/phone.webp"/></Link>
            <Link to="/product/:id"><img src="/camera.jpg"/></Link>
            <Link to="/product/:id"><img src="/phone.webp"/></Link>
            <Link to="/product/:id"><img src="/camera.jpg"/></Link>
            <Link to="/product/:id"><img src="/phone.webp"/></Link>
            <Link to="/product/:id"><img src="/camera.jpg"/></Link>
            <Link to="/product/:id"><img src="/phone.webp"/></Link>
            <Link to="/product/:id"><img src="/camera.jpg"/></Link>

        </Carousel>    
  )
}

export default MultiCarousel