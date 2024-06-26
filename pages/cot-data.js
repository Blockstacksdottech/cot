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
  ResponsiveContainer,
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

  function formatDate(dateString) {
    // Create a new Date object from the input string
    const date = new Date(dateString);

    // Format the date using toLocaleDateString
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }

  const handleExport = (dt) => {
    console.log(dt);
    const temp = [
      // Add headers for your CSV data
      [
        "Date",
        "Pair",
        "Base Long",
        "Base Short",
        "Base Net Position",
        "Quote Long",
        "Quote Short",
        "Quote Net Position",
        "Base Comm Long",
        "Base Comm Short",
        "Base Comm Net Position",
        "Quote Comm Long",
        "Quote Comm Short",
        "Quote Comm Net Position",
        "Base Nonrep Long",
        "Base Nonrep Short",
        "Base Nonrep Net Position",
        "Quote Nonrep Long",
        "Quote Nonrep Short",
        "Quote Nonrep Net Position",
        "Pair Long",
        "Pair Short",
        "Pair Net Position",
        "Percentage Change",
        "2 Week Change",
        "3 Week Change",
        "4 Week Change",
        "5 Week Change",
        "6 Week Change",
        "7 Week Change",
        "8 Week Change",
        "9 Week Change",
        "10 Week Change",
        "Sentiment",
      ],
      ...dt.map((e) => [
        e.date,
        e.pair,
        e.base_long,
        e.base_short,
        e.base_net_position,
        e.quote_long,
        e.quote_short,
        e.quote_net_position,
        e.base_comm_long,
        e.base_comm_short,
        e.base_comm_net_position,
        e.quote_comm_long,
        e.quote_comm_short,
        e.quote_comm_net_position,
        e.base_nonrep_long,
        e.base_nonrep_short,
        e.base_nonrep_net_position,
        e.quote_nonrep_long,
        e.quote_nonrep_short,
        e.quote_nonrep_net_position,
        e.pair_long,
        e.pair_short,
        e.pair_net_position,
        e.pct_change.toFixed(2),
        e.two_week_change.toFixed(2),
        e.three_week_change.toFixed(2),
        e.four_week_change.toFixed(2),
        e.five_week_change.toFixed(2),
        e.six_week_change.toFixed(2),
        e.seven_week_change.toFixed(2),
        e.eight_week_change.toFixed(2),
        e.nine_week_change.toFixed(2),
        e.ten_week_change.toFixed(2),
        e.sentiment,
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
      setDate(response[0].date);
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
                                <th>Date</th>
                                <th>Pair</th>
                                <th>Base Long</th>
                                <th>Base Short</th>
                                <th>Base Net Position</th>
                                <th>Quote Long</th>
                                <th>Quote Short</th>
                                <th>Quote Net Position</th>
                                <th>Base Comm Long</th>
                                <th>Base Comm Short</th>
                                <th>Base Comm Net Position</th>
                                <th>Quote Comm Long</th>
                                <th>Quote Comm Short</th>
                                <th>Quote Comm Net Position</th>
                                <th>Base Nonrep Long</th>
                                <th>Base Nonrep Short</th>
                                <th>Base Nonrep Net Position</th>
                                <th>Quote Nonrep Long</th>
                                <th>Quote Nonrep Short</th>
                                <th>Quote Nonrep Net Position</th>
                                <th>Pair Long</th>
                                <th>Pair Short</th>
                                <th>Pair Net Position</th>
                                <th>Percentage Change</th>
                                <th>2 Week Change</th>
                                <th>3 Week Change</th>
                                <th>4 Week Change</th>
                                <th>5 Week Change</th>
                                <th>6 Week Change</th>
                                <th>7 Week Change</th>
                                <th>8 Week Change</th>
                                <th>9 Week Change</th>
                                <th>10 Week Change</th>
                                <th>Sentiment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && (
                                <>
                                  {data.map((entry, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{date && formatDate(date)}</td>
                                        <td>{entry.pair}</td>
                                        <td>{entry.base_long}</td>
                                        <td>{entry.base_short}</td>
                                        <td>{entry.base_net_position}</td>
                                        <td>{entry.quote_long}</td>
                                        <td>{entry.quote_short}</td>
                                        <td>{entry.quote_net_position}</td>
                                        <td>{entry.base_comm_long}</td>
                                        <td>{entry.base_comm_short}</td>
                                        <td>{entry.base_comm_net_position}</td>
                                        <td>{entry.quote_comm_long}</td>
                                        <td>{entry.quote_comm_short}</td>
                                        <td>{entry.quote_comm_net_position}</td>
                                        <td>{entry.base_nonrep_long}</td>
                                        <td>{entry.base_nonrep_short}</td>
                                        <td>
                                          {entry.base_nonrep_net_position}
                                        </td>
                                        <td>{entry.quote_nonrep_long}</td>
                                        <td>{entry.quote_nonrep_short}</td>
                                        <td>
                                          {entry.quote_nonrep_net_position}
                                        </td>
                                        <td>{entry.pair_long}</td>
                                        <td>{entry.pair_short}</td>
                                        <td>{entry.pair_net_position}</td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.pct_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.pct_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.pct_change.toFixed(2)}%
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.two_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.two_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.two_week_change.toFixed(2)}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.three_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.three_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.three_week_change.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.four_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.four_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.four_week_change.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.five_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.five_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.five_week_change.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.six_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.six_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.six_week_change.toFixed(2)}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.seven_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.seven_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.seven_week_change.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.eight_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.eight_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.eight_week_change.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.nine_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.nine_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.nine_week_change.toFixed(
                                                2
                                              )}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            className="progress"
                                            style={{ height: "25px" }}
                                          >
                                            <div
                                              className="progress-bar progress-bar-striped progress-bar-animated"
                                              style={{
                                                width: `${entry.ten_week_change.toFixed(
                                                  2
                                                )}%`,
                                              }}
                                              aria-valuenow={entry.ten_week_change.toFixed(
                                                2
                                              )}
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            >
                                              {entry.ten_week_change.toFixed(2)}
                                              %
                                            </div>
                                          </div>
                                        </td>
                                        <td>{entry.sentiment}</td>
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
                        <h5 className="card-title">
                          Net Speculative Data (Commercial)
                        </h5>
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
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart
                            data={
                              sentimentData && sentimentData[selectedSentiment]
                            }
                          >
                            <Line
                              type="monotone"
                              dataKey="score"
                              stroke="#9932cc"
                            />
                            <CartesianGrid
                              stroke="#ccc"
                              strokeDasharray="5 5"
                            />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="card-title">
                          Crowding Data (Commercial)
                        </h5>
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
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={crowdingData && crowdingData[selectedCrowded]}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="long" fill="#9932cc" />
                            <Bar dataKey="short" fill="#d08ef1" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="card-title">
                          Net Speculative Data (Non-Commercial)
                        </h5>
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
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart
                            data={
                              sentimentData && sentimentData[selectedSentiment]
                            }
                          >
                            <Line
                              type="monotone"
                              dataKey="score"
                              stroke="#9932cc"
                            />
                            <CartesianGrid
                              stroke="#ccc"
                              strokeDasharray="5 5"
                            />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="card-title">
                          Crowding Data (Non-Commercial)
                        </h5>
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
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart
                            data={crowdingData && crowdingData[selectedCrowded]}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="long" fill="#9932cc" />
                            <Bar dataKey="short" fill="#d08ef1" />
                          </BarChart>
                        </ResponsiveContainer>
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

/* 

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
                                {/* <th>SPI</th> 
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
                                        </td> 

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

*/
