import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
    reducer:{
        cryptoData:cryptoReducer,
        userData:userReducer
    }
})