import {configureStore} from '@reduxjs/toolkit';
import productReducer from './reducer/product_reducer';
import searchquery_reducer from './reducer/searchquery_reducer';
import auth_reducer from './reducer/auth_reducer';
const store = configureStore({
    reducer:{
        all_products:productReducer,
        searchQuery:searchquery_reducer,
        authentication:auth_reducer
    }
})

export default store;