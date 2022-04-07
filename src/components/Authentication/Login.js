import { Box, Button, TextField } from '@mui/material'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React,{useState} from 'react'
import { auth } from '../../config/firebaseConfig'
import { useCryptoStat } from '../../context/CryptoContext'

const Login = ({handleClose}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setAlert} = useCryptoStat()
    const handleSubmit=async()=>{
        if(!email || !password){
            setAlert({
                open:true,
                message:'Please fill all the fields ',
                type:'error'
            })
        }
        try {
                const result = await signInWithEmailAndPassword(auth,email,password)
                 setAlert({
                    open:true,
                    message:`sign in successful. Welcome ${result.user.email}`,
                    type:'success'
                })
                handleClose()
        } catch (error) {
            setAlert({
                open:true,
                message:error.message,
                type:'error'
            })
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
    </Box>
  )
}

export default Login