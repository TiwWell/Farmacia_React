import { Link, Outlet } from "react-router-dom";
import "./Nav.css";
import farmaciaNav from "./farmacia logo.jpg";

function Nav() {
  return (
    <>
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
              <img
                src={farmaciaNav}
                alt="Descrição da imagem"
                className="nav-image"
              />
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item home-li">
                    <Link className="nav-link" to="/home">
                      Pagina Inicial
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/clientes">
                      Clientes
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/remedios">
                      Remédios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/farmaceuticos">
                      Farmacêuticos
                    </Link>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  <p className="nav">📱 Faça seu pedido: (11) 99999-9999</p>
                </ul>
              </div>
            </div>
          </nav>
          {/* Alerta informando que o site está em desenvolvimento */}
          <div className="alert alert-warning" role="alert">
            Este site é um protótipo em desenvolvimento e se trata de uma versão
            inicial.
          </div>
        </header>
      </div>
      <Outlet />
    </>
  );
}

export default Nav;
