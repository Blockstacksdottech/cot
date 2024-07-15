import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { req, postReq } from "@/helpers";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const rid = searchParams.get("reqId");
  const [loading, setLoading] = useState(true);
  const nav = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const verifyId = async (rid) => {
    const resp = await req(`request-password-reset?rid=${rid}`);
    if (!resp) {
      toast.error("Request ID not valid");
      nav.push("/");
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rid) {
      verifyId(rid);
    }
  }, [rid]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await postReq("reset-password", {
        recovery_id: rid,
        new_password: password,
      });

      if (response) {
        toast.success("Password reset successfully. You can now log in.");
      }
    } catch (error) {
      console.log(error);
    }
    //nav.push("/login");
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
      {!loading && (
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
                <p className="login-box-msg">Set your new password.</p>

                <form>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={handleUpdate}
                      >
                        Reset Password
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
      )}
    </>
  );
}
