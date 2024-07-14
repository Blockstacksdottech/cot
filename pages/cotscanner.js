import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  getRating,
  getThresholdSignal,
  isLogged,
  postReq,
  req,
} from "@/helpers";
import { useRouter } from "next/router";
import Downloader from "react-csv-downloader";
import Checker from "./components/Checker";
import { UserContext } from "@/contexts/UserContextData";

const Cotscanner = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const nav = useRouter();
  const [exportableData, setExportableData] = useState([]);
  const [date, setDate] = useState(null);

  const initDataTable = () => {
    const script = document.createElement("script");
    script.src = "/dist/js/datatable.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup function to remove the script on component unmount
      document.body.removeChild(script);
    };
  };

  useEffect(() => {
    return initDataTable();
  }, [loading]);

  const toPercentage = (num) => {
    // Check if the input is a valid number
    if (typeof num !== "number" || isNaN(num)) {
      throw new Error("Input must be a valid number");
    }

    // Convert the number to a percentage
    const percentage = num * 100;

    // Return the formatted percentage string
    return `${percentage.toFixed(2)}%`;
  };

  function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Format the date using toLocaleDateString
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  function get_stars(a, b) {
    const { stars, signal } = getRating(a, b);
    return stars;
  }

  function get_diff_signal(a, b) {
    const { stars, signal } = getRating(a, b);
    return signal;
  }

  const handleExport = (dt) => {
    const date = dt.date;
    dt = dt.data;
    const temp = [
      // Add headers for your CSV data
      [
        "PAIR",
        "OVERALL NON-COM SIGNAL",
        "OVERALL COM SIGNAL",
        "5 WEEK NON-COM COT SIGNAL",
        "5 WEEK NON-COM % NET SHIFT",
        "3 WEEK NON-COM COT SIGNAL",
        "3 WEEK NON-COM % NET SHIFT",
        "5 WEEK COM COT SIGNAL",
        "5 WEEK COM % NET SHIFT",
        "3 WEEK COM COT SIGNAL",
        "3 WEEK COM % NET SHIFT",
        "ADR",
        "LONG TERM NON-COM COT SIGNAL",
        "SENTIMENT NON-COM SIGNAL",
        "% NON-COM LONG",
        "% NON-COM SHORT",
        "NON-COM CROWDED MARKET ALERT",
        "LONG TERM COM COT SIGNAL",
        "SENTIMENT COM SIGNAL",
        "% COM LONG",
        "% COM SHORT",
        "COM CROWDED MARKET ALERT",
      ],
      ...dt.map((e) => [
        e.pair,
        getThresholdSignal(e.pair_pct_change),
        getThresholdSignal(e.pair_comm_pct_change),
        getThresholdSignal(e.pair_5_week_change),
        e.pair_5_week_change,
        getThresholdSignal(e.pair_3_week_change),
        e.pair_3_week_change,
        getThresholdSignal(e.pair_comm_5_week_change),
        e.pair_comm_5_week_change,
        getThresholdSignal(e.pair_comm_3_week_change),
        e.pair_comm_3_week_change,
        60,
        get_diff_signal(
          e.noncomm_10_diff_absolute_long,
          e.noncomm_10_diff_absolute_short
        ),
        get_diff_signal(
          e.noncomm_diff_absolute_long,
          e.noncomm_diff_absolute_short
        ),
        toPercentage(
          (e.base_long + e.quote_long) /
            (e.base_long + e.base_short + e.quote_long + e.quote_short)
        ),
        toPercentage(
          (e.base_short + e.quote_short) /
            (e.base_long + e.base_short + e.quote_long + e.quote_short)
        ),
        get_stars(e.noncomm_diff_absolute_long, e.noncomm_diff_absolute_short) +
          " stars",
        get_diff_signal(
          e.comm_10_diff_absolute_long,
          e.comm_10_diff_absolute_short
        ),
        get_diff_signal(e.comm_diff_absolute_long, e.comm_diff_absolute_short),
        toPercentage(
          (e.base_comm_long + e.quote_comm_long) /
            (e.base_comm_long +
              e.base_comm_short +
              e.quote_comm_long +
              e.quote_comm_short)
        ),
        toPercentage(
          (e.base_comm_short + e.quote_comm_short) /
            (e.base_comm_long +
              e.base_comm_short +
              e.quote_comm_long +
              e.quote_comm_short)
        ),
        get_stars(e.comm_diff_absolute_long, e.comm_diff_absolute_short) +
          " stars",
      ]),
    ];
    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      const response = await postReq("scanner-data", {});
      console.log("formating export");
      handleExport(response);
      setData(response.data);
      setDate(response.date);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.logged) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {}, [data]);

  return (
    <>
      <Head>
        <title>COT SCANNER</title>
        <meta
          name="description"
          content="Commitments of Traders (COT) Reports"
        />
      </Head>
      <Checker tier={1}>
        <Navbar user={user} />

        <div className="content-wrapper">
          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT COT REPORTS ARE DOWNLOADING...
            </h4>
          )}

          {!loading && (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row pt-4">
                    <div className="col-lg-12 ">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title mb-0">COT SCANNER</h5>
                          <div className="card-tools">
                            {exportableData.length > 0 && (
                              <>
                                <Downloader
                                  filename="my_data.csv"
                                  elementType="button"
                                  disabled={false} // Set to true to disable download
                                  datas={exportableData}
                                >
                                  <a className="btn btn-sm btn-primary">
                                    Export Data
                                  </a>
                                </Downloader>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive p-0">
                            <table
                              id="datatable-change"
                              className="table table-bordered table-hover table-sm"
                            >
                              <thead>
                                <tr>
                                  <th>PAIR</th>
                                  <th>OVERALL NON-COM SIGNAL</th>
                                  <th>OVERALL COM SIGNAL</th>
                                  <th>5 WEEK NON-COM COT SIGNAL</th>
                                  <th>5 WEEK NON-COM % NET SHIFT</th>
                                  <th>3 WEEK NON-COM COT SIGNAL</th>
                                  <th>3 WEEK NON-COM % NET SHIFT</th>
                                  <th>5 WEEK COM COT SIGNAL</th>
                                  <th>5 WEEK COM % NET SHIFT</th>
                                  <th>3 WEEK COM COT SIGNAL</th>
                                  <th>3 WEEK COM % NET SHIFT</th>
                                  <th>ADR</th>
                                  <th>LONG TERM NON-COM COT SIGNAL</th>
                                  <th>SENTIMENT NON-COM SIGNAL</th>
                                  <th>% NON-COM LONG</th>
                                  <th>% NON-COM SHORT</th>
                                  <th>NON-COM CROWDED MARKET ALERT</th>
                                  <th>LONG TERM COM COT SIGNAL</th>
                                  <th>SENTIMENT COM SIGNAL</th>
                                  <th>% COM LONG</th>
                                  <th>% COM SHORT</th>
                                  <th>COM CROWDED MARKET ALERT</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data &&
                                  data.length > 0 &&
                                  data.map((e, i) => {
                                    return (
                                      <tr>
                                        <td>{e.pair}</td>
                                        <td>
                                          {getThresholdSignal(
                                            e.pair_pct_change
                                          )}
                                        </td>
                                        <td>
                                          {getThresholdSignal(
                                            e.pair_comm_pct_change
                                          )}
                                        </td>
                                        <td>
                                          {getThresholdSignal(
                                            e.pair_5_week_change
                                          )}
                                        </td>
                                        <td>{e.pair_5_week_change}</td>
                                        <td>
                                          {getThresholdSignal(
                                            e.pair_3_week_change
                                          )}
                                        </td>
                                        <td>{e.pair_3_week_change}</td>
                                        <td>
                                          {getThresholdSignal(
                                            e.pair_comm_5_week_change
                                          )}
                                        </td>
                                        <td>{e.pair_comm_5_week_change}</td>
                                        <td>
                                          {getThresholdSignal(
                                            e.pair_comm_3_week_change
                                          )}
                                        </td>
                                        <td>{e.pair_comm_3_week_change}</td>
                                        <td>60</td>
                                        <td>
                                          {get_diff_signal(
                                            e.noncomm_10_diff_absolute_long,
                                            e.noncomm_10_diff_absolute_short
                                          )}
                                        </td>
                                        <td>
                                          {get_diff_signal(
                                            e.noncomm_diff_absolute_long,
                                            e.noncomm_diff_absolute_short
                                          )}
                                        </td>
                                        <td>
                                          <div
                                            class="progress progress-sm"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              class="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={toPercentage(
                                                (e.base_long + e.quote_long) /
                                                  (e.base_long +
                                                    e.base_short +
                                                    e.quote_long +
                                                    e.quote_short)
                                              ).replace("%", "")}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: toPercentage(
                                                  (e.base_long + e.quote_long) /
                                                    (e.base_long +
                                                      e.base_short +
                                                      e.quote_long +
                                                      e.quote_short)
                                                ),
                                              }}
                                            ></div>
                                          </div>
                                          {toPercentage(
                                            (e.base_long + e.quote_long) /
                                              (e.base_long +
                                                e.base_short +
                                                e.quote_long +
                                                e.quote_short)
                                          )}
                                        </td>
                                        <td>
                                          <div
                                            class="progress progress-sm"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              class="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={toPercentage(
                                                (e.base_short + e.quote_short) /
                                                  (e.base_long +
                                                    e.base_short +
                                                    e.quote_long +
                                                    e.quote_short)
                                              ).replace("%", "")}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: toPercentage(
                                                  (e.base_short +
                                                    e.quote_short) /
                                                    (e.base_long +
                                                      e.base_short +
                                                      e.quote_long +
                                                      e.quote_short)
                                                ),
                                              }}
                                            ></div>
                                          </div>
                                          {toPercentage(
                                            (e.base_short + e.quote_short) /
                                              (e.base_long +
                                                e.base_short +
                                                e.quote_long +
                                                e.quote_short)
                                          )}
                                        </td>
                                        <td>
                                          {new Array(
                                            get_stars(
                                              e.noncomm_diff_absolute_long,
                                              e.noncomm_diff_absolute_short
                                            )
                                          )
                                            .fill(0)
                                            .map(() => {
                                              return (
                                                <span class="fa fa-star checked"></span>
                                              );
                                            })}
                                          {new Array(
                                            5 -
                                              get_stars(
                                                e.noncomm_diff_absolute_long,
                                                e.noncomm_diff_absolute_short
                                              )
                                          )
                                            .fill(0)
                                            .map(() => {
                                              return (
                                                <span class="fa fa-star"></span>
                                              );
                                            })}
                                        </td>
                                        <td>
                                          {get_diff_signal(
                                            e.comm_10_diff_absolute_long,
                                            e.comm_10_diff_absolute_short
                                          )}
                                        </td>
                                        <td>
                                          {get_diff_signal(
                                            e.comm_diff_absolute_long,
                                            e.comm_diff_absolute_short
                                          )}
                                        </td>
                                        <td>
                                          <div
                                            class="progress progress-sm"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              class="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={toPercentage(
                                                (e.base_comm_long +
                                                  e.quote_comm_long) /
                                                  (e.base_comm_long +
                                                    e.base_comm_short +
                                                    e.quote_comm_long +
                                                    e.quote_comm_short)
                                              ).replace("%", "")}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: toPercentage(
                                                  (e.base_comm_long +
                                                    e.quote_comm_long) /
                                                    (e.base_comm_long +
                                                      e.base_comm_short +
                                                      e.quote_comm_long +
                                                      e.quote_comm_short)
                                                ),
                                              }}
                                            ></div>
                                          </div>
                                          {toPercentage(
                                            (e.base_comm_long +
                                              e.quote_comm_long) /
                                              (e.base_comm_long +
                                                e.base_comm_short +
                                                e.quote_comm_long +
                                                e.quote_comm_short)
                                          )}
                                        </td>
                                        <td>
                                          <div
                                            class="progress progress-sm"
                                            style={{ height: "15px" }}
                                          >
                                            <div
                                              class="progress-bar progress-bar-striped progress-bar-animated"
                                              aria-valuenow={toPercentage(
                                                (e.base_comm_short +
                                                  e.quote_comm_short) /
                                                  (e.base_comm_long +
                                                    e.base_comm_short +
                                                    e.quote_comm_long +
                                                    e.quote_comm_short)
                                              ).replace("%", "")}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                              style={{
                                                width: toPercentage(
                                                  (e.base_comm_short +
                                                    e.quote_comm_short) /
                                                    (e.base_comm_long +
                                                      e.base_comm_short +
                                                      e.quote_comm_long +
                                                      e.quote_comm_short)
                                                ),
                                              }}
                                            ></div>
                                          </div>
                                          {toPercentage(
                                            (e.base_comm_short +
                                              e.quote_comm_short) /
                                              (e.base_comm_long +
                                                e.base_comm_short +
                                                e.quote_comm_long +
                                                e.quote_comm_short)
                                          )}
                                        </td>
                                        <td>
                                          {new Array(
                                            get_stars(
                                              e.comm_diff_absolute_long,
                                              e.comm_diff_absolute_short
                                            )
                                          )
                                            .fill(0)
                                            .map(() => {
                                              return (
                                                <span class="fa fa-star checked"></span>
                                              );
                                            })}
                                          {new Array(
                                            5 -
                                              get_stars(
                                                e.comm_diff_absolute_long,
                                                e.comm_diff_absolute_short
                                              )
                                          )
                                            .fill(0)
                                            .map(() => {
                                              return (
                                                <span class="fa fa-star"></span>
                                              );
                                            })}
                                        </td>
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
              </div>
            </>
          )}
        </div>
      </Checker>

      <Footer />
    </>
  );
};

export default Cotscanner;
