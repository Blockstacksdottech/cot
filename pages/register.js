import Head from "next/head";
import Link from "next/link";
import Footer from "./components/footer";
import { adduser, isLogged } from "@/helpers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Navbar from "./components/frontend/navbar";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useRouter();

  useEffect(() => {
    async function test() {
      let resp = await isLogged();
      console.log(resp);
      let obj = { ...user };
      if (resp) {
        obj.logged = true;
        obj.username = resp.username;
        obj.email = resp.email;
        obj.valid = resp.isValidSub;
        obj.tier = resp.tier;
        obj.isAdmin = resp.is_superuser;
        setUser(obj);
        //await updateSuppliers();
        return obj;
      } else {
        return obj;
      }
    }

    test().then((obj) => {
      if (obj.logged) {
        if (obj.isAdmin) {
          nav.push("/cot-data");
        } else if (obj.valid) {
          nav.push("/cotscanner");
        } else {
          nav.push("/joinus");
        }
      } else {
        nav.push("/login");
      }
    });
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation checks
    if (!name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter a password.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Check if terms checkbox is checked
    const termsChecked = document.getElementById("agreeTerms").checked;
    if (!termsChecked) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    // Call the adduser function with proper handling of success and error scenarios
    try {
      const result = await adduser(email, password, name); // Assuming adduser expects an object

      if (result) {
        toast.success(
          "Registration successful! Please check your email for verification."
        );
        nav.push("/login");
        // Redirect to login page or dashboard after successful registration (optional)
      } else {
        throw new Error(result.message || "Registration failed."); // Handle specific error messages from adduser
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>
          Register | Frantzdy Trading CO - Trading become easier when you trade
          with us
        </title>
        <meta
          name="description"
          content="Frantzdy Trading CO - Trading become easier when you trade with us"
        />
      </Head>
      <Navbar />
      <div className="register-page">
        <div className="register-box">
          <div className="card">
            <div className="card-body register-card-body">
              <p className="register-box-msg">Register</p>

              <form action="/dashboard" method="post">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Retype password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8 my-auto">
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
                    <button
                      onClick={handleRegister}
                      className="btn btn-primary btn-block"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
