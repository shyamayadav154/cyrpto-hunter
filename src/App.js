
import { styled } from '@mui/system';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import CoinPage from './pages/CoinPage'
import Homepage from './pages/Homepage'
import 'react-alice-carousel/lib/alice-carousel.css'
import Alert from './components/Alert'
import { Helmet } from 'react-helmet'

const Wrapper = styled('div')({

  backgroundColor: "#14161a",
  color:'white',
  minHeight:'100vh',
  
})

function App() {
 
  return (
    <BrowserRouter>
      <Wrapper>
        <Helmet>
        
          <link rel='icon' type='image/x-icon' href='../public/favicon.ico' />
        </Helmet>
        <Header />
        <Routes>
          <Route path='/' exact element={<Homepage />} />
          <Route path='/coin/:id' exact element={<CoinPage />} />
        </Routes>
        <Alert />
      </Wrapper>
    </BrowserRouter>
  )
}

export default App
