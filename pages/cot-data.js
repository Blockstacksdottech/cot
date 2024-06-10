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
  BarChart,
  Legend,
  Bar,
} from "recharts";
import Downloader from "react-csv-downloader";

const Cotdata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    logged: false,
    username: "",
    email: "",
  });
  const [crowdingData, setCrowdingData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [selectedCrowded, setSelectedCrowded] = useState(null);
  const [selectedSentiment, setSelectedSentiment] = useState(null);
  const [keys, setKeys] = useState([]);
  const nav = useRouter();
  const [exportableData, setExportableData] = useState([]);

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

  const handleExport = (dt) => {
    const temp = [
      // Add headers for your CSV data
      [
        "Symbol Name",
        "Overall Sentiment Score",
        "Overall Decision",
        "Sentiment Score",
        "Decision",
        "Crowded Long",
        "Crowded Short",
        "Net Speculative Position",
        "% Spec positions",
      ],
      ...dt.map((e) => [
        e.symbol,
        e.overall_sentiment,
        e.overall_decision,
        e.sentiment_score,
        e.decision,
        e.crowded_long_positions,
        e.crowded_short_positions,
        e.net_speculative_position,
        e.pct_oi_spec_positions.toFixed(2),
      ]),
    ];
    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      const response = await req("data");
      console.log("formating export");
      handleExport(response[0].data);
      setData(response[0].data);
      const response1 = await req("crowding_positions");
      setCrowdingData(response1);
      const response2 = await req("net_speculative");
      setSentimentData(response2);
      const keys = Object.keys(response1);
      console.log(keys);
      setKeys(keys);
      setSelectedCrowded(keys[0]);
      setSelectedSentiment(keys[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e, target) => {
    const o = e.target;
    if (target === "crowded") {
      setSelectedCrowded(o.value);
    } else {
      setSelectedSentiment(o.value);
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
                        {exportableData.length > 0 && (
                          <>
                            <Downloader
                              filename="my_data.csv"
                              elementType="button"
                              disabled={false} // Set to true to disable download
                              datas={exportableData}
                            >
                              <a className="btn btn-sm btn-primary my-2">
                                Export COT Data
                              </a>
                            </Downloader>
                          </>
                        )}

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
                        <h5 className="card-title">Net Speculative Data</h5>
                        <div className="card-tools">
                          <select
                            className="form-control form-control-sm"
                            onChange={(e) => handleSelectChange(e, "sentiment")}
                            value={selectedSentiment}
                          >
                            <option selected="selected">
                              Select Symbol Name
                            </option>
                            {keys.map((e, i) => {
                              return (
                                <option key={e} value={e}>
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="card-body">
                        <LineChart
                          width={600}
                          height={300}
                          data={
                            sentimentData && sentimentData[selectedSentiment]
                          }
                        >
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#8884d8"
                          />
                          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                          <XAxis dataKey="date" />
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
                          <select
                            className="form-control form-control-sm"
                            onChange={(e) => handleSelectChange(e, "crowded")}
                            value={selectedCrowded}
                          >
                            <option selected="selected">
                              Select Symbol Name
                            </option>
                            {keys.map((e, i) => {
                              return (
                                <option key={e} value={e}>
                                  {e}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="card-body">
                        <BarChart
                          width={600}
                          height={300}
                          data={crowdingData && crowdingData[selectedCrowded]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="long" fill="#8884d8" />
                          <Bar dataKey="short" fill="#82ca9d" />
                        </BarChart>
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
