import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  formatImage,
  getSubName,
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

const Userlist = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const resp = await req("userlist");
    if (resp) {
      setUsers(resp);
    }
    setLoading(false);
  };

  const switchStatus = async (id) => {
    const resp = await postReq("userlist", {
      userid: id,
    });
    if (resp) {
      toast.success("User Banned");
      fetchUsers();
    } else {
      toast.error("Failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Registered Users</title>
        <meta name="description" content="Register Users" />
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
                      <h1 className="m-0 text-white">Users List</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card card-primary card-outline">
                        <div className="card-body">
                          <div className="table-responsive p-0">
                            <table className="table table-bordered table-sm datatable projects">
                              <thead>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Zip</th>
                                <th>Subscription</th>
                                <th>Status</th>
                                <th></th>
                              </thead>
                              <tbody>
                                {users.map((e, i) => {
                                  return (
                                    <tr>
                                      <td>
                                        <img
                                          alt="Avatar"
                                          className="table-avatar"
                                          src={
                                            e.image
                                              ? formatImage(
                                                  e.image.profile_picture
                                                )
                                              : "/dist/img/avatar.png"
                                          }
                                        />
                                      </td>
                                      <td>{e.details.full_name}</td>
                                      <td>{e.email}</td>
                                      <td>{e.details.mobile}</td>
                                      <td>{e.details.address}</td>
                                      <td>{e.details.city}</td>
                                      <td>{e.details.state}</td>
                                      <td>{e.details.country}</td>
                                      <td>{e.details.zip_code}</td>
                                      <td>
                                        {e.sub.valid
                                          ? getSubName(e.sub.tier)
                                          : "Free"}
                                      </td>
                                      <td>
                                        {e.is_active && (
                                          <a className="badge bg-success">
                                            Active
                                          </a>
                                        )}
                                        {!e.is_active && (
                                          <a className="badge bg-danger">
                                            Banned
                                          </a>
                                        )}
                                      </td>
                                      <td onClick={() => switchStatus(e.id)}>
                                        <a className="btn btn-sm btn-danger">
                                          <i className="fa fa-ban"></i>
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
              </div>
            </div>
          </>
        )}

        <Footer />
      </Checker>
    </>
  );
};

export default Userlist;
