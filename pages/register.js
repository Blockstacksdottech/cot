import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register | COT - Advanced COT Report Expert Advisor</title>
        <meta
          name="description"
          content="COT - Advanced COT Report Expert Advisor"
        />
      </Head>

      <div className="register-page">
        <div className="register-box">
          <div className="register-logo">
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
            <div className="card-body register-card-body">
              <p className="register-box-msg">Register</p>

              <form action="/dashboard" method="post">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                </div>
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
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Retype password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="terms"
                        value="agree"
                      />{" "}
                      <label>
                        I agree to the <a href="#">terms</a>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </div>
                </div>
              </form>

              <p className="mb-0 mt-2">
                Already have an account?{" "}
                <a href="/login" className="text-center">
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
