import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api'
import { useCryptoStat } from '../context/CryptoContext'
import TableContainer from '@mui/material/TableContainer'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import LinearProgress from '@mui/material/LinearProgress'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Table from '@mui/material/Table'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useNavigate } from 'react-router-dom'
import { numberWithCommas } from '../utils/utils'
import Pagination from '@mui/material/Pagination'
import { useSelector,useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { fetchCoins } from '../features/crypto/cryptoSlice'

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },

    mode: 'dark',
  },
})

const rowStyle = {
  backgroundColor: '#16171a',
  cursor: 'pointer',
  fontFamily: 'Montserrat',
}

const pagination = {
  '& .MuiPaginationItem-root': {
    color: 'gold',
  },
}

const CoinsTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currency, symbol } = useCryptoStat()
  const [search, setSearch] = useState('')
   const [page, setPage] = useState(1)

   const {coins,loading} = useSelector(store=>store.cryptoData)
 


  useEffect(() => {
      dispatch(fetchCoins(currency))
    
  }, [currency])

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    )
  }



  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: 'Montserrat' }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          id='search'
          variant='outlined'
          style={{ marginBottom: 20, width: '100%' }}
          label='Search for crypto currency'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      key={head}
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      align={head === 'Coin' ? 'inherit' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().slice((page-1)*10,(page-1)*10+10).map((row) => {
                  const profit = row.price_change_percentage_24h > 0

                  return (
                    <TableRow
                      key={row.name}
                      sx={{
                        fontFamily: 'Montserrat',
                        '&:hover': {
                          backgroundColor: '#131111',
                          cursor: 'pointer',
                        },
                      }}
                      onClick={() => navigate(`/coin/${row.id}`)}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{
                          display: 'flex',
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height='50'
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span
                            style={{
                              textTransform: 'uppercase',
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{ color: 'darkgrey' }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align='right'>
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{
                          color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                          fontWeight: 500,
                        }}
                      >
                        {profit && '+'}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align='right'>
                        {symbol}{' '}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          sx={pagination}
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          onChange={(_,value)=>{
              setPage(value);
              window.scroll(0,450)
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
