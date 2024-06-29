import Head from "next/head";
import Navbar from "./components/frontend/navbar";
import Footer from "./components/frontend/footer";

function index() {
  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
      </Head>
      <Navbar />

      <Footer />
    </>
  );
}

export default index;
