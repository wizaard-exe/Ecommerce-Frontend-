import React from 'react'
import './footer.css';
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer>
        <div className='ulCon'>
          <ul className='appSection'>
              <li><p className='headerText'>Download Our App</p></li>
              <li><Link><img src="/Appstore.png"/></Link></li>
              <li><Link><img src="/playstore.png"/></Link></li>
          </ul>
        </div>
        <div className='ulCon'>
          <ul className='aboutSection'>
              <li><Link>Contact Us</Link></li>
              <li><Link>About Us</Link></li>
              <li><Link>Services</Link></li>
          </ul>
        </div>
        <div className='ulCon'>
          <ul className='helpSection'>
              <li><Link>Payments</Link></li>
              <li><Link>Shippings</Link></li>
              <li><Link>Cancellation & Returns</Link></li>
              <li><Link>FAQ</Link></li>
          </ul>
        </div>
        <div className='ulCon'>
          <ul className='socialMeida'>
              <li><Link><FaFacebookF /></Link></li>
              <li><Link><FaTwitter /></Link></li>
              <li><Link><FaYoutube /></Link></li>
              <li><Link><FaInstagram /></Link></li>
          </ul>
        </div>

    </footer>
  )
}

export default Footer