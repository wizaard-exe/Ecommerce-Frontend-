import React, { useState } from 'react'
import './navbar.css';
import './responsive.css';
import { LuSearch } from "react-icons/lu";
import { BsCart2 } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import {Link} from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import CloseIcon from '@mui/icons-material/Close';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";



const Navbar = () => {
    const [toggleSidebar,setToggleSidebar] = useState(false);
    const stopPropogateSidebar = (e) =>{
        if(e.target.className === "sidebar")
        {
            setToggleSidebar(false);
        }
    }
    
  return (
    <>
    <nav className='navbar'>
        <div className='barIconCon'>
            <IoMenu className='barIcon' onClick={()=>setToggleSidebar(true)}/>
        </div>
        {/* Logo and SeachBar */}
        <div className='leftNav'>
            <div className='Logo'>
                
                <h2><Link to="/">Super BuY</Link></h2>
            </div>
            <div className='searchBar'>
                <input type="text" placeholder='Search for Products' />
                <LuSearch className='searchIcon' />
            </div>
        </div>

        {/* RIGHT SIDE NAV */}
        <ul className="rightNav">
            <li><Link to="/search" >Search</Link></li>
            <li className='profileCon'>
                <Link to="/profile"><LuUser2 className='navIcon' /></Link>
            </li>
            <li className='wishlistCon'>
                <Link to="/wishlist"><IoMdHeartEmpty className='navIcon wIcon' /><span>1</span></Link>
                
            </li>
            <li className='cartCon'>
                <Link to="/cart"><BsCart2  className='navIcon' /><span>1</span></Link>
            </li>
            <li className='cartCon'>
                <Link to="/login"><button>Login</button></Link>
            </li>

        </ul>

        <div className='sidebar' style={{display:`${toggleSidebar ? "flex" : "none"}`}} onClick={(e)=>stopPropogateSidebar(e) } >
            <div className='sidebarCon' style={{transform:`${toggleSidebar ? "translateX(0%)" : "translateX(-100%)"}`}} >
                <div>
                    <Link to="/"><h2>Super BuY</h2></Link>
                </div>
                <ul>
                    <li onClick={()=>{setToggleSidebar(false)}}><Link to="/search"><FilterListOutlinedIcon className='icons' /><span>Search</span></Link></li>
                    <li onClick={()=>{setToggleSidebar(false)}}><Link to="/profile"><LuUser2 className='navIcon icons' /><span>Profile</span></Link></li>
                    <li onClick={()=>{setToggleSidebar(false)}}><Link to="/wishlist"><IoMdHeartEmpty className='icons' /><span>Wishlist</span></Link></li>
                    <li onClick={()=>{setToggleSidebar(false)}}><Link to="/cart"><BsCart2 className='icons' /><span>Cart</span></Link></li>
                    <li onClick={()=>{setToggleSidebar(false)}}><Link to="/login"><RiLogoutCircleRLine className='icons' /><span>Login</span></Link></li>
                    <li onClick={()=>{setToggleSidebar(false)}}><Link to="/"><RiLogoutCircleLine  className='icons'/><span>Logout</span></Link></li>
                </ul>
            </div>
            <CloseIcon className='closeIcon' onClick={()=>setToggleSidebar(false)} />
        </div>

    </nav>
    </>
  )
}

export default Navbar