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
              {user && user.isAdmin && (
                <li className="nav-item active">
                  <a className="nav-link" href="/cot-data">
                    COT DATA
                  </a>
                </li>
              )}

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
                <a className="nav-link" href="/video-pdf">
                  Video's & Pdf
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/announcement">
                  ANNOUNCEMENT
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
                          : "/dist/img/avatar.png"
                      }
                      className="user-image img-circle elevation-2"
                      alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                    />
                    <span className="d-none d-md-inline text-white">
                      {user && user.username}
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right text-right">
                    {user && user.isAdmin && (
                      <li className="user-footer bg-primary">
                        <a href="/userlist">Users</a>
                      </li>
                    )}

                    {user && user.isAdmin && (
                      <li className="user-footer bg-primary">
                        <a href="/createannouncement">Create Announcement</a>
                      </li>
                    )}

                    <li className="user-footer bg-primary">
                      <a href="/account">Account Management</a>
                    </li>

                    {user && !user.isAdmin && (
                      <li className="user-footer bg-primary">
                        <a href="/subscription">Subscription</a>
                      </li>
                    )}

                    {user && user.isAdmin && (
                      <li className="user-footer bg-primary">
                        <a href="/settings">Settings</a>
                      </li>
                    )}

                    <li className="bg-primary">
                      <hr className="m-0" />
                    </li>
                    <li className="user-footer bg-primary">
                      <a onClick={() => logout(nav, setUser)} href="#">
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
