import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import Modal from 'react-modal'; // Importe o Modal

Modal.setAppElement('#root');

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
