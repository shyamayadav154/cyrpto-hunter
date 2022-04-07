
import axios from 'axios'
import React,{useState} from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../../config/api'
import { useCryptoStat } from '../../context/CryptoContext'
import {numberWithCommas} from '../../utils/utils'


 const carousel={
        height:'50%',
        display:'flex',
        alignItems:'center'
    }

    const carouselItem = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase',
      color: 'white',
    }

 
const Carousel = () => {
    const {currency,symbol} = useCryptoStat()
    const [trending, setTrending] = useState([])
    const fetchTrendingCoins = async()=>{
        const {data} = await axios.get(TrendingCoins(currency))
        console.log(data);
        setTrending(data)
    }

    React.useEffect(()=>{
        fetchTrendingCoins()
    },[currency])

    const responsive ={
        0:{
            items:2
        },
        512:{
            items:4
        }
    }

    

const items = trending.map((coin)=>{
    let profit = coin.price_change_percentage_24h >=0
    return (
      <Link style={carouselItem} to={`/coin/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height='80'
          style={{ marginBottom: 10 }}
        />
        <span> {coin?.symbol}&nbsp;
        <span style={{
            color:profit>0? 'rgb(14,203,129)': 'red',
            fontWeight: 500,
        }}>{profit && '+'}{coin?.price_change_percentage_24h.toFixed(2)}%</span>
        </span>

        <span style={{fontSize: 22, fontWeight:500}}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    )
})
   
  return (
    <div style={carousel}>
        <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}/>

    </div>
  )
}

export default Carousel