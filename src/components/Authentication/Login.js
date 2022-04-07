import { Box, Button, TextField } from '@mui/material'
import { GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'
import React,{useState} from 'react'
import { auth } from '../../config/firebaseConfig'
import { useCryptoStat } from '../../context/CryptoContext'
import { setAlert } from '../../features/crypto/cryptoSlice'
import { useDispatch } from 'react-redux'
import GoogleButton from 'react-google-button'
import { signInWithPopup } from 'firebase/auth'


const google = {

  paddingTop: 0,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: 2,
  fontSize: 20,
}


const Login = ({handleClose}) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const {setAlert} = useCryptoStat()
    const handleSubmit=async()=>{
        if(!email || !password){
            dispatch(setAlert({
                open:true,
                message:'Please fill all the fields ',
                type:'error'
            }))
        }
        try {
                const result = await signInWithEmailAndPassword(auth,email,password)
                 dispatch(setAlert({
                    open:true,
                    message:`sign in successful. Welcome ${result.user.email}`,
                    type:'success'
                }))
                handleClose()
        } catch (error) {
            dispatch(setAlert({
                open:true,
                message:error.message,
                type:'error'
            }))
        }
    }

     const googleProvider = new GoogleAuthProvider()

    const signInWithGoogle = () => {
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          setAlert({
            open: true,
            message: `Sign Out Successful`,
            type: 'success',
          })
        })
        .catch((error) => {
          setAlert({
            open: true,
            message: error.message,
            type: 'error',
          })
        })
      return
    }

  return (
    <Box
      p={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <TextField
        id='email'
        label='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        id='password'
        label='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant='contained'
        size='large'
        onClick={handleSubmit}
        style={{ backgroundColor: '#EEBC1D' }}
      >
        Login
      </Button>
      <Box sx={google}>
        <span>OR</span>
        <GoogleButton
          style={{ width: '100%', outline: 'none' }}
          onClick={signInWithGoogle}
        />
      </Box>
    </Box>
  )
}

export default Login