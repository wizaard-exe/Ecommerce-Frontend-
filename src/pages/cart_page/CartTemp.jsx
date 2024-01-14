import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate} from 'react-router-dom';
export const CartTemp = ({img}) => {
    const navigate = useNavigate();
    const [qty,setQty] = useState(1);
    const increament = ()=>{
            setQty((qty)=>qty+1)
    }
    const decreament = ()=>{
        setQty((qty)=>Math.max(1,qty-1))
    }
  return (
    <div className='cart'>
        <div className='leftCart'>
            <div className='imgDiv'>
                <img  onClick={()=>navigate('/product/:id')}src={img ? img :"Loading" }/>
            </div>

            <div>
                <span>WIZAARD PRODUCT</span>
                <h5>₹2500</h5>
            </div>
        </div>

        <div className='rightCart'>
            <div>
                <button onClick={increament}>+</button>
                <span>{qty}</span>
                <button onClick={decreament}>-</button>
            </div>
            <p className='removeIcon'><DeleteIcon className='delIcon' /></p>
        </div>
    </div>
  )
}
