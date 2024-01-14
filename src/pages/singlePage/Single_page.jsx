import React, { useState } from 'react'
import './single_page.css';
import './responsive.css';
import Footer from '../../components/footer/Footer.jsx';
import RatingStar from '../../components/ratingStar/RatingStar.jsx';
import { Link } from 'react-router-dom';
import Review from '../../components/reviewBox/Review.jsx';
import MultiCarousel from '../../components/reactMultiCarousel/MultiCarousel.jsx';


const SinglePage = () => {
  const imageArray = ["/phone.webp","/banner4.webp","/camera.jpg","/banner5.webp"]
  const [mainViewimg,setMainViewImg] = useState(imageArray[0]);
  return (
    <div className='singlePage'>


      <div className='topCon'>

        <div className="leftSide">

              <div className='sideImg'>
                {imageArray.map((img,key)=>(
                   <div key={key} onClick={()=>setMainViewImg(img)} ><img src={img}/></div> 
                ))}
              </div>

              <div className='mainImg'>
                <img src={mainViewimg}/>
              </div>
        </div>

        <div className="rightSide">
              <div className='titleCon'><h2>Redgear Comet 7.1 USB Gaming Headphones with 7 changeable LED color Wired Gaming Headset  (Black, On the Ear)</h2></div>
              <div className='ratingCon'> <div className="ratingCom" ><RatingStar edit={false} /></div> <span>{`(${ 251} reviews)`}</span></div>
              <div className='PriceCon'><h2>₹12999/-</h2></div>
              <div className="statusCon">
                <span>Status:</span>
                <span className='green'>InStock</span>
              </div>
              <div className='productDetail'>
                <p>Product Details</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi consequuntur, maxime voluptatum ratione neque enim ea quod reiciendis, odio fugiat cumque expedita doloremque. Obcaecati quae, minus aliquam quis deleniti similique illo quam hic harum. Quisquam distinctio, temporibus consequuntur sint incidunt voluptates eveniet esse cum, voluptatibus dolorem qui quod minima. Porro!</p>
              </div>
              <div className='buttonCon'>
                <Link to="/cart"><button className='cartBtn'>Add to Cart</button></Link>
                <Link to="/shippingDetails"><button className='buynowBtn'>Buy Now</button></Link>
              </div>
        </div>

      </div>
      <div className='suggestionCon'>
            <h3>You may like this</h3>
            <MultiCarousel />
      </div>
      <div className='reviewCon'>
        <h2>Customer Reviews</h2>
            <Review edit={true} />
            <Review />
            <Review />
            <Review />
            <Review />
      </div>

    <Footer />
    </div>
  )
}

export default SinglePage;
