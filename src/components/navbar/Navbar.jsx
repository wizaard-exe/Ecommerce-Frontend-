import React, { useState,useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {updateSearchQuery } from "../../redux/reducer/searchquery_reducer.js";
import toastOption from '../../utils/toastOption.js';
import { toast} from 'react-toastify';
import axios from 'axios';
import { getUser } from '../../redux/action/auth_action.js';

const Navbar = () => {
    const {authenticated,user} = useSelector(state=>state.authentication);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchQuery,setSearchQuery] = useState("");

    const [toggleSidebar,setToggleSidebar] = useState(false);
    const stopPropogateSidebar = (e) =>{
        if(e.target.className === "sidebar")
        {
            setToggleSidebar(false);
        }
    }
    const runSearchQuery = ()=>{
        if(searchQuery.trim() !== "")
        {
            dispatch(updateSearchQuery({searchQuery}));
            navigate(`/search?query=${searchQuery}`); 
        }
    }
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            runSearchQuery();
        }
    };
    const logoutUser = async () => {
        const consent = window.confirm('You will be Logged out');
        if(consent)
        {

     
        try{
            const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/logout`,{},{withCredentials:true});
            if(!data)
            {
                return toast.error("Error Occured", toastOption); 
            }
            toast.success("You have been logged out successfully.", toastOption); 
            dispatch(getUser());
            navigate("/");
        }   
        catch(e)
        {
            console.log(e);
            toast.error(e.message, toastOption); 
        }
    }
      };
      
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
                <input type="text" placeholder='Search for Products Here' onKeyDown={onKeyPress} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}/>
                <LuSearch className='searchIcon' onClick={runSearchQuery} />
            </div>
        </div>

        {/* RIGHT SIDE NAV */}

        <ul className="rightNav">
            <li><Link to="/search" >Search</Link></li>
            <li className='profileCon'>
                <Link to="/profile"><LuUser2 className='navIcon' /></Link>
            </li>
            <li className='wishlistCon'>
                <Link to="/wishlist"><IoMdHeartEmpty className='navIcon wIcon' />{user.wishlist && user.wishlist.length > 0 && <span>{user.wishlist.length}</span>}</Link>
                
            </li>
            <li className='cartCon'>
                <Link to="/cart"><BsCart2  className='navIcon cicon ' />
                {user.cart && user.cart.length > 0 && (<span>{user.cart.length}</span>)}
                </Link>
            </li>
            <li className='cartCon'>
                <Link to="/login">{authenticated ? (<button onClick={logoutUser}>Logout</button>) : (<button>Login</button>)}</Link>
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