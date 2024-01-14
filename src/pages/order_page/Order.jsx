import React from 'react'
import './order.css';
import { Link } from 'react-router-dom';

 const Order = () => {
  return (
    <div className='orderPage'>
        {/* <div className='zeroOrder'>
                <h2>No Order Yet</h2>
        </div> */}
        <div className='orderCon'>

            <table >

                <thead>
                    <tr colSpan={5}>
                        <td>Items</td>
                        <td>Product Id</td>
                        <td>Items Qty</td>
                        <td>Amount </td>
                        <td>Status</td>
                    </tr>
                </thead>

                <tbody>                
                    <tr>
                        <td><Link to="/product/:id" className='imgCon'><img src={"/camera.jpg"}/></Link></td>
                        <td>33SDF43545DFGT44354</td>
                        <td>12</td>
                        <td>₹180000 </td>
                        <td>Delevired</td>
                    </tr>
                    <tr>
                        <td><Link to="/product/:id" className='imgCon'><img src={"/google.png"}/></Link></td>
                        <td>33SDF43545DFGT44354</td>
                        <td>12</td>
                        <td>₹180000 </td>
                        <td>Delevired</td>
                    </tr>
                    <tr>
                        <td><Link to="/product/:id" className='imgCon'><img src={"/phone.webp"}/></Link></td>
                        <td>33SDF43545DFGT44354</td>
                        <td>12</td>
                        <td>₹180000 </td>
                        <td>Delevired</td>
                    </tr>
                    
                </tbody>

            </table>
        </div>
    </div>
  )
}

export default Order;