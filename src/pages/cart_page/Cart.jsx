import React from 'react'
import './cart.css';
import './responsive.css';
import { CartTemp } from './CartTemp';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
const Cart = () => {
    const cartArray = ["https://rukminim2.flixcart.com/image/416/416/k7531jk0/headphone/h/r/y/redgear-comet-7-1-usb-gaming-headphones-with-7-changeable-led-original-imafpfzbmuqqyh5g.jpeg?q=70&crop=false","https://rukminim2.flixcart.com/image/832/832/krjjde80/t-shirt/7/2/g/l-710-9-ftx-original-imag5b2k5wrnp6kn.jpeg?q=70&crop=false","https://rukminim2.flixcart.com/image/832/832/xif0q/jean/l/7/q/34-jeans-metronaut-original-imags5ab2xhbbx9y.jpeg?q=70&crop=false"];
  return (
    <div className='cartPage'>
        {/* <div className='emptyCart'>
                <div >
                    <RemoveShoppingCartIcon className='emptyCartIcon' />   
                </div>
                <h>Empty Cart</h>
        </div> */}
        <div className='cartCon'>

            <div className="left">
                {cartArray.map((img,key)=>(
                    <CartTemp key={key} img={img} />
                ))}
            </div>

            <div className="right">
                <div>
                    <span>Num of Items: </span>
                    <span>₹10</span>
                </div>
                <div>
                    <span>Subtotal: </span>
                    <span>₹2500</span>
                </div>
                <div>
                    <span>Shipping Charges: </span>
                    <span>₹149</span>
                </div>
                <div>
                    <span>Total: </span>
                    <span>₹10000</span>
                </div>
                <button>CHECKOUT</button>
            </div>

        </div>
    </div>
  )
}

export default Cart