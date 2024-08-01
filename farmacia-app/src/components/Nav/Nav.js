import { Link, Outlet } from 'react-router-dom';
import './Nav.css';
import farmaciaNav from './farmacia logo.jpg';

function Nav() {
  return (
    <>
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
            <img src={farmaciaNav} alt="Descrição da imagem" className="nav-image" />
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  <li className="nav-item home-li">
                    <Link className="nav-link" to="/home">Pagina Inicial</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/client">Clientes</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/medicine">Remédios</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pharmaceutical">Farmacêuticos</Link>
                  </li>
                </ul>
                <ul className="navbar-nav">
                  <p className="nav">📱 Faça seu pedido: (11) 96576-7416</p>
              </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
      <Outlet />
    </>
  );
}

export default Nav;
