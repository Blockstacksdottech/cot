export default function Sidebar() {
  return (
    <aside className="main-sidebar main-sidebar-custom sidebar-light-primary elevation-1">
      <a className="brand-link">
        <img
          src="/logo.png"
          alt="CopyTrading"
          className="brand-image img-circle elevation-1"
        />
        <span className="brand-text font-weight-light">CopyTrading</span>
      </a>

      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/dist/img/avatar5.png"
              className="img-circle elevation-1"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              User Name
            </a>
          </div>
        </div>

        <div className="form-inline">
          <p className="mx-auto m-0">Viewing Site as</p>
          <div className="btn-group btn-block">
            <a className="btn btn-primary btn-sm" href="/investor/dashboard">
              INVESTOR
            </a>
            <a
              className="btn btn-outline-primary btn-sm"
              href="/manager/dashboard"
            >
              MANAGER
            </a>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href="/investor/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/investor/watchlist" className="nav-link">
                <i class="nav-icon fas fa-binoculars"></i>
                <p>My Watch List</p>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon far fa-chart-bar"></i>
                <p>
                  Find Strategy
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="/investor/leaderboard" class="nav-link">
                    {/* <i class="far fa-circle nav-icon"></i> */}
                    <p>Leader Board</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar-custom">
        <a href="#" className="btn btn-link btn-sm">
          <i className="fas fa-cog"></i>
        </a>
        <a
          href="/login"
          className="btn btn-outline-danger btn-sm hide-on-collapse pos-right"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </div>
    </aside>
  );
}
