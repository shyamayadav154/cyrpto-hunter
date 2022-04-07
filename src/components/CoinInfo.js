import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { HistoricalChart } from '../config/api'
import { useCryptoStat } from '../context/CryptoContext'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import SelectButton from './SelectButton'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { CircularProgress } from '@mui/material'
import { Line } from 'react-chartjs-2/'
import { chartDays, numberWithCommas } from '../utils/utils'
import moment from 'moment'


Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },

    mode: 'dark',
  },
})

const Wrapper = styled('div')(({ theme }) => ({
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 25,
  padding: 40,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  },
}))

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState()
  const [days, setDays] = useState(1)
  // const { currency } = useCryptoStat()

  const {currency} = useSelector(store=>store.cryptoData)

  const fetchChartData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    console.log(data)
    setHistoricData(data.prices)
  }

  useEffect(() => {
    fetchChartData()
  }, [days])

  let coinTimeStamp = historicData?.map((coin) => {
    let date = moment(coin[0]).format('MMM Do YY')
    let time = moment(coin[0]).format('LT')

    return days === 1 ? time : date
  })

  let coinPrice = historicData?.map((coin) => coin[1])

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: `Price ( Past ${days} Days ) in ${currency}`,
        data: coinPrice,
        borderColor: '#EEBC1D',
        tension: 0.4,
      },
    ],
  }

  const options = {
    elements: {
      point: {
        radius: 1,
      },
    },
    scales: {
      y: {
        
        userCallback: function (value, index, values) {
          value = value.toString()
          value = value.split(/(?=(?:...)*$)/)
          value = value.join(',')
          return value
        },
      },
    },
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Wrapper>
        {!historicData ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line data={data} options={options} />
          </>
        )}
        <div
          style={{
            display: 'flex',
            marginTop: 20,
            justifyContent: 'space-around',
            width: '100%',
          }}
        >
          {chartDays.map((day) => (
            <SelectButton
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          ))}
        </div>
      </Wrapper>
    </ThemeProvider>
  )
}

export default CoinInfo
