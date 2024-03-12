import { login_req, login_success, login_fail } from "../reducer/auth_reducer";
import axios from "axios";
import {toast} from "react-toastify";
import toastOption from "../../utils/toastOption";

export const signUp = (name, email, password, confirmPassword, profilePic) => async (dispatch) => {
    try {
        dispatch(login_req());
        console.log("AT SECOND : " + name, email, password, confirmPassword, profilePic);

        const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/register`, {
            name,
            email,
            password,
            confirmPassword,
            profilePic,
        }, 
        {
            withCredentials:true,
            headers: {'Content-Type': 'application/json'}
        });

        dispatch(login_success({user:data.user}));
        
    } catch (e) {
        dispatch(login_fail({ error: e }));
        console.log(e);
        return { success: false, error: e.response.data.message };
    }
};
toast.error("sdf",toastOption);

export const login = (email,password) => async (dispatch) =>
{
    try{
        dispatch(login_req());
        const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/login`,{email,password},{withCredentials:true,headers: {'Content-Type': 'application/json'}});
        dispatch(login_success({user:data.user}));
        console.log(data)
    }
    catch(e)
    {
        dispatch(login_fail({error:e}));
    }

}

export const loginWithGoogle = (name,email,googleUid,profilePic) => async (dispatch) => {
    try {
        dispatch(login_req());
        
        const {data} = await axios.post(`${import.meta.env.VITE_DOMAIN}/register`, {
            name,
            email,
            googleUid,
            profilePic,
        }, 
        {withCredentials:true,headers: {'Content-Type': 'application/json'}});
        console.log(data);

        dispatch(login_success({user:data.user}));
        
    } catch (e) {
        dispatch(login_fail({error:e}));
        console.log(e);
    }
};

export const getUser = ()=> async (dispatch) =>
{
    try{
    login_req();
    const {data} = await axios.get(`${import.meta.env.VITE_DOMAIN}/get/user`,{withCredentials:true});
    dispatch(login_success({user:data.user}));
    }
    catch(e)
    {
        dispatch(login_fail({error:e.message}));
    }
}