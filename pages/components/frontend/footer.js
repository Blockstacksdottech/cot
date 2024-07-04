import { Fragment, useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year when the component mounts
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <section className="mt-4">
        <div className="container-fluid">
          <div className="col-lg-12 text-white">
            <p className="text-small">
              <strong>Disclaimer:</strong> The information on this website is
              for general purposes only and shouldn't be considered specific
              investment advice. It's not tailored to your individual situation
              or financial goals. While we strive for accuracy, the content can
              change without notice. We recommend consulting with a qualified
              financial advisor before making any investment decisions. Frantzdy
              Trading Co. is not responsible for any losses you may incur based
              on the information provided.
            </p>
          </div>
        </div>
      </section>
      <footer className="main-footer">
        <div className="float-right">
          Designed and Developed by Blockstacks Technologies Limited
        </div>
        <strong>
          Copyright &copy; {year} <a>Frantzdy Trading Co.</a>
        </strong>{" "}
        All rights reserved.
      </footer>
    </>
  );
}
