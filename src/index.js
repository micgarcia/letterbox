import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import app from "./components/utils/firebase.js";
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />

);

