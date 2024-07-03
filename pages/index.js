import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React from "react";
import TradingViewTicker from "./components/frontend/tradingviewticker";

function index() {
  const initDataTable = () => {
    const script = document.createElement("script");
    script.src = "/dist/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);
    return initDataTable();
  };
  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
      </Head>
      <Navbar />

      <div className="content-wrapper">
        <div className="content content-index">
          <section className="bg-offwhite">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-6 order-1 order-md-0 align-self-md-center">
                  <div className="row pb-3 pb-sm-5 pb-xl-9 mt-md-10 justify-content-sm-center">
                    <div className="col-12 col-sm-10">
                      <h1 className="fw-bolder mb-4 text-fdark">
                        Charting Tools for In-Depth Analysis of Commitment of
                        Traders (COT) REPORTS
                      </h1>
                      <div className="row">
                        <div className="col-12 col-xxl-8">
                          <p className="fs-5 mb-5 banner-text  text-fdark">
                            Unlock the power of Commitment of Traders (COT)
                            report analysis with our interactive charting tools
                            for better trading decisions.
                          </p>
                        </div>
                      </div>
                      <div className="d-grid gap-2 d-sm-flex">
                        <a
                          type="button"
                          className="btn btn-primary"
                          href="/joinus"
                        >
                          Join for COT REPORTS
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 p-0">
                  <img
                    className="img-fluid w-100 h-100 object-fit-cover"
                    loading="lazy"
                    src="./trade.jpg"
                    alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="container-fluid p-0">
            <div className="row">
              <div className="col-lg-12">
                <TradingViewTicker symbol="AAPL" locale="en" theme="light" />
              </div>
            </div>
          </section>
          <section className="pt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <img
                    className="img-fluid"
                    loading="lazy"
                    src="./banner.jpg"
                    alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                  />
                </div>
                <div className="col-lg-6">
                  <h4 className="text-white pl-3">
                    What is Commitments of Traders Data?
                  </h4>
                  <p className="text-white mt-2 text-size-15 pl-3">
                    The Commitments of Traders (COT) report is a market report,
                    which is published weekly by the CFTC (Commodity Futures
                    Trading Commission). The COT report gives insights on the
                    positions of different market participants in the US. The
                    Position Data is based on REPORTS by different firms, like
                    clearing members and brokers. The COT classification/
                    category of each firm is based on the major business
                    purpose. This business purpose is specified by the firm
                    itself and is checked by the CFTC on veracity. At the point
                    of checking the classification, the CFTC does not know the
                    specific reasons for the positions of the traders. That
                    could lead to misleading information, because one trader
                    holds different positions of a specific future for different
                    reasons, but is specified in one classification for the
                    whole report. That's nothing evil, just something to keep in
                    mind on deeper COT analysis. The Commitments of Traders
                    Report is published on every Friday of the week at 03:30
                    E.T. The latest Cot Data Table contains the positions of the
                    different market participants from Tuesday the same week.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-4">
            <div className="container">
              <div className="content-header">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3 className="mb-4 text-white">Change in Positions</h3>
                    <p className="text-white text-size-16">
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on
                      meaningful content. Lorem ipsum may be used as a
                      placeholder before the final copy is available.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 mx-auto">
                  <div className="card card-primary">
                    <div className="card-body p-0">
                      <div className="table-responsive p-0">
                        <table
                          id="datatable-change"
                          className="table table-borderless table-hover m-0"
                        >
                          <thead>
                            <tr>
                              <th>Pair</th>
                              <th>1 Week</th>
                              <th>2 Week</th>
                              <th>3 Week</th>
                              <th>4 Week</th>
                              <th>5 Week</th>
                              <th>6 Week</th>
                              <th>7 Week</th>
                              <th>8 Week</th>
                              <th>9 Week</th>
                              <th>10 Week</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>USD/EURO</td>
                              <td>100%</td>
                              <td>30%</td>
                              <td>16%</td>
                              <td>12%</td>
                              <td>9%</td>
                              <td>1%</td>
                              <td>4%</td>
                              <td>2%</td>
                              <td>5%</td>
                              <td>10%</td>
                            </tr>
                            <tr>
                              <td>USD/EURO</td>
                              <td>100%</td>
                              <td>30%</td>
                              <td>16%</td>
                              <td>12%</td>
                              <td>9%</td>
                              <td>1%</td>
                              <td>4%</td>
                              <td>2%</td>
                              <td>5%</td>
                              <td>10%</td>
                            </tr>
                            <tr>
                              <td>USD/EURO</td>
                              <td>100%</td>
                              <td>30%</td>
                              <td>16%</td>
                              <td>12%</td>
                              <td>9%</td>
                              <td>1%</td>
                              <td>4%</td>
                              <td>2%</td>
                              <td>5%</td>
                              <td>10%</td>
                            </tr>
                            <tr>
                              <td>USD/EURO</td>
                              <td>100%</td>
                              <td>30%</td>
                              <td>16%</td>
                              <td>12%</td>
                              <td>9%</td>
                              <td>1%</td>
                              <td>4%</td>
                              <td>2%</td>
                              <td>5%</td>
                              <td>10%</td>
                            </tr>
                            <tr>
                              <td>USD/EURO</td>
                              <td>100%</td>
                              <td>30%</td>
                              <td>16%</td>
                              <td>12%</td>
                              <td>9%</td>
                              <td>1%</td>
                              <td>4%</td>
                              <td>2%</td>
                              <td>5%</td>
                              <td>10%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="my-5">
            <div class="container">
              <div class="row">
                <div class="offset-xl-3 col-xl-6 col-md-12">
                  <div class="text-center mb-8">
                    <h1 class="fw-bolder mb-3 text-white">Testimonials</h1>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 col-12">
                  <div class="card">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>

                      <p class="fs-3 text-dark fw-semibold">
                        "Frantzy Trading Co. has been instrumental in my trading
                        success. Their deep COT and CFTC data analysis has given
                        me the edge I needed to make informed decisions. Their
                        insights are always spot-on and timely. I highly
                        recommend their services to any serious trader."
                      </p>

                      <div class="d-flex mt-4 align-items-center">
                        <div class="ml-2">
                          <h5 class="text-primary mb-0">- Michael J.</h5>
                          <p>Professional Trader</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <div class="card">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "I've been using Frantzy Trading Co.'s COT and CFTC
                        reports for the past year, and the results have been
                        phenomenal. Their data is comprehensive, and their
                        analysis is easy to understand and apply. I've
                        significantly improved my trading performance since I
                        started using their services."
                      </p>
                      <div class="d-flex mt-4 align-items-center">
                        <div class="ml-2">
                          <h5 class="text-primary mb-0">- Sarah L</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <div class="card">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>

                      <p class="fs-3 text-dark fw-semibold">
                        "Frantzy Trading Co. provides unparalleled detail in
                        their COT and CFTC reports. The accuracy and depth of
                        their analysis have helped me stay ahead of market
                        trends. Their customer support is also exceptional,
                        always ready to assist with any queries I have."
                      </p>

                      <div class="d-flex mt-4 align-items-center">
                        <div class="ml-2">
                          <h5 class="text-primary mb-0">- John D.</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <div class="card">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "The expertise of Frantzy Trading Co. in COT and CFTC
                        data analysis is truly impressive. Their reports have
                        become a crucial part of my trading strategy. The
                        actionable insights I gained from their analysis have
                        led to more profitable trades and a better understanding
                        of market dynamics."
                      </p>
                      <div class="d-flex mt-4 align-items-center">
                        <div class="ml-2">
                          <h5 class="text-primary mb-0">- Emily R.</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <div class="card">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "As a seasoned trader, I've relied on various sources
                        for market data, but Frantzy Trading Co. stands out with
                        its exceptional COT and CFTC reports. Their detailed
                        analysis and clear presentation make it easy to grasp
                        complex market movements. I trust their insights to
                        guide my trading decisions."
                      </p>
                      <div class="d-flex mt-4 align-items-center">
                        <div class="ml-2">
                          <h5 class="text-primary mb-0">- David M.</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 col-12">
                  <div class="card">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "Frantzy Trading Co. has been a game-changer for my
                        trading approach. Their thorough analysis of COT and
                        CFTC data has provided me with valuable insights that
                        have consistently translated into profitable trades.
                        Their dedication to quality and accuracy is evident in
                        every report they produce."
                      </p>
                      <div class="d-flex mt-4 align-items-center">
                        <div class="ml-2">
                          <h5 class="text-primary mb-0">- Laura B.</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mt-3">
            <div className="container">
              <div className="row mb-5">
                <div className="col-lg-12">
                  <h1 className="fw-bolder text-white text-center">
                    Contact Us
                  </h1>
                </div>
              </div>
              <div class="row">
                <div class="col-5 text-center d-flex align-items-center justify-content-center">
                  <div class="text-white">
                    <h2>Frantzdy Trading CO</h2>
                    <p class="lead mb-5">
                      Email: testing@mail.com
                      <br />
                      Phone: +1 234 56789012
                    </p>
                  </div>
                </div>
                <div class="col-7">
                  <div className="row">
                    <div className="col-lg-4">
                      <div class="form-group">
                        <label className="text-white">Name</label>
                        <input
                          type="text"
                          id="inputName"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="form-group">
                        <label className="text-white">E-Mail</label>
                        <input
                          type="email"
                          id="inputEmail"
                          class="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div class="form-group">
                        <label className="text-white">Subject</label>
                        <input
                          type="text"
                          id="inputSubject"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div class="form-group">
                        <label className="text-white">Message</label>
                        <textarea
                          id="inputMessage"
                          class="form-control"
                          rows="4"
                        ></textarea>
                      </div>
                      <div class="form-group float-right">
                        <input
                          type="submit"
                          class="btn btn-secondary"
                          value="Send message"
                        />
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

export default index;
