import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';

// // Create a script element for Naver Maps API
// const naverMapsScript = document.createElement('script');
// naverMapsScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=g8ghg73mlg`;
// naverMapsScript.async = true;

// // Append the script to the body
// document.body.appendChild(naverMapsScript);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    <GlobalStyle />
  </>
);
