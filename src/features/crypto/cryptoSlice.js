import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CoinList, SingleCoin, TrendingCoins } from '../../config/api'
import axios from 'axios'

//initial states

const initialState = {
  currency: 'INR',
  symbol: '₹',
  loading: false,
  coins: [],
  singleCoin:[]
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
export const fetchSingleCoin = createAsyncThunk(
  'cryptoStates/fetchSingleCoin',

  async (id) => {
    try {
      const resp = await axios.get(SingleCoin(id))
      return resp.data
    } catch (error) {
      console.log('fetch error')
    }
  }
)
export const fetchTrendingCoins = createAsyncThunk(
  'cryptoState/fetchTrendingCoins',
  async (currency) => {
    try {
      const resp = await axios.get(TrendingCoins(currency))
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

export const { reducerName } = cryptoSlice.actions

export const selectCoins = (state) => state.coins

export default cryptoSlice.reducer
