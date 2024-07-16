import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React from "react";
import Checker from "./components/Checker";

export default function CreateAnnouncement() {
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
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">Create Announcement</h5>
                      </div>
                      <div className="card-body">
                        <form>
                          <div className="form-group">
                            <input
                              id="topic"
                              type="text"
                              className="form-control"
                              placeholder="Topic of Announcement"
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Description"
                              rows={7}
                            ></textarea>
                          </div>
                          <div className="form-group float-right">
                            <a className="btn btn-primary">Save</a>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">Announcements</h5>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive p-0">
                          <table className="table table-bordered table-sm">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Topic</th>
                                <th>Description</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Tue, 16 July, 2024</td>
                                <td>01:12 PM</td>
                                <td>Lorem ipsum dolor sit amet</td>
                                <td style={{ width: "50%" }}>
                                  Contrary to popular belief, Lorem Ipsum is not
                                  simply random text. It has roots in a piece of
                                  classical Latin literature from 45 BC, making
                                  it over 2000 years old. Richard McClintock, a
                                  Latin professor at Hampden-Sydney College in
                                  Virginia, looked up one of the more obscure
                                  Latin words, consectetur, from a Lorem Ipsum
                                  passage, and going through the cites of the
                                  word in classical literature, discovered the
                                  undoubtable source. Lorem Ipsum comes from
                                  sections 1.10.32 and 1.10.33 of "de Finibus
                                  Bonorum et Malorum" (The Extremes of Good and
                                  Evil) by Cicero, written in 45 BC. This book
                                  is a treatise on the theory of ethics, very
                                  popular during the Renaissance. The first line
                                  of Lorem Ipsum, "Lorem ipsum dolor sit
                                  amet..", comes from a line in section 1.10.32.
                                </td>
                                <td>
                                  <a className="btn btn-sm btn-danger">
                                    <i className="fa fa-trash"></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
