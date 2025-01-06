import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from 'react-modal'; // Importe o Modal
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Medicine from './pages/MedicinePage';
import Nav from './components/Nav/Nav';
import Home from './pages/HomePage';
import PharmaceuticalPage from './pages/PharmaceuticalPage';
import FormPage from './pages/FormPage';
import LoginPage from './pages/LoginPage';
import ClientPage from './pages/ClientPage'; // Certifique-se de importar ClientPage

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} /> {/* Altere para LoginPage */}
                <Route path="/home" element={<Nav />}>
                    <Route index element={<Home />} />
                    <Route path="remedios" element={<Medicine />} />
                    <Route path="clientes" element={<ClientPage />} />
                    <Route path="farmaceuticos" element={<PharmaceuticalPage />} />                    
                    <Route path="cadastro" element={<FormPage />} />
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
