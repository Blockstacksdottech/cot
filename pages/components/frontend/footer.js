import { Fragment, useState, useEffect } from "react";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update the year when the component mounts
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="main-footer">
      <div className="float-right d-none d-sm-inline">
        Designed and Developed by Blockstacks Technologies Limited
      </div>
      <strong>
        Copyright &copy; {year} <a>Frantzdy Trading Co.</a>
      </strong>{" "}
      All rights reserved.
    </footer>
  );
}
