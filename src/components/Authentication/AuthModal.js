import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Login from './Login'
import SignUp from './SignUp'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {auth} from '../../config/firebaseConfig'
import { useCryptoStat } from '../../context/CryptoContext'
import GoogleButton from 'react-google-button'
import { useDispatch } from 'react-redux'

const paper = {
  width: 400,
  backgroundColor: 'background.paper',
  color: 'white',

  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
 
  boxShadow: 24,
  
}



const AuthModal = () => {
  const dispatch = useDispatch()
     const [open, setOpen] = React.useState(false)
     const handleOpen = () => setOpen(true)
     const handleClose = () => setOpen(false)
     const [value, setValue] = React.useState(0)
   
     const handleChange = (event, newValue) => {
       setValue(newValue)
     }
  

    
  return (
    <div>
      <Button
        variant='contained'
        style={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: '#EEBC1D',
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Fade in={open}>
          <Box sx={paper}>
            <AppBar
              position='static'
              style={{
                backgroundColor: 'transparent',
                color: 'white',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant='fullWidth'
                style={{ borderRadius: 10 }}
              >
                <Tab label='Login' />
                <Tab label='Sign Up' />
              </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}
            
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default AuthModal