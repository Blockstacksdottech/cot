import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { useEffect, useState } from "react";
import Checker from "./components/Checker";
import { req, postReq, deleteReq, formatDate } from "@/helpers";
import { toast } from "react-toastify";

export default function CreateAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const fetchAnnouncements = async () => {
    const resp = await req("adm-announcement");
    if (resp) {
      setAnnouncements(resp);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const create_Announcement = async (e) => {
    e.preventDefault();
    const body = {
      topic,
      description,
    };
    const resp = await postReq("adm-announcement/", body);
    if (resp) {
      toast.success("Announcement created");
      fetchAnnouncements();
    }
  };

  const deleteAnnounc = async (id) => {
    const resp = await deleteReq(`adm-announcement/${id}`);
    if (resp) {
      toast.success("Deleted");
      fetchAnnouncements();
    } else {
      toast.error("Failed");
    }
  };

  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
      </Head>
      <Checker only_admin={true}>
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
                              value={topic}
                              onChange={(e) => setTopic(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              placeholder="Description"
                              rows={7}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="form-group float-right">
                            <button
                              className="btn btn-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                console.log("clicked");
                                create_Announcement(e);
                              }}
                            >
                              Save
                            </button>
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
                                <th>Topic</th>
                                <th>Description</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {announcements &&
                                announcements.map((e, i) => {
                                  return (
                                    <tr>
                                      <td>{formatDate(new Date(e.date))}</td>
                                      <td>{e.topic}</td>
                                      <td style={{ width: "50%" }}>
                                        {e.description}
                                      </td>
                                      <td>
                                        <a
                                          className="btn btn-sm btn-danger"
                                          onClick={() => deleteAnnounc(e.id)}
                                        >
                                          <i className="fa fa-trash"></i>
                                        </a>
                                      </td>
                                    </tr>
                                  );
                                })}
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
