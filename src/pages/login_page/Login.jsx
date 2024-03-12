import React, { useEffect, useState } from 'react'
import './login.css';
import './responsive.css';
import { Link } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import { Helmet } from 'react-helmet';
import {storage} from "../../firebase";
import { GoogleAuthProvider,signInWithPopup,FacebookAuthProvider, getRedirectResult} from 'firebase/auth';
import {auth} from '../../firebase';
import {v4 as uuidv4} from "uuid";
import { signUp,login,loginWithGoogle } from '../../redux/action/auth_action';
import Loader from '../../components/loader/loader';
import toastOption from '../../utils/toastOption';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { useDispatch } from 'react-redux';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Login = () => {
  
  const [toggle,setToggle] = useState("login");
  const [showPass,setShowpass] = useState(false);
  const [showconPass,setconpass] = useState(false);
  const [profilePic,setProfilePic] = useState(null);
  const [signupData,setSignupData] = useState({name:"",email:"",password:"",confirmPassword:"",profilePic:""});
  const [loginData,setLoginData] = useState({email:"",password:""});
  const [fileUploadLoading,setFileUploadLoading] = useState(false);
  const [userImg,setUserImg] = useState(null);
  const [imgUrl,setImgUrl] = useState("");
  const [signupLoading,setSignupLoading] = useState(false);
  const dispatch = useDispatch();


  // GOOGLE LOGIN

  const continueWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    try {
      const {user} = await signInWithPopup(auth, provider);
      if(user)
      {
        const {uid,email,photoURL,displayName} = user;
        const userEmail = email || `${uuidv4()}@email.com`;

        if (!uid|| !photoURL || !displayName)
        {
          return toast.error("Error Occured",toastOption);
        }
        dispatch(loginWithGoogle(displayName,userEmail,uid,photoURL));

      }
    }
    catch(error)
    {
      if (error.code === 'auth/popup-closed-by-user') {
        toast.error("Login Failed",toastOption);
      } else {
        return toast.error(error.message,toastOption);
      }
    }
  };

  // HADNLE SIGN UP
  const handleSignupData = (e) =>
  {
    const {name,value} = e.target;
    setSignupData({...signupData,[name]:value});
  }

  // Login Data
  const handleLoginData = (e) =>
  {
    const {name,value } = e.target;
    setLoginData({...loginData,[name]:value});
  }

  const submitSignup = async (e)=>{
    e.preventDefault();
    toast.dismiss();
    const {name,email,password,confirmPassword} = signupData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const strongPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name) {
      return toast.error("Name Field is Empty", toastOption);
    } 
    else if (!email) {
      return toast.error("Email Field is Empty", toastOption);
    }
    else if(!emailRegex.test(email))
    {
      return toast.error("Invalid Email", toastOption);
    } 
    else if (!password) {
      return toast.error("Password Field is Empty", toastOption);
    } 
    else if(!strongPassRegex.test(password))
    {
      return toast.error("Password is Weak", toastOption);
    }
    else if (!confirmPassword) {
      return toast.error("Confirm Password Field is Empty", toastOption);
    }
    else if(confirmPassword !== password)
    {
      return toast.error("Confirm Password doesn't match with password", toastOption);
    }
    else if (!userImg) {
      return toast.error("Upload Profile Image", toastOption);
    }
    else {
        setSignupLoading(true);
        const uploadIMG = () => {
        const fileName = uuidv4() + userImg.name;
        const storageRef = ref(storage, `user_profile_${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, userImg);
        
        const loaderToast = toast.loading("Uploading Profile Pic...", { ...toastOption, autoClose: false });

        uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) 
        {
          case 'paused':
            toast.error("Profile Pic Uploading paused Try Again!", toastOption);
            toast.dismiss(loaderToast);
            break;
          case 'running':
            break;
        }

        }, 
        (error) => {
          console.log(error);
              toast.error("Sign up Failed Due to some Issue!", toastOption);
              toast.dismiss(loaderToast);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              if (downloadURL) {
                setImgUrl(downloadURL);
                toast.dismiss(loaderToast);
                dispatch(signUp(name, email, password, confirmPassword, downloadURL));
                console.log("AT FIRST " + name, email, password, confirmPassword, downloadURL);
              } else {
                toast.error("Sign up Failed Due to some Issue!", toastOption);
                toast.dismiss(loaderToast);
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error("Sign up Failed Due to some Issue! catch", toastOption);
              toast.dismiss(loaderToast);
            });
        });
        };
        uploadIMG();
    };

    }
    
    
  const submitLogin = (e)=>{
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {email,password} = loginData;

    if(!email)
    {
      return toast.error("Email is Empty!",toastOption)
    }
    else if(!emailRegex.test(email))
    {
      return toast.error("Invalid Email",toastOption)
    }
    else if(!password)
    {
      return toast.error("Password is Empty!",toastOption)
    }
    else{
      dispatch(login(email,password));
    }

  }

  const uploadPhoto = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      try{

        if(e.target.files[0].size > (10 * 1024 * 1024))
        {
          return toast.error("Img size is bigger than 5 mb",{...toastOption,autoClose:5000 });
        }

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
        }
        const rawImgFile = e.target.files[0];

        const compressedFile = await imageCompression(rawImgFile, options);

        setUserImg(compressedFile);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(compressedFile);

        fileReader.onloadstart = ()=>{
          setFileUploadLoading(true);
        }
        fileReader.onload = (e)=>{
          const readedfile = e.target.result;
          setProfilePic(readedfile);
          setFileUploadLoading(false);
        }
      }
      catch(e)
      {
        console.log("firebase Error" + e);
        return toast.error(e,toastOption);
      }
    }
  };
  

  return (
    <div className='loginPage'>
        <Helmet>
            <title>Login Here</title>
        </Helmet>
        <div className='loginCon'>
            <div className='headingBox'>
                <span onClick={()=>{setToggle("login");setShowpass(false)}}>Login</span>
                <span onClick={()=>{setToggle("sign-up");setShowpass(false);setconpass(false)}}>Sign up</span>
            </div>


            <div className={`border ${toggle === "login" ? "" : "active"}`} ></div>

            <div className='formCon'>


              <form onSubmit={submitLogin} className={`loginBox ${toggle === "login" ? "login" : ""}`} >
                <label>
                  <EmailOutlinedIcon  className='icon'/>
                  <input type="email" placeholder='Email'  className='input' name="email" onChange={(e)=>handleLoginData(e)}/>
                </label>
                <label>
                  <LockOpenIcon className='icon' />
                  <input type={`${showPass ? "text" : "password"}`} placeholder='Password' className='input' name="password" onChange={(e)=>handleLoginData(e)} />
                  {!showPass ? <KeyIcon onClick={()=>setShowpass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setShowpass(false)} />}
                </label>
                <div className='forgetPass'><Link to="/forget">Forget Password</Link></div>
                <input type="submit" value="Login" />

                <div className='gbox' onClick={continueWithGoogle}>
                  <div>
                    <img src={'./google.png'} />
                    <span>Continue with Google</span>
                  </div>
                </div> 
                {/* <div className='fbox' onClick={continueWithFacebook}>
                  <div>
                    <img src={'./facebook.png'} />
                    <span>Continue with Facebook</span>
                  </div>
                </div> */}
    
              </form>
            

              {/* SIGN UP FORM  */}

              <form onSubmit={submitSignup} className={`signupBox ${toggle === "sign-up" ? "signup" : ""}`}> 
                  <label>
                    <AccountCircleIcon  className='icon'/>
                    <input onChange={e=>handleSignupData(e)} type="text" placeholder='Name' className='input'  name="name"/>
                  </label>
                  <label>
                    <EmailOutlinedIcon  className='icon'/>
                    <input  onChange={e=>handleSignupData(e)} type="email" placeholder='Email'  className='input'  name="email"/>
                  </label>

                    <label>
                      <LockOpenIcon className='icon' />
                      <input onChange={e=>handleSignupData(e)} type={`${showPass ? "text" : "password"}`} placeholder='Password' className='input' name="password" />
                      {!showPass ? <KeyIcon onClick={()=>setShowpass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setShowpass(false)} />}
                    </label>

                    <label>
                      < HttpsIcon className='icon' />
                      <input onChange={e=>handleSignupData(e)} type={`${showconPass ? "text" : "password"}`} placeholder='Confirm Password' className='input'  name="confirmPassword" />
                      {!showconPass ? <KeyIcon onClick={()=>setconpass(true)} className='key' />: <KeyOffIcon className='key' onClick={()=>setconpass(false)} />}
                    </label>

                    <div className='uploadBox'>
                      <div className={profilePic ? "profileBorder" :""}>
                          <img  src={`${profilePic ? profilePic :"./Profile.png"}`} />
                      </div>
                      <div>
                        <label htmlFor="profileImageInput">
                          {fileUploadLoading ? (<Loader size={50}/>) :( <>
                          
                            <input  onChange={(e)=>uploadPhoto(e)} type="file" id="profileImageInput" accept="image/*" />
                            <span >Upload Profile</span>
                           </> )}
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