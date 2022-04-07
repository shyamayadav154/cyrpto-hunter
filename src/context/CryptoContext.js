import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { onSnapshot } from 'firebase/firestore'
import React, { useState, useEffect, useContext } from 'react'
import { CoinList } from '../config/api'
import { auth } from '../config/firebaseConfig'
import { doc } from 'firebase/firestore'
import { db } from '../config/firebaseConfig'

const Crypto = React.createContext()

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState('INR')
  const [symbol, setSymbol] = useState('₹')
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [watchlist, setWatchlist] = useState([])
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success',
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      else setUser(null)
    })
  }, [])

  const fetchCoins = async () => {
    setLoading(true)

    const { data } = await axios.get(CoinList(currency))

    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    let unsubscribe = () => {}
    if (user) {
      const coinRef = doc(db, 'watchlist', user.uid)

      unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins)
        } else {
          console.log('no items in watchlist')
        }
      })
      return () => {
        unsubscribe()
      }
    }
  }, [user])

  useEffect(() => {
    if (currency === 'INR') setSymbol('₹')
    else if (currency === 'USD') setSymbol('$')
  }, [currency])
  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        setCoins,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext

export const useCryptoStat = () => {
  return useContext(Crypto)
}
