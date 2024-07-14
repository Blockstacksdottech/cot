import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { calculateNet, getThresholdSignal, isLogged, req } from "@/helpers";
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
import Checker from "./components/Checker";
import { UserContext } from "@/contexts/UserContextData";

const Cotdata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useContext(UserContext);
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
        "ID",
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
        "Pair Percentage Change",
        "Pair Comm Percentage Change",
        "Pair 2 Week Change",
        "Pair 3 Week Change",
        "Pair 4 Week Change",
        "Pair 5 Week Change",
        "Pair 6 Week Change",
        "Pair 7 Week Change",
        "Pair 8 Week Change",
        "Pair 9 Week Change",
        "Pair 10 Week Change",
        "Pair Comm 2 Week Change",
        "Pair Comm 3 Week Change",
        "Pair Comm 4 Week Change",
        "Pair Comm 5 Week Change",
        "Pair Comm 6 Week Change",
        "Pair Comm 7 Week Change",
        "Pair Comm 8 Week Change",
        "Pair Comm 9 Week Change",
        "Pair Comm 10 Week Change",
        "Pair Percentage Change Open Interest",
        "Pair 2 Week Change Open Interest",
        "Pair 3 Week Change Open Interest",
        "Pair 4 Week Change Open Interest",
        "Pair 5 Week Change Open Interest",
        "Pair 6 Week Change Open Interest",
        "Pair 7 Week Change Open Interest",
        "Pair 8 Week Change Open Interest",
        "Pair 9 Week Change Open Interest",
        "Pair 10 Week Change Open Interest",
        "Noncomm Diff Absolute Long",
        "Noncomm Diff Absolute Short",
        "Noncomm 2 Diff Absolute Long",
        "Noncomm 3 Diff Absolute Long",
        "Noncomm 4 Diff Absolute Long",
        "Noncomm 5 Diff Absolute Long",
        "Noncomm 6 Diff Absolute Long",
        "Noncomm 7 Diff Absolute Long",
        "Noncomm 8 Diff Absolute Long",
        "Noncomm 9 Diff Absolute Long",
        "Noncomm 10 Diff Absolute Long",
        "Noncomm 2 Diff Absolute Short",
        "Noncomm 3 Diff Absolute Short",
        "Noncomm 4 Diff Absolute Short",
        "Noncomm 5 Diff Absolute Short",
        "Noncomm 6 Diff Absolute Short",
        "Noncomm 7 Diff Absolute Short",
        "Noncomm 8 Diff Absolute Short",
        "Noncomm 9 Diff Absolute Short",
        "Noncomm 10 Diff Absolute Short",
        "Comm Diff Absolute Long",
        "Comm Diff Absolute Short",
        "Comm 2 Diff Absolute Long",
        "Comm 3 Diff Absolute Long",
        "Comm 4 Diff Absolute Long",
        "Comm 5 Diff Absolute Long",
        "Comm 6 Diff Absolute Long",
        "Comm 7 Diff Absolute Long",
        "Comm 8 Diff Absolute Long",
        "Comm 9 Diff Absolute Long",
        "Comm 10 Diff Absolute Long",
        "Comm 2 Diff Absolute Short",
        "Comm 3 Diff Absolute Short",
        "Comm 4 Diff Absolute Short",
        "Comm 5 Diff Absolute Short",
        "Comm 6 Diff Absolute Short",
        "Comm 7 Diff Absolute Short",
        "Comm 8 Diff Absolute Short",
        "Comm 9 Diff Absolute Short",
        "Comm 10 Diff Absolute Short",
        "Sentiment",
        "Is Contract",
        "Date Interval",
      ],
      ...dt.map((e) => [
        e.id,
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
        e.pair_pct_change.toFixed(10),
        e.pair_comm_pct_change.toFixed(10),
        e.pair_2_week_change.toFixed(10),
        e.pair_3_week_change.toFixed(10),
        e.pair_4_week_change.toFixed(10),
        e.pair_5_week_change.toFixed(10),
        e.pair_6_week_change.toFixed(10),
        e.pair_7_week_change.toFixed(10),
        e.pair_8_week_change.toFixed(10),
        e.pair_9_week_change.toFixed(10),
        e.pair_10_week_change.toFixed(10),
        e.pair_comm_2_week_change.toFixed(10),
        e.pair_comm_3_week_change.toFixed(10),
        e.pair_comm_4_week_change.toFixed(10),
        e.pair_comm_5_week_change.toFixed(10),
        e.pair_comm_6_week_change.toFixed(10),
        e.pair_comm_7_week_change.toFixed(10),
        e.pair_comm_8_week_change.toFixed(10),
        e.pair_comm_9_week_change.toFixed(10),
        e.pair_comm_10_week_change.toFixed(10),
        e.pair_pct_change_open_interest.toFixed(10),
        e.pair_2_week_change_open_interest.toFixed(10),
        e.pair_3_week_change_open_interest.toFixed(10),
        e.pair_4_week_change_open_interest.toFixed(10),
        e.pair_5_week_change_open_interest.toFixed(10),
        e.pair_6_week_change_open_interest.toFixed(10),
        e.pair_7_week_change_open_interest.toFixed(10),
        e.pair_8_week_change_open_interest.toFixed(10),
        e.pair_9_week_change_open_interest.toFixed(10),
        e.pair_10_week_change_open_interest.toFixed(10),
        e.noncomm_diff_absolute_long,
        e.noncomm_diff_absolute_short,
        e.noncomm_2_diff_absolute_long,
        e.noncomm_3_diff_absolute_long,
        e.noncomm_4_diff_absolute_long,
        e.noncomm_5_diff_absolute_long,
        e.noncomm_6_diff_absolute_long,
        e.noncomm_7_diff_absolute_long,
        e.noncomm_8_diff_absolute_long,
        e.noncomm_9_diff_absolute_long,
        e.noncomm_10_diff_absolute_long,
        e.noncomm_2_diff_absolute_short,
        e.noncomm_3_diff_absolute_short,
        e.noncomm_4_diff_absolute_short,
        e.noncomm_5_diff_absolute_short,
        e.noncomm_6_diff_absolute_short,
        e.noncomm_7_diff_absolute_short,
        e.noncomm_8_diff_absolute_short,
        e.noncomm_9_diff_absolute_short,
        e.noncomm_10_diff_absolute_short,
        e.comm_diff_absolute_long,
        e.comm_diff_absolute_short,
        e.comm_2_diff_absolute_long,
        e.comm_3_diff_absolute_long,
        e.comm_4_diff_absolute_long,
        e.comm_5_diff_absolute_long,
        e.comm_6_diff_absolute_long,
        e.comm_7_diff_absolute_long,
        e.comm_8_diff_absolute_long,
        e.comm_9_diff_absolute_long,
        e.comm_10_diff_absolute_long,
        e.comm_2_diff_absolute_short,
        e.comm_3_diff_absolute_short,
        e.comm_4_diff_absolute_short,
        e.comm_5_diff_absolute_short,
        e.comm_6_diff_absolute_short,
        e.comm_7_diff_absolute_short,
        e.comm_8_diff_absolute_short,
        e.comm_9_diff_absolute_short,
        e.comm_10_diff_absolute_short,
        e.sentiment,
        e.is_contract,
        e.date_interval,
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
        <title>Commitments of Traders (COT) Reports</title>
        <meta
          name="description"
          content="Commitments of Traders (COT) Reports"
        />
      </Head>
      <Checker only_admin={true}>
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
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h3 className="card-title mb-0">
                            Commitments of Traders (COT) Reports
                          </h3>

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
                                    Export COT Data
                                  </a>
                                </Downloader>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive p-0">
                            <table
                              id="datatable-Cotdata"
                              className="table table-bordered table-hover table-sm"
                            >
                              <thead>
                                <tr>
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
                                          <td>
                                            {entry.base_comm_net_position}
                                          </td>
                                          <td>{entry.quote_comm_long}</td>
                                          <td>{entry.quote_comm_short}</td>
                                          <td>
                                            {entry.quote_comm_net_position}
                                          </td>
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

                  <div className="row pt-4">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h3 className="card-title mb-0">
                            Commitments of Traders (COT) Reports
                          </h3>

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
                                    Export COT Data
                                  </a>
                                </Downloader>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive p-0">
                            <table
                              id="datatable-Cotdata2"
                              className="table table-bordered table-hover table-sm"
                            >
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Pair</th>
                                  <th>Pair Long</th>
                                  <th>Pair Short</th>
                                  <th>Pair Net Position</th>
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
                                          <td>{entry.pair_long}</td>
                                          <td>{entry.pair_short}</td>
                                          <td>{calculateNet(entry)}</td>
                                          <td>
                                            {getThresholdSignal(
                                              entry.pair_pct_change
                                            )}
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

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h3 className="card-title mb-0">
                            % Change in Non-comm Positions
                          </h3>

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
                                  <th>Date</th>
                                  <th>Pair</th>
                                  <th>1 Week Change</th>
                                  <th>2 Week Change</th>
                                  <th>3 Week Change</th>
                                  <th>4 Week Change</th>
                                  <th>5 Week Change</th>
                                  <th>6 Week Change</th>
                                  <th>7 Week Change</th>
                                  <th>8 Week Change</th>
                                  <th>9 Week Change</th>
                                  <th>10 Week Change</th>
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
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_pct_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_pct_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_pct_change.toFixed(2)}%
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_2_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_2_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_2_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_3_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_3_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_3_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_4_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_4_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_4_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_5_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_5_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_5_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_6_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_6_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_6_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_7_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_7_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_7_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_8_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_8_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_8_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_9_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_9_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_9_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_10_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_10_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_10_week_change.toFixed(
                                              2
                                            )}
                                            %
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

                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h3 className="card-title mb-0">
                            % Change in Comm Positions
                          </h3>

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
                                  <th>Date</th>
                                  <th>Pair</th>
                                  <th>1 Week Change</th>
                                  <th>2 Week Change</th>
                                  <th>3 Week Change</th>
                                  <th>4 Week Change</th>
                                  <th>5 Week Change</th>
                                  <th>6 Week Change</th>
                                  <th>7 Week Change</th>
                                  <th>8 Week Change</th>
                                  <th>9 Week Change</th>
                                  <th>10 Week Change</th>
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
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_pct_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_pct_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_pct_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_2_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_2_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_2_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_3_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_3_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_3_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_4_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_4_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_4_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_5_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_5_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_5_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_6_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_6_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_6_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_7_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_7_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_7_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_8_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_8_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_8_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_9_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_9_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_9_week_change.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "15px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_comm_10_week_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_comm_10_week_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_comm_10_week_change.toFixed(
                                              2
                                            )}
                                            %
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
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title">
                            Net Speculative Data (Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm"
                              onChange={(e) =>
                                handleSelectCommChange(e, "sentiment")
                              }
                              value={selectedCommSentiment}
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
                                CommsentimentData &&
                                CommsentimentData[selectedCommSentiment]
                              }
                            >
                              <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#1b1e25"
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
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title">
                            Crowding Data (Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm"
                              onChange={(e) =>
                                handleSelectCommChange(e, "comm_crowded")
                              }
                              value={selectedCommCrowded}
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
                              data={
                                CommcrowdingData &&
                                CommcrowdingData[selectedCommCrowded]
                              }
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="long" fill="#1b1e25" />
                              <Bar dataKey="short" fill="#a4a8b1" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title">
                            Net Speculative Data (Non-Commercial)
                          </h5>
                          <div className="card-tools">
                            <select
                              className="form-control form-control-sm"
                              onChange={(e) =>
                                handleSelectChange(e, "sentiment")
                              }
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
                                sentimentData &&
                                sentimentData[selectedSentiment]
                              }
                            >
                              <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#1b1e25"
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
                    <div className="col-lg-12">
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
                              data={
                                crowdingData && crowdingData[selectedCrowded]
                              }
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="long" fill="#1b1e25" />
                              <Bar dataKey="short" fill="#a4a8b1" />
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
      </Checker>

      <Footer />
    </>
  );
};

export default Cotdata;
