import {configureStore} from '@reduxjs/toolkit';
import coordinate from './coordinatesSlice'
import authSlice from './authSlice'
const store = configureStore({
    reducer:{
        auth:authSlice,
        coordinates:coordinate
    }
})

export default store;