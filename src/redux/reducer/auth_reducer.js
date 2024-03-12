import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    loading:false,
    error:null,
    authenticated:false,
    user:{}
}

const authSlice = createSlice({
    name:"authentication",
    initialState,
    reducers:{
        login_req:(state)=>{
            state.loading = true,
            state.error = null,
            state.authenticated = false,
            state.user = {}
        },
        login_success:(state,action)=>{
            state.loading = false,
            state.error = null,
            state.authenticated = true ,
            state.user = action.payload.user;
        },
        login_fail:(state,action)=>{
            state.loading = false,
            state.error = action.payload.error,
            state.authenticated = false ,
            state.user = {}
        }
    }

});

export default authSlice.reducer;
export const {login_fail,login_req,login_success} = authSlice.actions;