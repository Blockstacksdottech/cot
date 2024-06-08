import { useRouter } from "next/router";
import React, { useEffect } from "react";

function index() {
  const nav = useRouter();
  useEffect(() => {
    nav.push("/login");
  }, []);
  return <></>;
}

export default index;
