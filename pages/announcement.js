import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component, useEffect, useState } from "react";
import Checker from "./components/Checker";
import { req, postReq, formatDateLocal } from "@/helpers";

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    const resp = await req("announcement");
    if (resp) {
      setAnnouncements(resp);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
      </Head>
      <Checker tier={1}>
        <Navbar />

        <div className="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row my-3">
                <div class="col-lg-12 text-center">
                  <h1 className="head-text-big text-white">Announcement</h1>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section>
              <div className="container-fluid">
                <div class="row">
                  <div className="col-lg-12">
                    {announcements &&
                      announcements.map((e, i) => {
                        return (
                          <div className="card card-default">
                            <div className="card-header">
                              <div className="clearfix">
                                <div className="float-left">
                                  <p className="mb-0">
                                    {formatDateLocal(e.date)}
                                  </p>
                                </div>
                              </div>
                              <h4 className="card-title mt-2">{e.topic}</h4>
                            </div>
                            <div className="card-body">
                              <p className="mb-0 p-tag-big">{e.description}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Checker>

      <Footer />
    </>
  );
}
