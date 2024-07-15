import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component } from "react";
import Checker from "./components/Checker";

export default function VideoPdf() {
  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
      </Head>
      <Checker no_check={true} no_login={true}>
        <Navbar />

        <div className="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row my-5">
                <div class="col-lg-12 text-center">
                  <h1 className="head-text-big text-white">Video and PDF</h1>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section>
              <div className="container-fluid">
                <div class="row">
                  <div className="col-lg-8">
                    <div className="video">
                      <div class="embed-responsive embed-responsive-16by9">
                        <iframe
                          class="embed-responsive-item"
                          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <h5 className="text-white my-4 text-center">
                        Topic of Video goes here
                      </h5>
                    </div>
                    <div className="video">
                      <div class="embed-responsive embed-responsive-16by9 mb-4">
                        <iframe
                          class="embed-responsive-item"
                          src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <h5 className="text-white my-4 text-center">
                        Topic of Video goes here
                      </h5>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div class="card">
                      <div class="card-header">
                        <h3 class="card-title">PDF</h3>
                      </div>
                      <div class="card-body p-0">
                        <ul class="nav nav-pills flex-column">
                          <li class="nav-item">
                            <a class="nav-link p-tag-big" href="#" download>
                              <i class="fas fa-file-pdf"></i> Topic goes here
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link p-tag-big" href="#" download>
                              <i class="fas fa-file-pdf"></i> Topic goes here
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link p-tag-big" href="#" download>
                              <i class="fas fa-file-pdf"></i> Topic goes here
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link p-tag-big" href="#" download>
                              <i class="fas fa-file-pdf"></i> Topic goes here
                            </a>
                          </li>
                          <li class="nav-item">
                            <a class="nav-link p-tag-big" href="#" download>
                              <i class="fas fa-file-pdf"></i> Topic goes here
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Checker>

      <Footer />
    </>
  );
}
