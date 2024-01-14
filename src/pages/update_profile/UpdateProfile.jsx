import React, { useState } from 'react'
import './update.css';
import './responsive.css';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
const UpdateProfile = () => {
    const [updateImg,setUpdateImg] = useState(null);
    const updateProfilePic = (e)=>
    {
          if (e.target.files && e.target.files.length > 0) {
        
              const file = e.target.files[0];
        
              const fileReader = new FileReader();
        
              fileReader.onload = (e)=>{
                const readedfile = e.target.result;
                setUpdateImg(readedfile);
              }
              fileReader.onprogress = (event) => {
                if (event.lengthComputable) {
                  const percentLoaded = (event.loaded / event.total) * 100;
                  console.log(`Loading... ${percentLoaded}% loaded`);
                } else {
                  console.log(`Loading...`);
                }
              };
              fileReader.onloadstart = () => {
                console.log('Loading started...');
              };
        
              fileReader.onloadend = () => {
                console.log('Loading finished.');
              };
              fileReader.readAsDataURL(file);
            }
          
    }
  return (
    <div className='updateProfilePage'>
        <form className="updateProfileCon">
            <span className='heading'>Update Profile</span>
            <label>
                <AccountCircleIcon  className='icon'/>
                <input type="text" placeholder='Name'  className='input'/>
            </label>
            <label>
                <EmailOutlinedIcon  className='icon'/>
                <input type="text" placeholder='Email'  className='input'/>
            </label>

            <div className='uploadBox'>
                    <div>
                        <img src="/Profile.png" />
                    </div>
                    <div>
                        <label htmlFor="profileImageInput">
                            <input  onChange={(e)=>updateProfilePic(e)} type="file" id="profileImageInput" accept="image/*" />
                            <span >Uploade</span>
                        </label>
                    </div>
            </div>
            <input type="submit" value="Update Profile"/>
            <Link to="/profile"><button>Cancel</button></Link>
        </form>
    </div>
  )
}
export default UpdateProfile;
