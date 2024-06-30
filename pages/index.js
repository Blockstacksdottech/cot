import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";

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
          <section class="bg-offwhite">
            <div class="container-fluid overflow-hidden">
              <div class="row">
                <div class="col-12 col-md-6 order-1 order-md-0 align-self-md-center">
                  <div class="row pb-3 pb-sm-5 pb-xl-9 mt-md-10 justify-content-sm-center">
                    <div class="col-12 col-sm-10">
                      <h1 class="fw-bolder mb-4 text-fdark">
                        Charting Tools for In-Depth Analysis of Commitment of
                        Traders (COT) Reports
                      </h1>
                      <div class="row">
                        <div class="col-12 col-xxl-8">
                          <p class="fs-5 mb-5 banner-text  text-fdark">
                            Unlock the power of Commitment of Traders (COT)
                            report analysis with our interactive charting tools
                            for better trading decisions.
                          </p>
                        </div>
                      </div>
                      <div class="d-grid gap-2 d-sm-flex">
                        <a
                          type="button"
                          class="btn btn-primary"
                          href="/register"
                        >
                          Subscribe For COT Reports
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 p-0">
                  <img
                    class="img-fluid w-100 h-100 object-fit-cover"
                    loading="lazy"
                    src="./banner.jpg"
                    alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                  />
                </div>
              </div>
            </div>
          </section>
          <section class="pt-5">
            <div class="container">
              <div class="row">
                <div class="col-lg-6">
                  <img
                    class="img-fluid"
                    loading="lazy"
                    src="./banner.jpg"
                    alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                  />
                </div>
                <div class="col-lg-6">
                  <h3 class="text-white pl-3">
                    What is Commitments of Traders Data?
                  </h3>
                  <p class="text-white mt-2 text-size-15 pl-3">
                    The Commitments of Traders (COT) report is a market report,
                    which is published weekly by the CFTC (Commodity Futures
                    Trading Commission). The COT report gives insights on the
                    positions of different market participants in the US. The
                    Position Data is based on reports by different firms, like
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
                              {/* <th>Date</th> */}
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
                              {/* <td>18 June 2024</td> */}
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
                              {/* <td>18 June 2024</td> */}
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
                              {/* <td>18 June 2024</td> */}
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
                              {/* <td>18 June 2024</td> */}
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
                              {/* <td>18 June 2024</td> */}
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
          <section className="bg-offwhite">
            <div class="jumbotron jumbotron-fluid mb-0">
              <div class="container">
                <div className="col-lg-12 text-center">
                  <h1 class="fw-bolder">Ready to get started?</h1>
                  <a
                    type="button"
                    class="btn btn-primary mt-3"
                    href="/register"
                  >
                    Subscribe For COT Reports
                  </a>
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
