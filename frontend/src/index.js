import React from "react";
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';

import App from './App.js';
import './index.css';

import{BrowserRouter as Router } from 'react-router-dom';

const container= document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
    <Router>
<App />

</Router>, 
);
