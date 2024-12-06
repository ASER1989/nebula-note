import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Router>
            <StrictMode>
                <App />
            </StrictMode>
        </Router>
    </Provider>,
);
