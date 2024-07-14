import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import { isLogged, postReq, req } from "@/helpers";
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

const Cotreport = () => {
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

  const handleExport = (dt) => {
    console.log(dt);
    const date = dt.date;
    dt = dt.data;
    const temp = [
      // Add headers for your CSV data
      [
        "Date",
        "Pair",
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
      ],
      ...dt.map((e) => [
        date,
        e.pair,
        e.pair_pct_change.toFixed(2),
        e.pair_2_week_change.toFixed(2),
        e.pair_3_week_change.toFixed(2),
        e.pair_4_week_change.toFixed(2),
        e.pair_5_week_change.toFixed(2),
        e.pair_6_week_change.toFixed(2),
        e.pair_7_week_change.toFixed(2),
        e.pair_8_week_change.toFixed(2),
        e.pair_9_week_change.toFixed(2),
        e.pair_10_week_change.toFixed(2),
      ]),
    ];
    console.log("temp here");
    console.log(temp);
    setExportableData(temp);
  };

  const fetchData = async () => {
    try {
      const response = await postReq("change-data", {});
      if (response) {
        console.log(response);
        handleExport(response);
        setData(response.data);
        setDate(response.date);
      }
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

  return (
    <>
      <Head>
        <title>COT REPORTS</title>
        <meta
          name="description"
          content="Commitments of Traders (COT) Reports"
        />
      </Head>

      <Checker tier={3}>
        <Navbar user={user} />

        <div className="content-wrapper">
          {loading && (
            <h4 className="text-white text-center pt-5 blink">
              PLEASE WAIT COT REPORTS ARE DOWNLOADING...
            </h4>
          )}

          {!loading && data && data.length > 0 && (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row pt-4">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title mb-0">
                            % Change of Non-Commercial positions
                          </h5>
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
                                {data && data.length > 0 && (
                                  <>
                                    {data.map((entry, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{date && formatDate(date)}</td>
                                          <td>{entry.pair}</td>
                                          <td>
                                            <div
                                              class="progress progress-sm"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                class="progress-bar progress-bar-striped progress-bar-animated"
                                                aria-valuenow={entry.pair_pct_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                  width: `${entry.pair_pct_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                              ></div>
                                            </div>
                                            {entry.pair_pct_change.toFixed(2)}%
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                  <div className="row pt-4">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title mb-0">
                            % Change of Commercial positions
                          </h5>
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
                                {data && data.length > 0 && (
                                  <>
                                    {data.map((entry, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{date && formatDate(date)}</td>
                                          <td>{entry.pair}</td>
                                          <td>
                                            <div
                                              class="progress progress-sm"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                class="progress-bar progress-bar-striped progress-bar-animated"
                                                aria-valuenow={entry.pair_comm_pct_change.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                  width: `${entry.pair_comm_pct_change.toFixed(
                                                    2
                                                  )}%`,
                                                }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                                              style={{ height: "20px" }}
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
                  <div className="row pt-4">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title mb-0">
                            % Change of Open Interest
                          </h5>
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
                                {data && data.length > 0 && (
                                  <>
                                    {data.map((entry, index) => {
                                      return (
                                        <tr key={index}>
                                          <td>{date && formatDate(date)}</td>
                                          <td>{entry.pair}</td>
                                          <td>
                                            <div
                                              class="progress progress-sm"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                class="progress-bar progress-bar-striped progress-bar-animated"
                                                aria-valuenow={entry.pair_pct_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{
                                                  width: `${entry.pair_pct_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                              ></div>
                                            </div>
                                            {entry.pair_pct_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_2_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_2_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_2_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_3_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_3_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_3_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_4_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_4_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_4_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_5_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_5_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_5_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_6_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_6_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_6_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_7_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_7_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_7_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_8_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_8_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_8_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_9_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_9_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_9_week_change_open_interest.toFixed(
                                              2
                                            )}
                                            %
                                          </td>
                                          <td>
                                            <div
                                              className="progress"
                                              style={{ height: "20px" }}
                                            >
                                              <div
                                                className="progress-bar progress-bar-striped progress-bar-animated"
                                                style={{
                                                  width: `${entry.pair_10_week_change_open_interest.toFixed(
                                                    2
                                                  )}%`,
                                                }}
                                                aria-valuenow={entry.pair_10_week_change_open_interest.toFixed(
                                                  2
                                                )}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            {entry.pair_10_week_change_open_interest.toFixed(
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

export default Cotreport;
