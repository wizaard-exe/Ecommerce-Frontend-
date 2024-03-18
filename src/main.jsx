import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {Provider as ReduxProvider} from 'react-redux';
import store from './redux/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
  
)
