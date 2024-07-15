import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component } from "react";
import Checker from "./components/Checker";

export default function ContactUs() {
  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
      </Head>
      <Checker no_check={true} no_login={true}>
        <Navbar />

        <div className="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row my-5">
                <div class="col-lg-12 text-center">
                  <h1 className="head-text-big text-white">Contact Us</h1>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section className="mt-5">
              <div className="container">
                <div class="row">
                  <div class="col-lg-5 m-auto text-center">
                    <div class="text-white">
                      <h2>Frantzdy Trading CO</h2>
                      <p class="lead mb-3">
                        Email:{" "}
                        <a
                          href="mailto:frantzdytradingco@gmail.com"
                          className="text-white"
                        >
                          frantzdytradingco@gmail.com
                        </a>
                        <br />
                        Phone: +1 (407) 969-8519
                      </p>
                      <p className="mb-0">
                        <a
                          className="btn btn-secondary mr-2"
                          href="https://t.me/+ytdCx5c9JltmZjEx"
                          target="_blank"
                        >
                          <i class="fab fa-telegram"></i> Telegram
                        </a>
                        <a
                          className="btn btn-secondary"
                          href="https://discord.gg/TaeYTC3n33"
                          target="_blank"
                        >
                          <i class="fab fa-discord"></i> Discord
                        </a>
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div className="row">
                      <div className="col-lg-4">
                        <div class="form-group">
                          <label className="text-white">Name</label>
                          <input
                            type="text"
                            id="inputName"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div class="form-group">
                          <label className="text-white">E-Mail</label>
                          <input
                            type="email"
                            id="inputEmail"
                            class="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div class="form-group">
                          <label className="text-white">Subject</label>
                          <input
                            type="text"
                            id="inputSubject"
                            class="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div class="form-group">
                          <label className="text-white">Message</label>
                          <textarea
                            id="inputMessage"
                            class="form-control"
                            rows="4"
                          ></textarea>
                        </div>
                        <div class="form-group float-right">
                          <input
                            type="submit"
                            class="btn btn-secondary"
                            value="Send message"
                          />
                        </div>
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
