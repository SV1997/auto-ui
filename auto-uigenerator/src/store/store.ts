import {configureStore} from '@reduxjs/toolkit';
import elements from './elementsSlice'
import authSlice from './authSlice'
const store = configureStore({
    reducer:{
        auth:authSlice,
        elements:elements
    }
})

export default store;