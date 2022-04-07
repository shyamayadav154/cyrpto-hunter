import React from 'react'
import { useCryptoStat } from '../context/CryptoContext'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { Alert as Aler } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import { setAlert } from '../features/crypto/cryptoSlice'
const Alert = () => {
  // const {setAlert } = useCryptoStat()
  const dispatch = useDispatch()
  const {alert} = useSelector(store=>store.cryptoData)



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setAlert({ ...alert,open:false,message:'' }))
   
  }
  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={handleClose}
     
    >
      <Aler
        onClose={handleClose}
        elevation={10}
        variant='filled'
        severity={alert.type}
      >
          {alert.message}
      </Aler>
    </Snackbar>
  )
}

export default Alert
