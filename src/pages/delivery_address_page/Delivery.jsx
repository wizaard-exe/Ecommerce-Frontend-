import React,{useState,useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './delivery.css';
import { Link } from 'react-router-dom';
import ShipppingProgress from '../../components/shipping_progress/ShipppingProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';      
import toastOptions from '../../utils/toastOption';
import { useNavigate } from 'react-router-dom';   
import axios from 'axios';
import Loader from '../../components/loader/loader';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/action/auth_action';

const Delivery = () => {

      const {user} = useSelector(state=>state.authentication);
      

      const navigate = useNavigate();
      const statesName = [
            "Select State",
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal"
      ]

      const [loading,setLoading] = useState(false);

          const [address, setAddress] = useState({
            name: user.address ? user.address.name : '',
            mobileNumber: user.address ? user.address.mobileNumber.toString() : '',
            pincode: user.address ? user.address.pincode.toString() : '',
            locality: user.address ? user.address.locality : '',
            city: user.address ? user.address.city : '',
            landmark: user.address ? user.address.landmark : '',
            state: user.address ? user.address.state : '',
            alternateNumber: user.address ? user.address.alternateNumber.toString() : '',
            fullAddress: user.address ? user.address.fullAddress : '',
          });

      const handleAddress = (e) => {
            const { name, value } = e.target;
            setAddress((prevAddress) => ({
              ...prevAddress,
              [name]: value
            }));
          };


      const handleSubmit = async (e) => 
      {
            e.preventDefault();
            toast.dismiss();
            const emptyFields = Object.keys(address).filter((key) => address[key] === '');

            if (emptyFields.length > 0) {
                  toast.error(`${emptyFields[0]} is Empty!`,toastOptions);
            }

            else if (address.mobileNumber.length !== 10) {
            toast.error(`Invalid Phone Number`, toastOptions);
            }
            else if (address.pincode.length !== 6) {
            toast.error(`Invalid Pincode`, toastOptions);
            }
            else if (address.alternateNumber.length !== 10) {
                  toast.error(`Invalid Alternate Phone Number`, toastOptions);
                  }
            else {
                  setLoading(true);
                  try{
                        const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/save/address`,address,{withCredentials:true,headers:{"Content-Type":"application/json"}});
                        if(!data)
                        {
                              setLoading(false);
                              return toast.error("Error Occured",toastOptions);
                              
                        }
                        toast.success(data.message,toastOptions);
                        navigate("/confirm/order");
                        setLoading(false);
                  }
                  catch(e)
                  {      
                        setLoading(false);
                        return toast.error(e.message,toastOptions);
                        
                  }
            }
                
      };

      
      const cancelForm = (e)=>{
            e.preventDefault();
            const consent = window.confirm("Are you Sure!");
            if(consent)
            {
                  navigate(-1);
            }
      }

  return (
      <>
            <div className='deliveryAddressPage'>

                  <Helmet>
                        <title>Delivery Address</title>
                  </Helmet>
            
                  <ShipppingProgress page={"address"}/>
                  <span className='title'>Delivery Address</span>
                  {loading ? (<Loader />) :(
                  <form className='addrerssCon' onSubmit={handleSubmit}>
                        
                  <label>
                        <AccountCircleIcon  className='icon'/>
                        <input type="text" placeholder='Name' name="name" className='input' onChange={e=>handleAddress(e)} value={address.name}/>
                  </label>
                  <label>
                        <PhoneAndroidIcon className='icon'/>
                        <input name="mobileNumber" type="number" maxLength={10} placeholder='10 digit Mobile Number' onChange={e=>handleAddress(e)} value={address.mobileNumber}  className='input'/>
                  </label>
                  <label>
                        <PinDropIcon  className='icon'/>
                        <input type="number" value={address.pincode} placeholder='Pincode' name="pincode" onChange={e=>handleAddress(e)} className='input'/>
                  </label>
                  <label>
                        <HomeIcon  className='icon'/>
                        <input type="text" value={address.locality} placeholder='Locality' name="locality" onChange={e=>handleAddress(e)}  className='input'/>
                  </label>
                  <label>
                        <LocationCityIcon  className='icon'/>
                        <input type="text" value={address.city} placeholder='City/District/Town' name="city" onChange={e=>handleAddress(e)} className='input'/>
                  </label>
                  <label>
                        <PinDropIcon  className='icon'/>
                        <input type="text" placeholder='Landmark (Optional)' name="landmark" onChange={e=>handleAddress(e)} className='input' value={address.landmark}/>
                  </label>
                  <label className='selectBox'>
                        <p>Select State : </p>
                        <select onChange={(e)=>setAddress({...address,state:e.target.value})} value={address.state}>

                        {statesName && statesName.map((state,key) =>
                        (
                              <option key={key} >{state}</option>
                        )
                        )}   
                        
                        </select>
                  </label>
                  <label>
                        <LocalPhoneIcon className='icon'/>
                        <input type="number" onChange={e=>handleAddress(e)} placeholder='Alternate Phone (Optional)' name="alternateNumber" className='input' value={address.alternateNumber}/>
                  </label>
                  <label>
                  <textarea value={address.fullAddress} placeholder='Address' name="fullAddress" onChange={e=>handleAddress(e)}>

                  </textarea>

                  </label>
                        <Link onClick={handleSubmit}><input type="submit" value="SAVE AND DELIVER HERE" /></Link>
                        <Link onClick={cancelForm}><input type="submit" value="CANCEL" /></Link>
                  </form>
                  )}
            </div>
      </>
  )
}

export default Delivery