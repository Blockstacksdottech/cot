export default function Navbar() {
  return (
    <>
      <header>
        <nav className="main-header navbar navbar-expand-lg navbar-dark">
          <a className="navbar-brand" href="./">
            <img src="/logo.png" className="img-fluid" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="/cot-data">
                  COT REPORTS
                </a>
              </li>
              <li className="nav-item">
                <div class="btn-group">
                  <a className="btn btn-secondary" href="/login">
                    Login
                  </a>
                  <a className="btn btn-info" href="/joinus">
                    Join Us
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
