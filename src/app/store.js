import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice'
export const store = configureStore({
    reducer:{
        cryptoData:cryptoReducer
    }
})