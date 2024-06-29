import Head from "next/head";
import Navbarindex from "./components/navbarindex";
import Footer from "./components/footer";

function index() {
  return (
    <>
      <Head>
        <title>
          Frantzdy Trading CO - Trading become easier when you trade with us
        </title>
        <meta
          name="description"
          content="Frantzdy Trading CO - Trading become easier when you trade with us"
        />
      </Head>

      <Navbarindex />
      <Footer />
    </>
  );
}

export default index;
