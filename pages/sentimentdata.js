import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
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

const Sentimentdata = () => {
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
  const [CommcrowdingData, setCommCrowdingData] = useState([]);
  const [CommsentimentData, setCommSentimentData] = useState([]);
  const [selectedCommCrowded, setSelectedCommCrowded] = useState(null);
  const [selectedCommSentiment, setSelectedCommSentiment] = useState(null);
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
      const response3 = await req("crowding_comm_positions");
      setCommCrowdingData(response3);
      const response4 = await req("net_comm_speculative");
      setCommSentimentData(response4);
      const keys = Object.keys(response1);
      console.log(keys);
      setKeys(keys);
      setSelectedCrowded(keys[0]);
      setSelectedSentiment(keys[0]);
      setSelectedCommCrowded(keys[0]);
      setSelectedCommSentiment(keys[0]);
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

  const handleSelectCommChange = (e, target) => {
    const o = e.target;
    if (target === "crowded") {
      setSelectedCommCrowded(o.value);
    } else {
      setSelectedCommSentiment(o.value);
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
        <title>Sentiment Data</title>
        <meta
          name="description"
          content="Commitments of Traders (COT) Reports"
        />
      </Head>

      <Navbar user={user} />

      <div className="content-wrapper">
        <h4 className="text-white text-center pt-5 blink">
          PLEASE WAIT SENTIMENT DATA ARE DOWNLOADING...
        </h4>
        {!loading && (
          <>
            <div className="content">
              <div className="container-fluid">
                <div className="row pt-4">
                  <div className="col-lg-12">
                    <div className="card card-primary card-outline">
                      <div className="card-header">
                        <h5 className="card-title mb-0">SENTIMENT</h5>
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
                          <table className="table table-bordered table-hover table-sm">
                            <thead>
                              <tr>
                                <th>Symbol</th>
                                <th>Action</th>
                                <th>Percentage</th>
                                <th>Volume</th>
                                <th>Positions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* TAble-row Start */}
                              <tr>
                                <td rowspan="3">EURUSD</td>
                              </tr>
                              <tr>
                                <td>Short</td>
                                <td>
                                  <div
                                    class="progress progress-sm"
                                    style={{ height: "15px" }}
                                  >
                                    <div
                                      class="progress-bar progress-bar-striped progress-bar-animated"
                                      aria-valuenow="77"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{ width: "77%" }}
                                    ></div>
                                  </div>
                                  77%
                                </td>
                                <td>37227.12 Lots</td>
                                <td>131258</td>
                              </tr>
                              <tr>
                                <td>Long</td>
                                <td>
                                  <div
                                    class="progress progress-sm"
                                    style={{ height: "15px" }}
                                  >
                                    <div
                                      class="progress-bar progress-bar-striped progress-bar-animated"
                                      aria-valuenow="22"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{ width: "22%" }}
                                    ></div>
                                  </div>
                                  22%
                                </td>
                                <td>10974.85 Lots</td>
                                <td>47798</td>
                              </tr>
                              {/* TAble-row END */}

                              {/* TAble-row Start */}
                              <tr>
                                <td rowspan="3">GBPUSD</td>
                              </tr>
                              <tr>
                                <td>Short</td>
                                <td>
                                  <div
                                    class="progress progress-sm"
                                    style={{ height: "15px" }}
                                  >
                                    <div
                                      class="progress-bar progress-bar-striped progress-bar-animated"
                                      aria-valuenow="91"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{ width: "91%" }}
                                    ></div>
                                  </div>
                                  91%
                                </td>
                                <td>30472.19 Lots</td>
                                <td>135568</td>
                              </tr>
                              <tr>
                                <td>Long</td>
                                <td>
                                  <div
                                    class="progress progress-sm"
                                    style={{ height: "15px" }}
                                  >
                                    <div
                                      class="progress-bar progress-bar-striped progress-bar-animated"
                                      aria-valuenow="8"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                      style={{ width: "8%" }}
                                    ></div>
                                  </div>
                                  8%
                                </td>
                                <td>3008.1 Lots</td>
                                <td>12539</td>
                              </tr>
                              {/* TAble-row END */}
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

      <Footer />
    </>
  );
};

export default Sentimentdata;
