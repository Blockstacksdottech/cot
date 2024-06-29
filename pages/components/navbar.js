"use client";
import { useRouter } from "next/router";
import { logout } from "@/helpers";

export default function Navbar({ user }) {
  const nav = useRouter();

  return (
    <nav className="main-header navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href="#">
        <img src="/logo-admin.png" className="img-fluid" />
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
              COT Reports
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
          <li className="nav-item dropdown user-menu">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
            >
              <img
                src="/dist/img/avatar5.png"
                className="user-image img-circle elevation-2"
                alt="Frantzdy Trading CO - Trading become easier when you trade with us"
              />
              <span className="d-none d-md-inline">
                {user && user.username}
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <li className="user-header bg-primary">
                <img
                  src="/dist/img/avatar5.png"
                  className="img-circle elevation-2"
                  alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                />
                <p className="mb-2">{user && user.username}</p>
              </li>
              <li className="user-footer">
                <a href="/account" className="btn btn-default btn-flat">
                  Account
                </a>
                <a
                  onClick={() => logout(nav)}
                  className="btn btn-default btn-flat float-right"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
