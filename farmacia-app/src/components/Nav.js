import './Nav.css';
function Nav() {
    return (
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-lg bg-info">
            <div className="container-fluid">
              <a className="navbar-brand" href="google.com">Farmácia</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="google.com">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" target="_blank" href="www.google.com">Clientes</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="google.com">Remedios</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="google.com">Farmaceuticos</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
  
  export default Nav;