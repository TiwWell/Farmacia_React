import { Link, Outlet } from 'react-router-dom';
import './Nav.css';
function Nav() {
  return (<>
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-lg bg-info">
          <div className="container-fluid">
            <span className="navbar-brand" >Farmácia</span>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/client">Clientes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/medicine">Remedios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pharmaceutical">Farmaceuticos</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
    <Outlet/>
  </>
  );
}

export default Nav;