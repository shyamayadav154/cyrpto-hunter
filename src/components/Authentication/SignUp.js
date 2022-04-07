import React,{useState} from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useCryptoStat } from '../../context/CryptoContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'
import { setAlert } from '../../features/crypto/cryptoSlice'
import { useSelector,useDispatch } from 'react-redux'
const SignUp = ({handleClose}) => {
  const dispatch = useDispatch()
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [confirmPassword, setConfirmPassword] = useState("")
    //  const {setAlert} = useCryptoStat()

       const handleSubmit = async () => {
            if (password !== confirmPassword) {
                dispatch(setAlert({
                    open:true,
                    message:'Passwords do not match',
                    type:'error'
                }))
                return
            } 
            try {
                const result = await createUserWithEmailAndPassword(auth,email,password)
                console.log(result);
                dispatch(setAlert({
                    open:true,
                    message:`sign up successful. Welcome ${result.user.email}`,
                    type:'success'
                }))
                handleClose()
            } catch (error) {
                dispatch(setAlert({
                    open:true,
                    message:error.message,
                    type:'error'
                }))
                return
            }
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
        type='password'
        label='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        id='confirm'
        type='password'
        label='Confirm Password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        variant='contained'
        size='large'
        style={{ backgroundColor: '#EEBC1D' }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  )
}

export default SignUp