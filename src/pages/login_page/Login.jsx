import React, { useState } from 'react'
import './login.css';
import './responsive.css';
import { Link } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';

const Login = () => {
  const [toggle,setToggle] = useState("login");
  const [showPass,setShowpass] = useState(false);
  const [showconPass,setconpass] = useState(false);
  const [profilePic,setProfilePic] = useState(null);

  const uploadPhoto = (e) => {
    if (e.target.files && e.target.files.length > 0) {

      const file = e.target.files[0];

      const fileReader = new FileReader();

      fileReader.onload = (e)=>{
        const readedfile = e.target.result;
        setProfilePic(readedfile);
      }
      fileReader.onprogress = (event) => {
        // This event is triggered when data is being loaded
        if (event.lengthComputable) {
          const percentLoaded = (event.loaded / event.total) * 100;
          console.log(`Loading... ${percentLoaded}% loaded`);
        } else {
          console.log(`Loading...`);
        }
      };
      fileReader.onloadstart = () => {
        // This event is triggered when the reading operation starts
        console.log('Loading started...');
      };

      fileReader.onloadend = () => {
        // This event is triggered when the reading operation ends
        console.log('Loading finished.');
      };
      fileReader.readAsDataURL(file);
    }
  };
  

  return (
    <div className='loginPage'>

        <div className='loginCon'>
            <div className='headingBox'>
                <span onClick={()=>{setToggle("login");setShowpass(false)}}>Login</span>
                <span onClick={()=>{setToggle("sign-up");setShowpass(false);setconpass(false)}}>Sign up</span>
            </div>


            <div className={`border ${toggle === "login" ? "" : "active"}`} ></div>

            <div className='formCon'>


              <form className={`loginBox ${toggle === "login" ? "login" : ""}`} >
                <label>
                  <EmailOutlinedIcon  className='icon'/>
                  <input type="text" placeholder='Email'  className='input'/>
                </label>
                <label>
                  <LockOpenIcon className='icon' />
                  <input type={`${showPass ? "text" : "password"}`} placeholder='Password' className='input' />
                  {!showPass ? <KeyIcon onClick={()=>setShowpass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setShowpass(false)} />}
                </label>
                <div className='forgetPass'><Link to="/forget">Forget Password</Link></div>
                <input type="submit" value="Login" />

                <div className='gbox'>
                  <div>
                    <img src={'./google.png'} />
                    <span>Continue with Google</span>
                  </div>
                </div> 
                <div className='fbox'>
                  <div>
                    <img src={'./facebook.png'} />
                    <span>Continue with Facebook</span>
                  </div>
                </div>
    
              </form>
              




              <form className={`signupBox ${toggle === "sign-up" ? "signup" : ""}`}> 
                  <label>
                    <AccountCircleIcon  className='icon'/>
                    <input type="text" placeholder='Name'  className='input'/>
                  </label>
                  <label>
                    <EmailOutlinedIcon  className='icon'/>
                    <input type="text" placeholder='Email'  className='input'/>
                  </label>

                    <label>
                      <LockOpenIcon className='icon' />
                      <input type={`${showPass ? "text" : "password"}`} placeholder='Password' className='input' />
                      {!showPass ? <KeyIcon onClick={()=>setShowpass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setShowpass(false)} />}
                    </label>

                    <label>
                      < HttpsIcon className='icon' />
                      <input type={`${showconPass ? "text" : "password"}`} placeholder='Confirm Password' className='input' />
                      {!showconPass ? <KeyIcon onClick={()=>setconpass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setconpass(false)} />}
                    </label>

                    <div className='uploadBox'>
                      <div>
                          <img src={`${profilePic ? profilePic :"./Profile.png"}`} />
                      </div>
                      <div>
                        <label htmlFor="profileImageInput">
                            <input  onChange={(e)=>uploadPhoto(e)} type="file" id="profileImageInput" accept="image/*" />
                            <span >Upload Profile</span>
                        </label>
                      </div>


                    </div>


                  <input type="submit" value="Register" />
                  
              </form>
            </div>
        </div>

    </div>
  )
}

export default Login