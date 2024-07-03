import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component } from "react";

export default class Joinus extends Component {
  render() {
    return (
      <>
        <Head>
          <title>
            Frantzdy Trading CO - Trading become easier when you trade with us
          </title>
        </Head>
        <Navbar />

        <div className="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row my-2">
                <div class="col-sm-6 m-auto">
                  <div className="card">
                    <div className="card-body text-center">
                      <h1 className="head-text-big">
                        Join Frantzdy Trading CO
                      </h1>
                      <p className="mb-0 p-tag-big ">
                        Trading become easier when you trade with us
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section className="mt-3">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card card-default">
                      <div className="card-header border-0 text-center">
                        You will be charged <br />
                        <h1 className="mb-0">$499/Month</h1>
                      </div>
                      <div className="card-body">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">
                            Receive real-time buy/sell signals.
                          </li>
                          <li className="item">
                            See real-time profit/loss and open positions.
                          </li>
                          <li className="item">
                            Set up live Trading at a supported broker (You can
                            do this after you subscribe).
                          </li>
                        </ul>
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary mt-4"
                            href="/register"
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card card-secondary">
                      <div className="card-header border-0 text-center">
                        You will be charged <br />
                        <h1 className="mb-0">$499/Month</h1>
                      </div>
                      <div className="card-body">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">
                            Receive real-time buy/sell signals.
                          </li>
                          <li className="item">
                            See real-time profit/loss and open positions.
                          </li>
                          <li className="item">
                            Set up live Trading at a supported broker (You can
                            do this after you subscribe).
                          </li>
                        </ul>
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary mt-4"
                            href="/register"
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card card-default">
                      <div className="card-header border-0 text-center">
                        You will be charged <br />
                        <h1 className="mb-0">$499/Month</h1>
                      </div>
                      <div className="card-body">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">
                            Receive real-time buy/sell signals.
                          </li>
                          <li className="item">
                            See real-time profit/loss and open positions.
                          </li>
                          <li className="item">
                            Set up live Trading at a supported broker (You can
                            do this after you subscribe).
                          </li>
                        </ul>
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary mt-4"
                            href="/register"
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
