import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form className="col-md-4">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Digite seu usuário"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="d-grid">
            <button type="button" className="btn btn-primary" onClick={handleLogin}>
              Logar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
