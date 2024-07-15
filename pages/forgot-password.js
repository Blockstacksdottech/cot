import { postReq } from "@/helpers";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Forgotpassword() {
  const [email, setEmail] = useState("");
  const nav = useRouter();

  const requestChange = async (e) => {
    e.preventDefault();
    const resp = await postReq("request-password-reset", { email });

    if (resp) {
      toast.success("Request Sent. Please check your email");
      //nav.push("/");
    } else {
      toast.error("Failed");
    }
  };

  return (
    <>
      <Head>
        <title>
          Forgot Password | COT - Advanced COT Report Expert Advisor
        </title>
        <meta
          name="description"
          content="COT - Advanced COT Report Expert Advisor"
        />
      </Head>

      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="/">
              <img
                src="/logo.png"
                alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                className="img-fluid"
              />
            </a>
          </div>

          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>

              <form>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block"
                      onClick={requestChange}
                    >
                      Request New Password
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0 mt-3">
                <a href="/login" className="text-center">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
