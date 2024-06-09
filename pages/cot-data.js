import Head from "next/head";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { isLogged, req } from "@/helpers";
import { useRouter } from "next/router";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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

  const sentimentdata = [
    { name: "Jan", uv: 400 },
    { name: "Feb", uv: 300 },
    { name: "Mar", uv: 200 },
    { name: "Apr", uv: 100 },
    { name: "May", uv: 50 },
    { name: "Jun", uv: 250 },
    { name: "Jul", uv: 130 },
    { name: "Aug", uv: 500 },
    { name: "Sep", uv: 350 },
    { name: "Oct", uv: 430 },
    { name: "Nov", uv: 290 },
    { name: "Dec", uv: 20 },
  ];

  const crowdingdata = [
    { name: "Jan", uv: 100 },
    { name: "Feb", uv: 200 },
    { name: "Mar", uv: 300 },
    { name: "Apr", uv: 400 },
    { name: "May", uv: 500 },
    { name: "Jun", uv: 600 },
    { name: "Jul", uv: 700 },
    { name: "Aug", uv: 800 },
    { name: "Sep", uv: 900 },
    { name: "Oct", uv: 1000 },
    { name: "Nov", uv: 1100 },
    { name: "Dec", uv: 1200 },
  ];

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
        {!loading && (
          <>
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
                                <th>% Spec positions</th>
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

                <div className="row">
                  <div className="col-lg-6">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="card-title">Sentiment Data</h5>
                        <div className="card-tools">
                          <select className="form-control form-control-sm">
                            <option selected="selected">
                              Select Symbol Name
                            </option>
                            <option>10 YEAR ERIS SOFR SWAP</option>
                            <option>5 YEAR ERIS SOFR SWAP </option>
                            <option>ADJUSTED INT RATE S&P 500 TOTL </option>
                            <option>AUSTRALIAN DOLLAR </option>
                            <option>BBG COMMODITY </option>
                            <option>BITCOIN</option>
                          </select>
                        </div>
                      </div>
                      <div className="card-body">
                        <LineChart
                          width={600}
                          height={300}
                          data={sentimentdata}
                        >
                          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                        </LineChart>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="card-title">Crowding Data</h5>
                        <div className="card-tools">
                          <select className="form-control form-control-sm">
                            <option selected="selected">
                              Select Symbol Name
                            </option>
                            <option>10 YEAR ERIS SOFR SWAP</option>
                            <option>5 YEAR ERIS SOFR SWAP </option>
                            <option>ADJUSTED INT RATE S&P 500 TOTL </option>
                            <option>AUSTRALIAN DOLLAR </option>
                            <option>BBG COMMODITY </option>
                            <option>BITCOIN</option>
                          </select>
                        </div>
                      </div>
                      <div className="card-body">
                        <LineChart width={600} height={300} data={crowdingdata}>
                          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                        </LineChart>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cotdata;
