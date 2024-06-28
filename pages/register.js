import Head from "next/head";
import Link from "next/link";
import Footer from "./components/footer";
import { adduser } from "@/helpers";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const nav = useRouter();

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

      <div className="register-page">
        <div className="register-box">
          <div className="register-logo">
            <a href="/">
              <img
                src="/logo.png"
                alt="Frantzdy Trading CO - Trading become easier when you trade with us"
                className=" img-fluid"
              />
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
      <Footer />
    </>
  );
}
