import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component, useEffect, useState } from "react";
import Checker from "./components/Checker";
import { formatImage, req } from "@/helpers";

export default function VideoPdf() {
  const [links, setLinks] = useState([]);
  const [pdf, setPdf] = useState(null);

  const fetchFile = async () => {
    const resp = await req("public-pdf-file");
    if (resp) {
      console.log(resp);
      setPdf(resp);
    } else {
      setPdf(null);
    }
  };

  const fetchLink = async () => {
    const resp = await req("public-video-link");
    if (resp) {
      console.log(resp);
      setLinks(resp);
    } else {
      setLinks(null);
    }
  };

  const refreshData = async () => {
    await fetchLink();
    await fetchFile();
  };

  useEffect(() => {
    refreshData();
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
              <div class="row my-5">
                <div class="col-lg-12 text-center">
                  <h1 className="head-text-big text-white">Video and PDF</h1>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section>
              <div className="container-fluid">
                <div class="row">
                  <div className="col-lg-8">
                    {links &&
                      links.map((e, i) => {
                        return (
                          <div className="video">
                            <div class="embed-responsive embed-responsive-16by9">
                              <iframe
                                class="embed-responsive-item"
                                src={e.link}
                                allowFullScreen
                              ></iframe>
                            </div>
                            <h5 className="text-white my-4 text-center">
                              {e.topic}
                            </h5>
                          </div>
                        );
                      })}
                  </div>
                  <div className="col-lg-4">
                    <div class="card">
                      <div class="card-header">
                        <h3 class="card-title">PDF</h3>
                      </div>
                      <div class="card-body p-0">
                        <ul class="nav nav-pills flex-column">
                          {pdf &&
                            pdf.map((e, i) => {
                              return (
                                <li class="nav-item">
                                  <a
                                    class="nav-link p-tag-big"
                                    href={formatImage(e.file)}
                                    download
                                  >
                                    <i class="fas fa-file-pdf"></i> {e.topic}
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
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
