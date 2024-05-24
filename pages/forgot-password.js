import Head from "next/head";

export default function Forgotpassword() {
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
                alt="COT - Advanced COT Report Expert Advisor"
                className="h-25 img-fluid img-circle elevation-1"
              />
              <br />
              COT - Advanced COT Report Expert Advisor
            </a>
          </div>

          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>

              <form action="/cot-data" method="post">
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-block">
                      Request New Password
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0 mt-3">
                <a href="/register" className="text-center">
                  Login
                </a>
              </p>
              <p className="mb-0 mt-2">
                <a href="/register" className="text-center">
                  Register New Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
