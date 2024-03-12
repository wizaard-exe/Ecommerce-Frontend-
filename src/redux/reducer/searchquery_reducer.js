import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    searchQuery:""
}

const searchQueryReducer = createSlice({
    name:"searchQuery",
    initialState,
    reducers:{
        updateSearchQuery:(state,action)=>{
            state.searchQuery= action.payload.searchQuery;
        },
    },
})

export default searchQueryReducer.reducer;
export const {updateSearchQuery} = searchQueryReducer.actions;