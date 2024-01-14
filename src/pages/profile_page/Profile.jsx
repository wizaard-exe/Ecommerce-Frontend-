import React from 'react'
import './profile.css';
import './responsive.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const Profile = () => {
  return (
    <>
    <div className='profilePage'>
      {/* <h2>My Profile</h2> */}
      <div className='profileCon'> 

        <div className="left">
          <div className='imgDiv'>
            <img src={"./camera.jpg"} />
          </div>
          <Link to="/update/profile"><button>Edit Profile</button></Link>
        </div>

        <div className="right">
          <div className='userDetail'>
            <label>
              <span>Full Name</span>
              <input type="text" value="WIZAARD 444" disabled />
            </label>
            <label>
              <span>Email</span>
              <input type="email" value="xyz@gmail.com"  disabled/>
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
