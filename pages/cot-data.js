import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { isLogged, req } from "@/helpers";
import { useRouter } from "next/router";

const Cotdata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    logged: false,
    username: "",
    email: "",
  });
  const nav = useRouter();

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

  useEffect(() => {
    async function test() {
      let resp = await isLogged();
      console.log(resp);
      let obj = { ...user };
      if (resp) {
        obj.logged = true;
        obj.username = resp.username;
        obj.email = resp.email;
        setUser(obj);
        return obj;
      } else {
        return obj;
      }
    }

    test().then((obj) => {
      if (obj.logged) {
      } else {
        nav.push("/login");
      }
    });
  }, []);

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

  const fetchData = async () => {
    try {
      const response = await req("data");
      setData(response[0].data);
    } catch (error) {
      setError(error.message);
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
        <title>Commitments of Traders (COT) Reports</title>
        <meta
          name="description"
          content="Commitments of Traders (COT) Reports"
        />
      </Head>

      <Navbar user={user} />
      {!loading && (
        <>
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-12">
                    <h1 className="m-0">
                      Commitments of Traders (COT) Reports
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="container-fluid">
                <div className="row mb-2">
                  {/* <div className="col-lg-12">
                    <form>
                      <label>Import Data Source</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="exampleInputFile"
                          />
                          <label className="custom-file-label">
                            Choose file
                          </label>
                        </div>
                        <div className="input-group-append">
                          <button className="btn btn-primary">
                            Fetch data
                          </button>
                        </div>
                      </div>
                    </form>
                  </div> */}
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
                                <th>Symbol Name</th>
                                <th>Overall Sentiment Score</th>
                                <th>Overall Decision</th>
                                <th>Sentiment Score</th>
                                <th>Decision</th>
                                <th>Crowded Long</th>
                                <th>Crowded Short</th>
                                {/* <th>SPI</th> */}
                                <th>Net Speculative Position</th>
                                <th>% spec positions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((e, i) => {
                                    return (
                                      <tr>
                                        <td>{e.symbol}</td>
                                        <td>{e.overall_sentiment}</td>
                                        <td>{e.overall_decision}</td>
                                        <td>{e.sentiment_score}</td>
                                        <td>{e.decision}</td>
                                        <td>{e.crowded_long_positions}</td>
                                        <td>{e.crowded_short_positions}</td>
                                        {/* <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${toPercentage(
                                                  e.speculative_positioning_index
                                                )}%`,
                                              }}
                                              aria-valuenow={toPercentage(
                                                e.speculative_positioning_index
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {toPercentage(
                                                e.speculative_positioning_index
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td> */}

                                        <td>{e.net_speculative_position}</td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${e.pct_oi_spec_positions.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={e.pct_oi_spec_positions.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {e.pct_oi_spec_positions.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </>
                              )}
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
        </>
      )}

      <Footer />
    </>
  );
};

export default Cotdata;
