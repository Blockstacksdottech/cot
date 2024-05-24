import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Head>

      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="/">
              <img
                src="/logo.png"
                alt="CopyTrading"
                className="h-25 img-fluid img-circle elevation-1"
              />
              <br />
              COT -
            </a>
          </div>

          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Login</p>

              <form action="/investor/dashboard" method="post">
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
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <a href="/forgot-password" className="small">
                      I forgot my password
                    </a>
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0 mt-2">
                Need an Account?{" "}
                <a href="/register" className="text-center">
                  Register yourself
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
