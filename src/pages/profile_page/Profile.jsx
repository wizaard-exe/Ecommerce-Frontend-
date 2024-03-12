import React from 'react'
import './profile.css';
import './responsive.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import { Helmet } from 'react-helmet';
import {useSelector} from 'react-redux';

const Profile = () => {
  const {user} = useSelector(state=>state.authentication);

  return (
    <>

    <div className='profilePage'>
      <Helmet>
            <title>Your Profile</title>
      </Helmet>
      {/* <h2>My Profile</h2> */}
      <div className='profileCon'> 

        <div className="left">
          <div className='imgDiv'>
            <img src={user.profilePic} />
          </div>
          <Link to="/update/profile"><button>Edit Profile</button></Link>
        </div>

        <div className="right">
          <div className='userDetail'>
            <label>
              <span>Full Name</span>
              <input type="text" value={user.name || "User"} disabled />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value={user.email || "Email is not Available"} disabled/>
            </label>
            <Link to="/order"><button>My Orders</button></Link>
            <Link to="/change/password"><button>Change Password</button></Link>

          </div>

        </div>
      </div>
      
    </div>
    <Footer className="footer"/>
    </>
    
  )
}
export default Profile;
