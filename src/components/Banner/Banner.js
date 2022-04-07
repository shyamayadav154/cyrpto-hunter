import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Carousel from './Carousel'


const banner = {
    backgroundImage: "url(./banner2.jpg)",
}

const bannerContent= {
    height:400,
    display:'flex',
    flexDirection:'column',
    paddingTop:25,
    justifyContent: 'space-around'
}

const tagline={
    display:'flex',
    height:'40%',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
   
}

const Banner = () => {

  return (
    <div style={banner}>
        <Container style={bannerContent} maxWidth="lg">
          <div style={tagline}>
              <Typography variant="h2" style={{fontWeight:"bold", marginBottom:15,fontFamily:"Montserrat"}}>
                Crypto Hunter
              </Typography>
              <Typography variant="subtitle2" style={{color:'darkGrey', textTransform: 'capitalize', fontFamily:'Montserrat'}}  >
                  Get all the Info regarding your favorite Crypto Currency
              </Typography>
          </div>
          <Carousel/>
        </Container>
    </div>
  )
}

export default Banner