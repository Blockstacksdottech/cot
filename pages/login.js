import { get_token, isLogged } from "@/helpers";
import Head from "next/head";
import Link from "next/link";
import Footer from "./components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [user, setUser] = useState({
    logged: false,
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const nav = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function test() {
      let resp = await isLogged();
      console.log(resp);
      let obj = { ...user };
      if (resp) {
        obj.logged = true;
        obj.username = resp.username;
        obj.email = resp.email;
        setUser(obj);
        //await updateSuppliers();
        return obj;
      } else {
        return obj;
      }
    }

    test().then((obj) => {
      if (obj.logged) {
        nav.push("/cot-data");
      } else {
        setLoading(false);
      }
    });
  }, []);

  async function login(email, password) {
    const res = await get_token(email, password);
    if (res) {
      toast.success("logged in");
      nav.push("/cot-data");
    } else {
      toast.error("Failed");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <Head>
        <title>
          Login | Frantzdy Trading CO - Trading become easier when you trade
          with us
        </title>
        <meta
          name="description"
          content="Frantzdy Trading CO - Trading become easier when you trade with us"
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
              <p className="login-box-msg">Login</p>

              <form onSubmit={handleSubmit}>
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
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8 my-auto">
                    <a href="/forgot-password">I forgot my password</a>
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              <p className="mb-0 mt-3">
                Need an Account?{" "}
                <a href="/register" className="text-center">
                  Register yourself
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
