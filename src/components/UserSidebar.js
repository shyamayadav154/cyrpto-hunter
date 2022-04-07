import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { useCryptoStat } from '../context/CryptoContext'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'
import { styled } from '@mui/system'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { numberWithCommas } from '../utils/utils'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../features/crypto/cryptoSlice'

const Wrapper = styled('div')({
  width: 350,
  padding: 25,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'monospace',
})

const profile = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  height: '92%',
}

const picture = {
  width: 200,
  height: 200,
  cursor: 'pointer',
  backgroundColor: '#EEBC1D',
  objectFit: 'contain',
}

const logout = {
  height: '8%',
  width: '100%',
  backgroundColor: '#EEBC1D',
  marginTop: 2,
  '&:hover': {
    backgroundColor: 'white',
    color: 'black',
  },
}

const Watchlist = styled('div')({
  flex: 1,
  width: '100%',
  backgroundColor: 'grey',
  borderRadius: 10,
  padding: 15,
  paddingTop: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 12,
  overflowY: 'scroll',
})

const CoinContainer = styled('div')({
  padding: 10,
  borderRadius: 5,
  color: 'black',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#EEBC1D',
  boxShadow: '0 0 3px black',
})

export default function UserSidebar() {
  const dispatch = useDispatch()
  const [state, setState] = React.useState({
    right: false,
  })

  // const { user, watchlist } = useCryptoStat()
  const {user,watchlist} = useSelector(store=>store.userData)
  
  const { coins, symbol } = useSelector((store) => store.cryptoData)

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const logoutButton = async () => {
    await signOut(auth)
    setAlert({
      open: true,
      message: 'Logout Successful',
      type: 'success',
    })
    toggleDrawer()
  }
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, 'watchlist', user.uid)
    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        { merge: 'true' }
      )
      dispatch(setAlert({
        open: true,
        message: `${coin.name} removed from the Watchlist !`,
        type: 'success',
      }))
    } catch (error) {
      dispatch(setAlert({
        open: true,
        message: error.message,
        type: 'error',
      }))
    }
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: 'pointer',
              backgroundColor: '#eebc1d',
            }}
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <Wrapper>
              <Box sx={profile}>
                <Avatar
                  sx={picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: '100%',
                    fontSize: 25,
                    textAlign: 'center',
                    fontWeight: 'bolder',
                    wordWrap: 'break-word',
                    marginBottom: 20,
                  }}
                >
                  {user.displayName || user.email}
                </span>
              </Box>
              <Watchlist>
                <span style={{ fontSize: 15, textShadow: '0 0 5px black' }}>
                  Watchlist
                </span>

                {coins.map((coin) => {
                  if (watchlist.includes(coin.id))
                    return (
                      <CoinContainer key={coin.id} >
                        <span>{coin.name}</span>
                        <span style={{ display: 'flex', gap: 8 }}>
                          {symbol}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <AiFillDelete
                            style={{ cursor: 'pointer', fontSize: 16 }}
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span>
                      </CoinContainer>
                    )
                })}
              </Watchlist>

              <Button sx={logout} onClick={() => logoutButton()}>
                Log Out
              </Button>
            </Wrapper>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
