import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component } from "react";

export default class Checkout extends Component {
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
                  <h1>Checkout & Payment</h1>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section className="mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header text-center">
                        <h5 className="mb-0">Order Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item text-size-15">
                            Plan: BASIC - $499/Month
                          </li>
                          <li className="item text-size-15">
                            Duration: 1 Month
                          </li>
                          <li className="item">
                            <h5>Total: $499/Month</h5>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card">
                      <div className="card-header border-0 text-center">
                        You will be charged <br />
                        <h1 className="mb-0">$499/Month</h1>
                      </div>
                      <div className="card-body">
                        <div className="my-2">
                          <div className="form-group">
                            <label>Subscription Method</label>
                            <select className="form-control">
                              <option>Choose</option>
                              <option>American Express</option>
                              <option>Master Card</option>
                              <option>Visa</option>
                              <option>Discover</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Card Number</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Card Number"
                            />
                          </div>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label>Expiration Date</label>
                                <div className="input-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Month"
                                  />
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Year"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label>CVV</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="CVV"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="form-group text-center mb-0">
                            <a
                              type="submit"
                              className="btn btn-primary"
                              href="/investor/trade"
                            >
                              Secure Payment
                            </a>
                          </div>
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
