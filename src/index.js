import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';
import CryptoContext from './context/CryptoContext';

import { Provider } from 'react-redux';
import {store} from './app/store'


const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
  <CryptoContext>
  <Provider store={store}>

    <App />
  </Provider>
  </CryptoContext>
  </React.StrictMode>
);


