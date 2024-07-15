import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  formatImage,
  isLogged,
  patchReq,
  postReq,
  req,
  uploadFiles,
} from "@/helpers";
import { useRouter } from "next/router";
import Checker from "./components/Checker";
import { UserContext } from "@/contexts/UserContextData";
import { toast } from "react-toastify";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [newLink, setNewLink] = useState(null);

  const fetchFile = async () => {
    const resp = await req("pdf-file");
    if (resp) {
      console.log(resp);
      setFile(resp);
    } else {
      setFile(null);
    }
  };

  const fetchLink = async () => {
    const resp = await req("video-link");
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
    if (user.logged) {
      refreshData().then(() => setLoading(false));
    }
  }, [user]);

  async function updateFile() {
    const files = document.getElementById("pdf").files;
    if (files.length === 0) {
      toast.error("Please select a picture");
    } else {
      const res = await uploadFiles(files, {}, "file", "pdf-file");
      if (res) {
        toast.success("Updated");
        await fetchFile();
      } else {
        toast.error("failed upload");
      }
    }
  }

  const updateLink = async () => {
    const body = {
      link: newLink,
    };
    const resp = await postReq("video-link", body);
    if (resp) {
      toast.success("updated");
      fetchLink();
    } else {
      toast.error("Failed Updating link");
    }
  };

  const deleteVid = async (vid) => {
    console.log(`deleting vid id : ${vid}`);
    const resp = await postReq("delete-video-link", { vid });
    if (resp) {
      toast.success("deleted");
      fetchLink();
    } else {
      toast.error("Failed deleting link");
    }
  };

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Settings" />
      </Head>

      <Checker only_admin={true}>
        {!loading && (
          <>
            <Navbar user={user} />

            <div className="content-wrapper">
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mt-2">
                    <div className="col-sm-12">
                      <h1 className="m-0 text-white">Videos & PDF</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title">Videos</h5>
                        </div>
                        <div className="card-body">
                          <form>
                            <div className="form-group">
                              <input
                                id="youtubeLink"
                                type="text"
                                className="form-control"
                                placeholder="Youtube Link"
                                defaultValue=""
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                              />
                            </div>
                            <div className="form-group float-right">
                              <a
                                className="btn btn-primary"
                                onClick={updateLink}
                              >
                                Save
                              </a>
                            </div>
                          </form>
                          {links &&
                            links.map((e, i) => (
                              <div className="form-group">
                                <table className="table table-sm table-bordered">
                                  <tbody>
                                    <tr>
                                      <td>#</td>
                                      <td>{e.link}</td>
                                      <td onClick={() => deleteVid(e.id)}>
                                        <a className="btn btn-sm btn-danger">
                                          <i className="fa fa-trash"></i>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="card card-primary card-outline">
                        <div className="card-header">
                          <h5 className="card-title">PDF</h5>
                        </div>
                        <div className="card-body">
                          <form>
                            <div className="form-group">
                              <input
                                id="pdf"
                                type="file"
                                className="form-control"
                                placeholder="PDF"
                              />
                            </div>
                            <div className="form-group float-right">
                              <a
                                className="btn btn-primary"
                                onClick={updateFile}
                              >
                                Save
                              </a>
                            </div>
                          </form>
                          {file && (
                            <div className="form-group">
                              <table className="table table-sm table-bordered">
                                <tbody>
                                  <tr>
                                    <td>#</td>
                                    <td>
                                      <a
                                        href={formatImage(file.file)}
                                        download
                                        target="_blank"
                                      >
                                        {file.file}
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <Footer />
      </Checker>
    </>
  );
};

export default Settings;
