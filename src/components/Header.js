import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

import { useNavigate } from 'react-router-dom'
import { useCryptoStat } from '../context/CryptoContext'
import AuthModal from './Authentication/AuthModal'
import UserSidebar from './UserSidebar'

const Header = () => {

    const navigate = useNavigate()
    const {currency,setCurrency,user} = useCryptoStat()

  const title = {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  }

  const darkTheme = createTheme({
      palette:{
          primary:{
              main:'#fff',
          },
         
          mode:'dark'
      }
  })

 
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static' color='transparent'>
        <Container>
          <Toolbar>
            <Typography onClick={() => navigate('/')} sx={title}>
              Crypto Hunter
            </Typography>
            <Select
              variant='outlined'
              value={currency}
              sx={{ width: 100, height: 40, marginLeft: 2 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'INR'}>INR</MenuItem>
            </Select>
            {user ? <UserSidebar/> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
