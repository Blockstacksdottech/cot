"use client";
import { useRouter } from "next/router";
import { formatImage, logout, req } from "@/helpers";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/contexts/UserContextData";

export default function Navbar({}) {
  const nav = useRouter();
  const { user, setUser } = useContext(UserContext);
  const [image, setImage] = useState(null);
  const fetchUserImage = async () => {
    const resp = await req("user-image");
    if (resp) {
      console.log(resp);
      setImage(resp);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    if (user.logged) {
      fetchUserImage();
    }
  }, [user]);

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
                <a className="nav-link" href="/cotreport">
                  COT REPORTS
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/sentimentdata">
                  SENTIMENTS
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/cotscanner">
                  COT SCANNER
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/contact">
                  CONTACT US
                </a>
              </li>
              {(!user || !user.logged) && (
                <li className="nav-item">
                  <div class="btn-group">
                    <a className="btn btn-secondary" href="/login">
                      Login
                    </a>
                    <a className="btn btn-info" href="/register">
                      Join Us
                    </a>
                  </div>
                </li>
              )}

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
              {user && user.logged && (
                <li className="nav-item dropdown user-menu">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <img
                      src={
                        image
                          ? formatImage(image.profile_picture)
                          : "/dist/img/avatar5.png"
                      }
                      className="user-image img-circle elevation-2"
                      alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                    />
                    <span className="d-none d-md-inline text-white">
                      {user && user.username}
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <li className="user-header bg-primary">
                      <img
                        src={
                          image
                            ? formatImage(image.profile_picture)
                            : "/dist/img/avatar5.png"
                        }
                        className="img-circle elevation-2"
                        alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                      />
                      <p className="mb-2 text-white">{user && user.username}</p>
                    </li>
                    <li className="user-footer">
                      <a href="/account" className="btn btn-default btn-flat">
                        Account
                      </a>
                      <a
                        onClick={() => logout(nav, setUser)}
                        className="btn btn-default btn-flat float-right"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
