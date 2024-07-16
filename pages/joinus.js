import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";
import React, { Component, useContext, useEffect, useState } from "react";
import Checker from "./components/Checker";
import { postReq, req } from "@/helpers";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { public_stripe_key } from "@/helpers/constants";
import { UserContext } from "@/contexts/UserContextData";
import { useRouter } from "next/router";

export default function Joinus(props) {
  const [payments, setPayments] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const nav = useRouter();

  const fetchSessionId = async (body) => {
    const res = await postReq("checkout", body);
    if (res) {
      await redirect_to_checkout(res.session_id);
    } else {
      toast.error("Failed checkout");
    }
  };

  const redirect_to_checkout = async (sess_id) => {
    const stripe = await loadStripe(public_stripe_key);
    console.log("before");
    const res = await stripe.redirectToCheckout({
      sessionId: sess_id,
    });
  };

  const fetchPayments = async () => {
    const resp = await req("/payment/subscribable-product", true);
    if (resp) {
      console.log(resp);
      setPayments(resp);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  function filterByNameKeyword(array, keyword) {
    return array.filter((obj) =>
      obj.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const handleCheckout = async (keyword) => {
    if (!user.logged) {
      toast.info("Register first");
      nav.push("/register");
    } else {
      if (user.valid) {
        nav.push("/cotscanner");
      }
      const objects = filterByNameKeyword(payments, keyword);
      if (objects.length > 0) {
        console.log(objects[0]);
        const payment_id = objects[0].price_id;
        const body = {
          price_id: payment_id,
        };
        await fetchSessionId(body);
      } else {
        toast.error("Not supported");
      }
    }
  };

  const getPrice = (keyword) => {
    const objects = filterByNameKeyword(payments, keyword);
    if (objects.length > 0) {
      console.log(objects[0]);
      const price = objects[0].price / 100;
      return price;
    } else {
      return null;
    }
  };

  return (
    <Checker no_login={true}>
      <>
        <Head>
          <title>
            Frantzdy Trading CO - Trading become easier when you trade with us
          </title>
        </Head>
        <Navbar />

        <div className="content-wrapper">
          <section class="content-header">
            <div class="container-fluid">
              <div class="row my-4">
                <div class="col-sm-12 text-center">
                  <h1 className="head-text-big text-white">
                    Join Frantzdy Trading CO
                  </h1>
                  <p className="mb-0 p-tag-big text-white">
                    Trading become easier when you trade with us
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="content">
            <section className="mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="h-100 card card-default">
                      <div className="card-header border-0 text-center">
                        BASIC
                        <h2 className="mb-0">
                          $
                          {getPrice("basic")
                            ? getPrice("basic").toFixed(2)
                            : "Undefined"}
                          /Month
                        </h2>
                        {/* <p>7-days free trial</p> */}
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">
                            Weekly COT report signal summaries
                          </li>
                          <li className="item">
                            Basic educational content on how to interpret COT
                            reports
                          </li>
                          <li className="item">Access to a community forum</li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleCheckout("basic")}
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="h-100 card card-secondary">
                      <div className="card-header border-0 text-center">
                        STANDARD
                        <h2 className="mb-0">
                          $
                          {getPrice("standard")
                            ? getPrice("standard").toFixed(2)
                            : "Undefined"}
                          /Month
                        </h2>
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">All Basic Plan features</li>
                          <li className="item">
                            Bi-weekly COT report signal analysis
                          </li>
                          <li className="item">
                            Detailed breakdowns of major market positions (e.g.,
                            futures, options)
                          </li>
                          <li className="item">
                            Monthly webinars with market experts
                          </li>
                          <li className="item">Priority email support</li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleCheckout("standard")}
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="h-100 card card-default">
                      <div className="card-header border-0 text-center">
                        PREMIUM
                        <h2 className="mb-0">
                          $
                          {getPrice("premium")
                            ? getPrice("premium").toFixed(2)
                            : "Undefined"}
                          /Month
                        </h2>
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">All Standard Plan features</li>
                          <li className="item">
                            Weekly in-depth COT report signal analysis
                          </li>
                          <li className="item">
                            Real-time alerts on significant COT report changes
                          </li>
                          <li className="item">
                            Access to exclusive market trend reports
                          </li>
                          <li className="item">
                            One-on-one consultation sessions (1 per month)
                          </li>
                          <li className="item">Dedicated account manager</li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleCheckout("premium")}
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="h-100 card card-secondary">
                      <div className="card-header border-0 text-center">
                        ENTERPRISE
                        <h3 className="mb-0">
                          $
                          {getPrice("custom")
                            ? getPrice("custom").toFixed(2)
                            : "Undefined"}
                          /2Years
                        </h3>
                      </div>
                      <div className="card-body p-0">
                        <ul className="products-list product-list-in-card text-center">
                          <li className="item">All Premium Plan features</li>
                          <li className="item">
                            Tailored COT report signal analysis based on
                            specific market interests
                          </li>
                          <li className="item">
                            Regular strategy sessions with top analysts
                          </li>
                          <li className="item">
                            On-demand market research reports
                          </li>
                          <li className="item">
                            Full access to historical COT data archives
                          </li>
                          <li className="item">
                            Priority support with a dedicated team
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-center">
                          <a
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleCheckout("custom")}
                          >
                            Select
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </>
    </Checker>
  );
}
