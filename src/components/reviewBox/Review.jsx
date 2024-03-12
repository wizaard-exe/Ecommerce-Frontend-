import React, { useEffect, useState } from 'react'
import './review.css';
import RatingStar from '../../components/ratingStar/RatingStar.jsx';
import {toast} from "react-toastify";
import toastOption from '../../utils/toastOption.js';
import axios from 'axios';
import { getUser } from '../../redux/action/auth_action.js';
import { useDispatch } from 'react-redux';

const Review = ({edit,review,user,productId,setReviewSubmitted,reviewSubmitted}) => 

{
    const dispatch = useDispatch();
    // const userImg = "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_1280.png";

    const [userRating,setUserRating] = useState(0);
    const [comment,setUserComment] = useState("");
    const [resetStar,setResetStar] = useState(false);

    const submitReview = async ()=>
    {
        if(!userRating)
        {
            return toast.error('give you valuable Rating!',toastOption)
        }
        else if(!comment)
        {
            return toast.error('Give us your Valuable Feedback!',toastOption);
        }
        else{

            try{
                const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/create/review`,{productId,comment,rating:userRating},{withCredentials:true,headers:{"Content-Type": "application/json"}});
                
                if(!data)
                {
                    return toast.error('Error Occured',toastOption);
                }
                toast.success(data.message,toastOption);
                dispatch(getUser());
                setUserComment("");
                setResetStar(true);
                setUserRating(0);
                setReviewSubmitted(true);

            }
            catch(e)
            {
                console.log(e);
                return toast.error(e.message,toastOption);
            } 
        }
 
    };
    useEffect(()=>{
        if (reviewSubmitted) {
            setReviewSubmitted(false);
          }
    },
    [reviewSubmitted]);



  return (
    <div className='review'>
        <div className='userDetail'>
            <div className='userProfile'>
                <img src={user ? user.profilePic : review.img} />
            </div>

            <div className='userName'>
                <h2>{user !== undefined ? user.name : review.name }</h2>
              
                <div>{user !== undefined ? <RatingStar edit={true} onchange={setUserRating} reset={resetStar} setReset={setResetStar} /> : <RatingStar edit={false}  value={review.rating}/>}</div>
            </div>
        </div>
        {
            user !== undefined ? 
            (
                <div className='textAreaCon'>
                <textarea onChange={e=>setUserComment(e.target.value)} value={comment}></textarea>

                <button className='reviewBtn' onClick={submitReview}>Submit</button>
                <button onClick={()=>{setUserComment("");setUserRating(0);setResetStar(true)}}>Cancel</button>
            </div> 
            )
            :(<p>{review.comment}</p>)
        }
    </div>
  )
}

export default Review