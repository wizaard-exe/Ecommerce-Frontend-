import React, { useState } from 'react'
import './changePass.css';
import { Link } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import HttpsIcon from '@mui/icons-material/Https';
import { Helmet } from 'react-helmet';

const ChangePass = () => {
    const [showOldPass,setShowOldPass] = useState(false);
    const [showNewPass,setShowNewPass] = useState(false);
    const [showConPass,setShowConPass] = useState(false);
  return (
    <div className='changePasswordPage'>
        <Helmet>
            <title>Change Password</title>
        </Helmet>
    <form >
        <span className='heading'>Change Password</span>

        <label>
                  <LockOpenIcon className='icon' />
                  <input type={`${showOldPass ? "text" : "password"}`} placeholder='Old Password' className='input' />
                  {!showOldPass ? <KeyIcon onClick={()=>setShowOldPass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setShowOldPass(false)} />}
        </label>

        <label>
                       < LockOutlinedIcon className='icon' />
                      <input type={`${showNewPass ? "text" : "password"}`} placeholder='New Password' className='input' />
                      {!showNewPass ? <KeyIcon onClick={()=>setShowNewPass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setShowNewPass(false)} />}
        </label>

        <label>
                      < HttpsIcon className='icon' />
                      <input type={`${showConPass ? "text" : "password"}`} placeholder='Confirm Password' className='input' />
                      {!showConPass ? <KeyIcon onClick={()=>setShowConPass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setShowConPass(false)} />}
        </label>
        <input type="submit" value="Change Password"/>
        <Link to="/profile"><button>Cancel</button></Link>
    </form>
</div>
  )
}

export default ChangePass