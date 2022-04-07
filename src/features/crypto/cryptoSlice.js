import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CoinList, SingleCoin, TrendingCoins } from '../../config/api'
import axios from 'axios'

//initial states

const initialState = {
  currency: 'INR',
  symbol: '₹',
  loading: false,
  coins: [],
  singleCoin:[],
  alert:{
      open:false,
      message:'',
      type:''
  }
}

//actions async or compute

export const fetchCoins = createAsyncThunk(
  'cryptoStates/fetchCoin',

  async (currency) => {
    try {
      const resp = await axios.get(CoinList(currency))
      return resp.data
    } catch (error) {
      console.log('fetch error')
    }
  }
)


// slice or reducer

export const cryptoSlice = createSlice({
  name: 'cryptoStates',
  initialState,
  reducers:{
    setCurrency: (state,action) =>{
        state.currency = action.payload
        state.symbol = action.payload === 'INR'? '₹': '$'
    },
    setAlert:(state,action)=>{
        const {open,message,type} =action.payload
        state.alert = action.payload
    }
  },
  extraReducers: {
    [fetchCoins.pending]: (state) => {
      state.loading = true
    },
    [fetchCoins.fulfilled]: (state, action) => {
      console.log(action)
      state.loading = false
      state.coins = action.payload
    },
    [fetchCoins.rejected]: (state) => {
      state.loading = false
    },
   
  },
})

export const { setCurrency,setAlert } = cryptoSlice.actions

export const selectCoins = (state) => state.coins

export default cryptoSlice.reducer


