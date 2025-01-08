import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  return (
    <div className="container login-page d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <form class="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <span class="input-span">
            <label for="email" class="label">Email</label>
            <input type="email" name="email" id="email"
            /></span>
          <span class="input-span">
            <label for="password" class="label">Senha</label>
            <input type="password" name="password" id="password"
            /></span>
          <span class="span"><a href="#">Esqueceu a senha?</a></span>
          <input class="submit" type="submit" value="Entrar" />
          <span class="span">Não Possui conta? <a href="#">Cadastre-se</a></span>
        </form>


      </div>
    </div>
  );
}

export default LoginPage;
