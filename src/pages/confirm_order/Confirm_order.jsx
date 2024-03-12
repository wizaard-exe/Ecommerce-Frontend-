import React,{useEffect,useState} from 'react'
import './confirmOrder.css';
import './responsive.css';
import ShippingProgress from '../../components/shipping_progress/ShipppingProgress';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch} from 'react-redux';
import { getUser } from '../../redux/action/auth_action';
import {toast} from 'react-toastify';
import toastOption from "../../utils/toastOption";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Confirm_order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authentication);
  const [subTotal,setSubTotal] = useState(0);
  const [deliveryCharges,setDeliveryCharges] = useState(150);
  const [gstRate,setGstRate] = useState(18);
  const [gstAmount,setGstAmount] = useState(0);
  const [total,setTotal] = useState(0);
  
  useEffect(() => {
    const calc = ()=>{
      if(user.cart && user.cart.length > 0)
      {
        const subtotalValue = (user.cart.reduce((total, item) => item.quantity * item.price + total, 0));
        setSubTotal(subtotalValue);

        const calculateGstAmt = (subTotal * gstRate) /100;
        setGstAmount(calculateGstAmt);

        const calculatedTotal = subtotalValue + calculateGstAmt + deliveryCharges;
        setTotal(calculatedTotal);
      }
    }
    calc();
  }, [user.cart,gstRate,deliveryCharges]);
    
  const proceedPayment = async ()=>
  {
  try
    {
      const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/create/order`,{totalAmount:total},{withCredentials:true,headers:{"Content-Type":"application/json"}});
      if(!data)
      {
        return toast.error("Error Occured!",toastOption);
      }

      toast.dismiss();
      toast.success(data.message, {
        ...toastOption,
        onClose: () => {
          navigate("/order");
        },
      });

      // const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/key/payment`,{amount:total},{withCredentials:true,headers:{"Content-Type":"application/json"}});
      // if(!data)
      // {
      //   return toast.error("Something went Wrong!",toastOption);
      // }

      // var options = {
      //   key: "Cyl0kWO9dLFBeOAgLRSxh3SJ", 
      //   amount: data.order.amount,
      //   currency: "INR",
      //   name: "SuperBuy",
      //   description: "Test Payment",
      //   image: "https://cdn-icons-png.flaticon.com/512/9131/9131549.png",
      //   order_id: data.order.id, 
      //   "handler": function (response)
      //   {
      //     alert(response.razorpay_payment_id);
      //     alert(response.razorpay_order_id);
      //     alert(response.razorpay_signature)
      //   },
      //   callback_url: `${import.meta.env.VITE_DOMAIN}/payment/verification`,
      //   prefill: {
      //       "name": user.name,
      //       "email": user.email  || "",
      //   },
      //   notes: {
      //     "address": "herer and there "
      //   },
      //   theme: {
      //       "color": "#000000"
      //   }
      // };

      // var razorpayUI = new window.Razorpay(options);

      // razorpayUI.on('payment.failed', function (response)
      // {
      //   alert(response.error.code);
      //   alert(response.error.description);
      //   alert(response.error.source);
      //   alert(response.error.step);
      //   alert(response.error.reason);
      //   alert(response.error.metadata.order_id);
      //   alert(response.error.metadata.payment_id);
      // });
      // razorpayUI.open();
      
     } 
    catch(e)
    {
      console.log(e);
      return toast.error(e.response.data.message,toastOption);
    }
  }

  return (
    <div className='confirmOrder_page'>
        <Helmet>
            <title>Order Confirmation</title>
        </Helmet>
        <ShippingProgress page="confirmOrder"/>

        <div className='confirmOrder_con'>
          {/* LEFT */}
              <div className="shippingInfoCon">

                <div className="shippingInfo">

                  <span className='heading'>Delivery Info</span>

                  <div>
                      <p>Name:</p>
                      <span>{user.address.name || ""}</span>
                  </div>

                  <div>
                      <p>Phone:</p>
                      <span>{`+91 ${user.address.mobileNumber || ""}`}</span>
                  </div>

                  <div>
                      <p>Pincode:</p>
                      <span>{user.address.pincode || ""}</span>
                  </div>

                  <div>
                      <p>Address:</p>
                      <span>{user.address.fullAddress || ""}</span>
                  </div>
                  <Link to="/delivery/address"><button>Edit Above Details</button></Link>
                </div>


                <div className='cartItems'>
                  <span className='heading'>Your Cart Items</span>

                  <div className='cartCon'>

                    {user.cart && user.cart.length > 0 && user.cart.map((product,key)=>(
                    <div key={key} className='cart'>
                        <div className='leftCon'>
                            <Link to={`/product/${product.id || ""}`} className='imgCon'><img src={product.img || ""}/></Link>
                            <p>{product.name || ""}</p>
                        </div>

                        <div className='rightCon'>
                            <p className='qty'>{product.quantity}</p>
                            <p>X</p>
                            <p className=''>{`₹${product.price}`}</p>
                            <p>{`=`}</p>
                            <span>{`₹${product.quantity * product.price}`}</span>
                    </div>

                    </div>
                    ))}


                      

      
   

                  </div>
                </div>

              </div>



              {/* RIGHT */}
                <div className="proceedToPayCon">

                    <div className='paymentBox'>
                      <span className='heading'>Order Details</span>
                      <div>
                        <p>Subtotal</p>
                        <span>{`₹${subTotal}`}</span>
                      </div>
                      <div>
                        <p>Delivery Charges</p>
                        <span>{`₹${deliveryCharges}`}</span>
                      </div>
                      <div>
                        <p>GST Rate</p>
                        <span>{`${gstRate}%`}</span>
                      </div>
                      <div>
                        <p>GST Amount</p>
                        <span>{`₹${gstAmount}`}</span>
                      </div>
                      <div>
                        <p>Total</p>
                        <span>{`₹${total}`}</span>
                      </div>
                      <Link onClick={proceedPayment}><button>Proceed To Payment</button></Link>
                    </div>
                    
                    
                </div>
        </div>
    </div>
  )
}

export default Confirm_order