import React,{useEffect} from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import {setUser} from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { useCryptoStat } from '../context/CryptoContext'
import AuthModal from './Authentication/AuthModal'
import UserSidebar from './UserSidebar'
import { setCurrency } from '../features/crypto/cryptoSlice'
import { useDispatch,useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../config/firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore'

import { setWatchlist } from '../features/user/userSlice'

  const darkTheme = createTheme({
      palette:{
          primary:{
              main:'#fff',
          },
         
          mode:'dark'
      }
  })

  
  const title = {
    
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',

  }

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const {user} = useCryptoStat()
    

    const { currency,coins:coin } = useSelector((store) => store.cryptoData)
    console.log(coin);
    const {user} = useSelector(store => store.userData)

    const currencyChange = (e) =>{
      dispatch(setCurrency(e.target.value))
    }
   


   useEffect(() => {
     onAuthStateChanged(auth, (user) => {
       if (user) dispatch(setUser(user))
       else dispatch(setUser(null))
     })
   }, [])

    useEffect(() => {
      let unsubscribe = () => {}
      if (user) {
        const coinRef = doc(db, 'watchlist', user.uid)

        unsubscribe = onSnapshot(coinRef, (coin) => {
          if (coin.exists()) {

            dispatch(setWatchlist(coin.data().coins))
          } else {
            console.log('no items in watchlist')
          }
        })
        return () => {
          unsubscribe()
        }
      }
    }, [user])



 
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography onClick={() => navigate('/')} sx={title}>
              Crypto Hunter
            </Typography>
            <div style={{display:'flex'}}>
              <Select
                variant='outlined'
                value={currency}
                sx={{ width: 100, height: 40, marginLeft: 2 }}
                onChange={currencyChange}
              >
                <MenuItem value={'USD'}>USD</MenuItem>
                <MenuItem value={'INR'}>INR</MenuItem>
              </Select>
              {user ? <UserSidebar /> : <AuthModal />}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
