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

const Userlist = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fetchUserDetails = async () => {
    const resp = await req("user-details");
    if (resp) {
      console.log(resp);
      setData(resp);
    }
  };

  const fetchUserImage = async () => {
    const resp = await req("user-image");
    if (resp) {
      console.log(resp);
      setImage(resp);
    } else {
      setImage(null);
    }
  };

  const refreshUser = async () => {
    await fetchUserDetails();
    await fetchUserImage();
  };

  useEffect(() => {
    if (user.logged) {
      refreshUser().then(() => setLoading(false));
    }
  }, [user]);

  async function uploadPicture() {
    const files = document.getElementById("profilePicture").files;
    if (files.length === 0) {
      toast.error("Please select a picture");
    } else {
      const res = await uploadFiles(files, {}, "profile_picture", "user-image");
      if (res) {
        toast.success("Updated");
        await fetchUserImage();
      } else {
        toast.error("failed upload");
      }
    }
  }

  async function submitForm() {
    const fullName = document.getElementById("fullName").value;
    const mobile = document.getElementById("mobile").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const zipCode = document.getElementById("zipCode").value;

    // Append form data
    const body = {
      full_name: fullName,
      mobile: mobile,
      address: address,
      city: city,
      state: state,
      country: country,
      zip_code: zipCode,
    };
    setLoading(true);
    const resp = await postReq("user-details", body);
    if (resp) {
      toast.success("Updated");
      await fetchUserDetails();
    } else {
      toast.error("Failed updating User details");
    }
    setLoading(false);
  }

  const handleChange = async (e) => {
    e.preventDefault();

    // Validate new and confirm passwords
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password don't match.");
      return;
    }

    // Prepare data for API request
    const data = {
      old_password: currentPassword,
      new_password: newPassword,
    };

    try {
      // Make API request to update password
      const resp = await postReq("change-password", data);
      if (resp) {
        // Password updated successfully
        toast.success("Password updated successfully.");
        // Optionally, clear form fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Failed to update password. Please try again.");
      }
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("Failed to update password. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>Registered Users</title>
        <meta name="description" content="Register Users" />
      </Head>

      <Checker no_check={true}>
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
                                <th>Status</th>
                                <th></th>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <img
                                      alt="Avatar"
                                      className="table-avatar"
                                      src="/dist/img/avatar5.png"
                                    />
                                  </td>
                                  <td>Full Name</td>
                                  <td>email@email.com</td>
                                  <td>9999999999</td>
                                  <td>47 W 13th Street</td>
                                  <td>New York</td>
                                  <td>New York</td>
                                  <td>USA</td>
                                  <td>10011</td>
                                  <td>
                                    <a className="badge bg-success">Active</a>
                                    <a className="badge bg-danger">Banned</a>
                                  </td>
                                  <td>
                                    <a className="btn btn-sm btn-danger">
                                      <i className="fa fa-ban"></i>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img
                                      alt="Avatar"
                                      className="table-avatar"
                                      src="/dist/img/avatar5.png"
                                    />
                                  </td>
                                  <td>Full Name</td>
                                  <td>email@email.com</td>
                                  <td>9999999999</td>
                                  <td>47 W 13th Street</td>
                                  <td>New York</td>
                                  <td>New York</td>
                                  <td>USA</td>
                                  <td>10011</td>
                                  <td>
                                    <a className="badge bg-success">Active</a>
                                    <a className="badge bg-danger">Banned</a>
                                  </td>
                                  <td>
                                    <a className="btn btn-sm btn-danger">
                                      <i className="fa fa-ban"></i>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img
                                      alt="Avatar"
                                      className="table-avatar"
                                      src="/dist/img/avatar5.png"
                                    />
                                  </td>
                                  <td>Full Name</td>
                                  <td>email@email.com</td>
                                  <td>9999999999</td>
                                  <td>47 W 13th Street</td>
                                  <td>New York</td>
                                  <td>New York</td>
                                  <td>USA</td>
                                  <td>10011</td>
                                  <td>
                                    <a className="badge bg-success">Active</a>
                                    <a className="badge bg-danger">Banned</a>
                                  </td>
                                  <td>
                                    <a className="btn btn-sm btn-danger">
                                      <i className="fa fa-ban"></i>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img
                                      alt="Avatar"
                                      className="table-avatar"
                                      src="/dist/img/avatar5.png"
                                    />
                                  </td>
                                  <td>Full Name</td>
                                  <td>email@email.com</td>
                                  <td>9999999999</td>
                                  <td>47 W 13th Street</td>
                                  <td>New York</td>
                                  <td>New York</td>
                                  <td>USA</td>
                                  <td>10011</td>
                                  <td>
                                    <a className="badge bg-success">Active</a>
                                    <a className="badge bg-danger">Banned</a>
                                  </td>
                                  <td>
                                    <a className="btn btn-sm btn-danger">
                                      <i className="fa fa-ban"></i>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img
                                      alt="Avatar"
                                      className="table-avatar"
                                      src="/dist/img/avatar5.png"
                                    />
                                  </td>
                                  <td>Full Name</td>
                                  <td>email@email.com</td>
                                  <td>9999999999</td>
                                  <td>47 W 13th Street</td>
                                  <td>New York</td>
                                  <td>New York</td>
                                  <td>USA</td>
                                  <td>10011</td>
                                  <td>
                                    <a className="badge bg-success">Active</a>
                                    <a className="badge bg-danger">Banned</a>
                                  </td>
                                  <td>
                                    <a className="btn btn-sm btn-danger">
                                      <i className="fa fa-ban"></i>
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
