import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:null,
    watchlist:[]
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setWatchlist:(state,action)=>{
        state.watchlist = action.payload
    }
  },
});

export const { setUser,setWatchlist } = userSlice.actions;

export default userSlice.reducer;