import React from 'react'
import './payment.css';
import ShippingProgress from '../../components/shipping_progress/ShipppingProgress';
import { Helmet } from 'react-helmet';
const Payment = () => {
  return (
    <div className='payment_page'>
        <Helmet>
            <title>Payment Confirmation</title>
        </Helmet>
        <ShippingProgress page="payment"/>
        <div className='payment_con'>

        </div>
    </div>
  )
}

export default Payment;