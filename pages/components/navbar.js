"use client";
import { useRouter } from "next/router";
import { logout } from "@/helpers";

export default function Navbar({ user }) {
  const nav = useRouter();

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <div className="container">
        <a href="/" className="navbar-brand">
          <img
            src="/logo.png"
            alt="cot"
            className="brand-image img-circle elevation-1"
          />
          <span className="brand-text font-weight-light">COT</span>
        </a>
      </div>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link active">
            COT Reports
          </a>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown user-menu">
          <a
            href="#"
            className="nav-link dropdown-toggle"
            data-toggle="dropdown"
          >
            <img
              src="/dist/img/avatar5.png"
              className="user-image img-circle elevation-2"
              alt="User Image"
            />
            <span className="d-none d-md-inline">{user && user.username}</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <li className="user-header bg-primary">
              <img
                src="/dist/img/avatar5.png"
                className="img-circle elevation-2"
                alt="User Image"
              />

              <p className="mb-2">{user && user.username}</p>
            </li>
            <li className="user-footer">
              {/* <a href="#" className="btn btn-default btn-flat">
                Profile
              </a> */}
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
    </nav>
  );
}
