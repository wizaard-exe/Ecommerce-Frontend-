import React from 'react'
import './review.css';
import RatingStar from '../../components/ratingStar/RatingStar.jsx';

const Review = ({edit}) => {
  return (
    <div className='review'>
        <div className='userDetail'>
            <div className='userProfile'>
                <img src={"https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_1280.png"}/>
            </div>
            <div className='userName'>
                <h2>WIZAARD</h2>
                <div>{edit !== undefined ? <RatingStar edit={true} /> : <RatingStar edit={false} />}</div>
            </div>
        </div>
        {
            edit !== undefined ? 
            <div className='textAreaCon'>
                <textarea></textarea>

                <button className='reviewBtn'>Submit</button>
                <button>Cancel</button>
            </div>

                :<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic debitis iusto quia veniam minima! Eaque voluptatem illum unde corporis nemo! Unde illo sequi ullam neque libero! Beatae, quibusdam sit! Dicta!</p>
        }


    </div>
  )
}

export default Review