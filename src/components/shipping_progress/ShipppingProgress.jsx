import React from 'react'
import './shipping.css';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';

const ShipppingProgress = ({page}) => {
  return (
    <div className='shippingProgressCon'>



        <div className='shippingAddress'>
            <div className='iconDiv'>
                <p><LocalShippingIcon  className={`icons mr ${page && "active"}`}/></p>
                <div className={`progress ${page === "confirmOrder" || page === "payment" ? "active" : ""}`}></div>
            </div>
            <span>Delivery Address</span>
        </div>


        <div className='confirmOrder'>
            <div className='iconDiv'>
                <p><ShoppingCartCheckoutIcon  className={`icons ${page === "confirmOrder" || page === "payment" ? "active" :"" }`}/></p>
                
                <div className={`progress ${page === "payment" ? "active" : ""}`}></div>
            </div>
            <span>Confirm Order</span>
        </div>



        <div className='payment'>
            <div className='iconDiv'>
                <p><PaidIcon className={`icons ${page === "payment" ? "active" :"" }`} /></p>
            </div>
            <span>Payment</span>
        </div>

    </div>
  )
}

export default ShipppingProgress;