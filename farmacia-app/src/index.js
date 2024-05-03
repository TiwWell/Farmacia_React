import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ClientPage from './pages/ClientPage';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from 'react-modal'; // Importe o Modal
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Medicine from './pages/MedicinePage';
import Nav from './components/Nav';
import Home from './pages/HomePage';

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav />}>
                    <Route index element={<Home />} />
                    <Route path="medicine" element={<Medicine />} />
                    <Route path="client" element={<ClientPage />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
Modal.setAppElement('#root');

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);

reportWebVitals();
