import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { useEffect, useState } from "react";
import TradingViewTicker from "./components/frontend/tradingviewticker";
import { req } from "@/helpers";

function Index() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(null);

  const fetchData = async () => {
    const resp = await req("top");
    if (resp && resp.length > 0) {
      setData(resp[0].data);
      setDate(resp[0].date);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <section className="bg-offwhite">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-6 p-0">
                  <img
                    className="img-fluid w-100 h-100 object-fit-cover"
                    loading="lazy"
                    src="./banner.jpg"
                    alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <div className="row pl-2 pt-3 pb-3">
                    <div className="col-12 col-sm-10">
                      <h1 className="fw-bolder mb-4 text-fdark">
                        Commitments of Traders (COT) Data
                      </h1>
                      <p className="text-size-15">
                        Refers to a weekly report published by the Commodity
                        Futures Trading Commission (CFTC) in the United States.
                        It provides insights into the positions held by various
                        market participants in futures markets. These
                        participants include commercial traders (typically
                        hedgers), non-commercial traders (such as large
                        speculators like hedge funds), and non-reportable
                        traders (small speculators).
                      </p>

                      <h4>Role of Frantzdy Trading Co. :</h4>
                      <p className="text-size-15">
                        Frantzdy Trading Co. specializes in analyzing and
                        interpreting COT data to provide valuable insights to
                        traders and investors. Our role includes:
                      </p>
                      <ul className="list-unstyled text-size-15">
                        <li>
                          <strong>1. Data Analysis:</strong> We meticulously
                          analyze COT reports to identify trends and changes in
                          market sentiment across different asset classes,
                          including commodities, currencies, and financial
                          futures.
                        </li>
                        <li>
                          <strong>2. Market Insights:</strong> By interpreting
                          COT data, we offer actionable insights on market
                          positioning. This helps traders understand the
                          dynamics between different types of market
                          participants and potential future price movements.
                        </li>
                        <li>
                          <strong>3. Strategic Advice:</strong> We provide
                          strategic advice based on our analysis of COT data,
                          helping traders make informed decisions and adjust
                          their trading strategies accordingly.
                        </li>
                        <li>
                          <strong>4. Educational Resources:</strong> Frantzdy
                          Trading Co. also educates traders on how to interpret
                          and utilize COT data effectively, empowering them to
                          enhance their trading methodologies and risk
                          management practices.
                        </li>
                      </ul>
                      <p className="text-size-15">
                        Through our expertise in COT data analysis, Frantzdy
                        Trading Co. aims to support traders in gaining a
                        competitive edge in the financial markets, enabling them
                        to navigate market volatility with confidence.
                      </p>
                    </div>
                  </div>
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
          <section className="py-4">
            <div className="container">
              <div className="content-header">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h1 class="fw-bolder mb-4 text-white">
                      Frantzdy Trading Co. : Expert Analysis on Change in
                      Position
                    </h1>
                    <p className="text-white text-size-16">
                      At Frantzdy Trading Co., we specialize in providing
                      insightful analysis on changes in market positions.
                      Leveraging our expertise in tracking shifts in investor
                      sentiment and market dynamics, we offer comprehensive
                      reports that highlight key movements in positions across
                      various asset classes. Our detailed analysis equips
                      traders with the essential insights needed to navigate
                      changing market conditions effectively. Whether you're
                      interested in understanding shifts in futures positions or
                      evaluating sentiment changes in forex markets, Frantzdy
                      Trading Co. delivers timely and actionable information to
                      optimize your trading strategies.
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
                            {date &&
                              data.length > 0 &&
                              data.map((e, i) => {
                                return (
                                  <tr>
                                    <td>{e.pair}</td>
                                    <td>{e.pair_pct_change.toFixed(2)}%</td>
                                    <td>{e.pair_2_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_3_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_4_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_5_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_6_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_7_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_8_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_9_week_change.toFixed(2)}%</td>
                                    <td>{e.pair_10_week_change.toFixed(2)}%</td>
                                  </tr>
                                );
                              })}
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
              <div className="content-header">
                <div class="row">
                  <div class="col-md-12">
                    <div class="text-center">
                      <h1 class="fw-bolder mb-4 text-white">About Me</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <div className="text-white">
                    <p className="text-size-16">Dear Reader,</p>
                    <p className="text-size-16">
                      I am Frantzdy Pierre, the CEO and founder of Frantzdy
                      Trading Co., LLC. Over the past five years, I have
                      navigated various trading strategies in my journey.
                      Despite my efforts, maintaining consistent profitability
                      has posed challenges. I believe many retail traders
                      encounter similar difficulties, leading to behaviors like
                      FOMO (Fear of Missing Out) that can undermine their
                      trading success.
                    </p>
                    <p className="text-size-16">
                      Driven by a passion for continuous improvement, I
                      constantly seek new knowledge to enhance my trading
                      skills. My exploration into Cot reports has significantly
                      refined my trading approach. In response, I have developed
                      a website where traders can not only learn my strategies
                      but also customize them to suit their needs.
                    </p>
                    <p className="text-size-16">
                      I am eager to share my insights and foster a community
                      where we can learn and grow together.
                    </p>
                    <p className="text-size-16 mb-0">Warm regards,</p>
                    <p className="text-size-16 font-weight-bold">
                      Frantzdy Pierre
                    </p>
                    <p className="text-size-16">
                      <a
                        className="btn btn-secondary mr-2"
                        href="https://www.linkedin.com/in/frantzdy-trading-co-llc-179121318/"
                        target="_blank"
                      >
                        <i class="fab fa-linkedin"></i> Linkedin
                      </a>
                      <a
                        className="btn btn-secondary"
                        href="https://www.youtube.com/@frantzdytradingco"
                        target="_blank"
                      >
                        <i class="fab fa-youtube"></i> Youtube
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="my-5">
            <div class="container">
              <div className="content-header">
                <div class="row">
                  <div class="col-md-12">
                    <div class="text-center">
                      <h1 class="fw-bolder mb-4 text-white">
                        How to Interpret COT REPORT and Become Better Trader
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mx-auto mb-3">
                  <div className="text-center">
                    <div class="embed-responsive embed-responsive-16by9">
                      <iframe
                        class="embed-responsive-item"
                        src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mx-auto mb-3">
                  <div className="text-center">
                    <div class="embed-responsive embed-responsive-16by9">
                      <iframe
                        class="embed-responsive-item"
                        src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mx-auto mb-3">
                  <div className="text-center">
                    <div class="embed-responsive embed-responsive-16by9">
                      <iframe
                        class="embed-responsive-item"
                        src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                      ></iframe>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mx-auto mb-3">
                  <div className="text-center">
                    <div class="embed-responsive embed-responsive-16by9">
                      <iframe
                        class="embed-responsive-item"
                        src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-lg-12">
                  <div className="text-center">
                    <a className="btn btn-secondary" href="" download>
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="my-5">
            <div class="container">
              <div className="content-header">
                <div class="row">
                  <div class="col-md-12">
                    <div class="text-center">
                      <h1 class="fw-bolder mb-3 text-white">Testimonials</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>

                      <p class="fs-3 text-dark fw-semibold">
                        "Frantzdy Trading Co. has been instrumental in my
                        trading success. Their deep COT and CFTC data analysis
                        has given me the edge I needed to make informed
                        decisions. Their insights are always spot-on and timely.
                        I highly recommend their services to any serious
                        trader."
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
                <div class="col-md-4 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "I've been using Frantzdy Trading Co.'s COT and CFTC
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
                <div class="col-md-4 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>

                      <p class="fs-3 text-dark fw-semibold">
                        "Frantzdy Trading Co. provides unparalleled detail in
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
                <div class="col-md-4 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "The expertise of Frantzdy Trading Co. in COT and CFTC
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
                <div class="col-md-4 mb-3">
                  <div class="card h-100 ">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "As a seasoned trader, I've relied on various sources
                        for market data, but Frantzdy Trading Co. stands out
                        with its exceptional COT and CFTC reports. Their
                        detailed analysis and clear presentation make it easy to
                        grasp complex market movements. I trust their insights
                        to guide my trading decisions."
                      </p>
                      <div class="d-flex mt-4 align-items-center">
                        <div class="ml-2">
                          <h5 class="text-primary mb-0">- David M.</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <i class="mdi mdi-48px mdi-format-quote-open text-light-primary lh-1 mb-3 d-block"></i>
                      <p class="fs-3 text-dark fw-semibold">
                        "Frantzdy Trading Co. has been a game-changer for my
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
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Index;
