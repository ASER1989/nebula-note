import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import Store from "@client/utils/store";
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Store>
    <Router>
      <App/>
    </Router>
  </Store>
);
