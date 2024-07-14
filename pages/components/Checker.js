import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContextData";
import { isLogged } from "@/helpers";
import { useRouter } from "next/router";

function Checker({ children, tier, no_check, only_admin }) {
  const { user, setUser } = useContext(UserContext);
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
        return obj;
      } else {
        return obj;
      }
    }

    test().then((obj) => {
      if (obj.logged) {
        if (only_admin) {
          if (obj.isAdmin) {
            return;
          } else {
            nav.push("/cotscanner");
          }
        }
        if (no_check) {
          return;
        }
        if (obj.isAdmin) {
          return;
        }
        if (obj.valid) {
          if (obj.tier >= tier) {
            return;
          } else {
            nav.push("/cotscanner");
          }
        } else {
          nav.push("/joinus");
        }
      } else {
        nav.push("/login");
      }
    });
  }, []);
  return <>{children}</>;
}

export default Checker;
