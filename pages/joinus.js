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
              <div class="row my-4">
                <div class="col-sm-12 text-center">
                  <h1 className="head-text-big text-white">
                    Join Frantzdy Trading CO
                  </h1>
                  <p className="mb-0 p-tag-big text-white">
                    Trading become easier when you trade with us
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section className="mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="h-100 card card-default">
                      <div className="card-header border-0 text-center">
                        BASIC
                        <h1 className="mb-0">$29/Month</h1>
                        <p>7-days free trial</p>
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">
                            Weekly COT report signal summaries
                          </li>
                          <li className="item">
                            Basic educational content on how to interpret COT
                            reports
                          </li>
                          <li className="item">Access to a community forum</li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
                            href="/register"
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="h-100 card card-secondary">
                      <div className="card-header border-0 text-center">
                        STANDARD
                        <h1 className="mb-0">$49/Month</h1>
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">All Basic Plan features</li>
                          <li className="item">
                            Bi-weekly COT report signal analysis
                          </li>
                          <li className="item">
                            Detailed breakdowns of major market positions (e.g.,
                            futures, options)
                          </li>
                          <li className="item">
                            Monthly webinars with market experts
                          </li>
                          <li className="item">Priority email support</li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
                            href="/register"
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="h-100 card card-default">
                      <div className="card-header border-0 text-center">
                        PREMIUM
                        <h1 className="mb-0">$79/Month</h1>
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">All Standard Plan features</li>
                          <li className="item">
                            Weekly in-depth COT report signal analysis
                          </li>
                          <li className="item">
                            Real-time alerts on significant COT report changes
                          </li>
                          <li className="item">
                            Access to exclusive market trend reports
                          </li>
                          <li className="item">
                            One-on-one consultation sessions (1 per month)
                          </li>
                          <li className="item">Dedicated account manager</li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
                            href="/register"
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="h-100 card card-secondary">
                      <div className="card-header border-0 text-center">
                        ENTERPRISE
                        <h2 className="mb-0">Custom Price</h2>
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">All Premium Plan features</li>
                          <li className="item">
                            Tailored COT report signal analysis based on
                            specific market interests
                          </li>
                          <li className="item">
                            Regular strategy sessions with top analysts
                          </li>
                          <li className="item">
                            On-demand market research reports
                          </li>
                          <li className="item">
                            Full access to historical COT data archives
                          </li>
                          <li className="item">
                            Priority support with a dedicated team
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
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
