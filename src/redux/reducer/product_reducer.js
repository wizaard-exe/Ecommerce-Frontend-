import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    error:null,
    all_products: [],
    total_products:0,
    limit:0,
    maxPrice:0,
}

const product_reducer  = createSlice({
    name:"getAllProducts",
    initialState,
    reducers:{
        getAllProduct_req:(state,action)=>{
            state.loading = true,
            state.error = null,
            state.all_products =  [],
            state.total_products = 0,
            state.limit = 0,
            state.maxPrice = 0
        },
        getAllProduct_success:(state,action)=>{
            state.loading = false,
            state.error = null,
            state.all_products = action.payload.data,
            state.total_products = action.payload.total_products,
            state.limit = action.payload.limit,
            state.maxPrice = action.payload.maxPrice
        },
        getAllProduct_fail:(state,action)=>{
            state.loading = false,
            state.error = action.payload.error,
            state.all_products =  [],
            state.total_products = 0,
            state.limit = 0,
            state.maxPrice = 0
        },
    }
});

export const {getAllProduct_req, getAllProduct_success, getAllProduct_fail } = product_reducer.actions;
export default product_reducer.reducer;