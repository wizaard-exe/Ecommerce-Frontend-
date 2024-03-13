import React, { useEffect, useState } from 'react'
import './single_page.css';
import './responsive.css';
import Footer from '../../components/footer/Footer.jsx';
import RatingStar from '../../components/ratingStar/RatingStar.jsx';
import { Link } from 'react-router-dom';
import Review from '../../components/reviewBox/Review.jsx';
import MultiCarousel from '../../components/reactMultiCarousel/MultiCarousel.jsx';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import toastOption from '../../utils/toastOption.js';
import { useDispatch,useSelector } from 'react-redux';
import { getUser } from '../../redux/action/auth_action.js';

const SinglePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.authentication);
  const [mainViewimg,setMainViewImg] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [singleProduct,setSingleProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);


  const addtoCart = async () =>
  {
    try{
      const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/cart`,{productId:params.id},{withCredentials:true,headers:{"Content-Type": "application/json"}});
      if(data)
      {
        toast.dismiss();
        toast.success(data.message,toastOption);
        dispatch(getUser());
      }
    }
    catch(e)
    {
      console.log(e);
    } 
  }

  const addtoWishlist = async () =>{
    try{
      const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/wishlist`,{productId:params.id},{withCredentials:true,headers:{"Content-Type": "application/json"}});
      if(data)
      {
        toast.dismiss();
        toast.success(data.message,toastOption);
        dispatch(getUser());
      }
    }
    catch(e)
    {
      console.log(e);
      toast.dismiss();
      toast.success(e.message,toastOption);

    } 
  }

  const fetchRelatedProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_DOMAIN}/products?category=${singleProduct.category}`);
      setRelatedProducts(data.product);

    } catch (e) {
      console.error('Error fetching related products:', e);
    }
  };

  const fetchData = async () => 
  {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_DOMAIN}/product/${params.id}`);
      setSingleProduct(data.singleProduct);
      setMainViewImg(data.singleProduct.images[0]);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  useEffect(() => {
    if(reviewSubmitted)
    {    
      fetchData();
    }
  }, [reviewSubmitted]);

  useEffect(() => {
    if (singleProduct.category) {
      fetchRelatedProducts();
    }
  }, [singleProduct.category]);



  return (
    <div className='singlePage'>
        <Helmet>
            <title>{"Single Page"}</title>
        </Helmet>
      {!loading && (<>
      <div className='topCon'>

        <div className="leftSide">

              <div className='sideImg'>
                {singleProduct.images.map((img,key)=>(
                   <div key={key} onClick={()=>setMainViewImg(img)} ><img src={img}/></div> 
                ))}
              </div>

              <div className='mainImg'>
                <img src={mainViewimg}/>
              </div>
        </div>

        <div className="rightSide">
              <div className='titleCon'><h2>{singleProduct.name}</h2></div>
              <div className='ratingCon'> <div className="ratingCom" ><RatingStar edit={false} value={singleProduct.rating} /></div> <span>{`(${singleProduct.numOfReviews} reviews)`}</span></div>
              <div className='PriceCon'><h2>₹{singleProduct.price}/-</h2></div>
              <div className="statusCon">
                <span>Status:</span>
                <span className={singleProduct.stock > 0 ? "green" :"red"}> {singleProduct.stock > 0 ? "InStock" : "Out Of Stock"}</span>
              </div>
              <div className='productDetail'>
                <p>Product Details</p>
                <p>{singleProduct.description}</p>
              </div>
              <div className='buttonCon'>
                <Link onClick={addtoCart}><button disabled={singleProduct.stock > 0 ? false : true} className='cartBtn' >Add to Cart</button></Link>
                <Link onClick={addtoWishlist}> <button disabled={singleProduct.stock > 0 ? false : true}  className='buynowBtn'>Add to Wishlist</button></Link>
              </div>
        </div>

      </div>
      {

      relatedProducts && relatedProducts.length > 0 && 
      (
        <div className='suggestionCon'>
          <h3>You may like this</h3>
          <MultiCarousel related_products={relatedProducts} />
        </div>
      )
      }

      <div className='reviewCon'>

        <h2>Customer Reviews</h2>
        {Object.keys(user).length > 0 && <Review edit={true} user={user} productId={params.id}  setReviewSubmitted={setReviewSubmitted} reviewSubmitted={reviewSubmitted}/>}
        {
          singleProduct.reviews && singleProduct.reviews.length !== 0 && singleProduct.reviews.map((review,ind) => (
            <Review key={ind} review={review}  />
          ))
        }
      </div>

    <Footer />
    </>)}
    </div>
  )
}

export default SinglePage;
