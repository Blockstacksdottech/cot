import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component } from "react";
import Checker from "./components/Checker";

export default function Announcement() {
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
                    <div className="card card-default">
                      <div className="card-header">
                        <div className="clearfix">
                          <div className="float-left">
                            <p className="mb-0">Date: Tue, 16 July, 2024</p>
                          </div>
                          <div className="float-right">
                            <p className="mb-0">Time: 01:12 PM</p>
                          </div>
                        </div>
                        <h4 className="card-title mt-2">
                          Lorem ipsum dolor sit amet
                        </h4>
                      </div>
                      <div className="card-body">
                        <p className="mb-0 p-tag-big">
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of
                          the more obscure Latin words, consectetur, from a
                          Lorem Ipsum passage, and going through the cites of
                          the word in classical literature, discovered the
                          undoubtable source. Lorem Ipsum comes from sections
                          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                          (The Extremes of Good and Evil) by Cicero, written in
                          45 BC. This book is a treatise on the theory of
                          ethics, very popular during the Renaissance. The first
                          line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                          comes from a line in section 1.10.32.
                        </p>
                      </div>
                    </div>
                    <div className="card card-default">
                      <div className="card-header">
                        <div className="clearfix">
                          <div className="float-left">
                            <p className="mb-0">Date: Tue, 16 July, 2024</p>
                          </div>
                          <div className="float-right">
                            <p className="mb-0">Time: 01:12 PM</p>
                          </div>
                        </div>
                        <h4 className="card-title mt-2">
                          Lorem ipsum dolor sit amet
                        </h4>
                      </div>
                      <div className="card-body">
                        <p className="mb-0 p-tag-big">
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of
                          the more obscure Latin words, consectetur, from a
                          Lorem Ipsum passage, and going through the cites of
                          the word in classical literature, discovered the
                          undoubtable source. Lorem Ipsum comes from sections
                          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                          (The Extremes of Good and Evil) by Cicero, written in
                          45 BC. This book is a treatise on the theory of
                          ethics, very popular during the Renaissance. The first
                          line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                          comes from a line in section 1.10.32.
                        </p>
                      </div>
                    </div>
                    <div className="card card-default">
                      <div className="card-header">
                        <div className="clearfix">
                          <div className="float-left">
                            <p className="mb-0">Date: Tue, 16 July, 2024</p>
                          </div>
                          <div className="float-right">
                            <p className="mb-0">Time: 01:12 PM</p>
                          </div>
                        </div>
                        <h4 className="card-title mt-2">
                          Lorem ipsum dolor sit amet
                        </h4>
                      </div>
                      <div className="card-body">
                        <p className="mb-0 p-tag-big">
                          Contrary to popular belief, Lorem Ipsum is not simply
                          random text. It has roots in a piece of classical
                          Latin literature from 45 BC, making it over 2000 years
                          old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of
                          the more obscure Latin words, consectetur, from a
                          Lorem Ipsum passage, and going through the cites of
                          the word in classical literature, discovered the
                          undoubtable source. Lorem Ipsum comes from sections
                          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                          (The Extremes of Good and Evil) by Cicero, written in
                          45 BC. This book is a treatise on the theory of
                          ethics, very popular during the Renaissance. The first
                          line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                          comes from a line in section 1.10.32.
                        </p>
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
