import React from 'react';
import App from './App';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
