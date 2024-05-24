import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import React, { Component } from "react";

export default class Cotdata extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "/dist/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);
  }
  render() {
    return (
      <>
        <Head>
          <title>Commitments of Traders (COT) Reports</title>
          <meta
            name="description"
            content="Commitments of Traders (COT) Reports"
          />
        </Head>

        <Navbar />

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-12">
                  <h1 className="m-0">Commitments of Traders (COT) Reports</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-lg-12">
                  <form>
                    <label>Import Data Source</label>
                    <div className="input-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="exampleInputFile"
                        />
                        <label className="custom-file-label">Choose file</label>
                      </div>
                      <div className="input-group-append">
                        <button className="btn btn-primary">Fetch data</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-primary card-outline">
                    <div className="card-body">
                      <div className="table-responsive p-0">
                        <table
                          id="datatable-Cotdata"
                          className="table table-bordered table-hover table-sm"
                        >
                          <thead>
                            <tr className="bg-light">
                              <th>Currency Pair</th>
                              <th>Overall</th>
                              <th>Category</th>
                              <th>Timeframe</th>
                              <th>Sentiment indicator</th>
                              <th>ADR</th>
                              <th>% Long</th>
                              <th>% Short</th>
                              <th>Rating</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>EUR &#8652; USD</td>
                              <td>NEUTRAL</td>
                              <td>SWEEX</td>
                              <td>Weekly</td>
                              <td>BUY</td>
                              <td>105.244</td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "25px" }}
                                >
                                  <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    style={{ width: "85%" }}
                                    aria-valuenow="85"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    85%
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "25px" }}
                                >
                                  <div
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                    style={{ width: "35%" }}
                                    aria-valuenow="35"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    35%
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                              </td>
                            </tr>
                            <tr>
                              <td>GBP &#8652; AUD</td>
                              <td>SELL</td>
                              <td>SWEEX</td>
                              <td>5 WEEK</td>
                              <td>BUY</td>
                              <td>105.244</td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "25px" }}
                                >
                                  <div
                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                    style={{ width: "55%" }}
                                    aria-valuenow="55"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    55%
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div
                                  className="progress"
                                  style={{ height: "25px" }}
                                >
                                  <div
                                    className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                    style={{ width: "35%" }}
                                    aria-valuenow="35"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  >
                                    35%
                                  </div>
                                </div>
                              </td>
                              <td>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
