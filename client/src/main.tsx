import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import Store from "@client/utils/store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Store>
        <App/>
    </Store>
);
