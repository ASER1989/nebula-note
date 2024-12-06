import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';
import './index.css';
import { store } from './store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <Router>
            <StrictMode>
                <App />
            </StrictMode>
        </Router>
    </Provider>,
);
