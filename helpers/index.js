import axios from "axios";

//export const base = "http://127.0.0.1:8000";
export const base = "https://frantzdytradingco.com";
export const api = base + "/api/";
//var fileDownload = require('js-file-download');
function set_header(token = null) {
  try {
    console.log(token);
    if (token == null) {
      var obj = {
        "Content-Type": "application/json",
      };
    } else {
      var obj = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      };
    }

    console.log(obj);
    return obj;
  } catch (error) {
    console.log(error);
  }
}

export const filterData = (data, q) => {
  let limit = 9;
  let final = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j].offre.titre.toLowerCase().includes(q)) {
        temp.push(data[i][j]);
        if (temp.length == limit) {
          final.push(temp);
          temp = [];
        }
      }
    }
  }
  if (temp.length > 0) {
    final.push(temp);
  }
  return final;
};

export async function moduser(
  username = null,
  email = null,
  password = null,
  name = null,
  tel = null,
  address = null,
  id
) {
  let access = sessionStorage.getItem("accessToken");

  let body = {
    email,
    name,
    tel,
    address,
    password,
    id,
  };

  let headers = set_header(access);

  let options = {
    method: "post",
    body: JSON.stringify(body),
    headers: headers,
  };

  //let preResp = await fetch(api + 'users', options);

  let res = await postReq("users", body);
  return res;
}

export const handleResp = (resp, addToast) => {
  if (resp) {
    if (resp.failed == false) {
      addToast(resp.message, {
        autoDismiss: true,
        appearance: "success",
      });
    } else if (resp.failed) {
      addToast(resp.message, {
        autoDismiss: true,
        appearance: "error",
      });
    } else {
      addToast("error", {
        autoDismiss: true,
        appearance: "error",
      });
    }
  } else {
    addToast("Failed", {
      autoDismiss: true,
      appearance: "error",
    });
  }
};

export async function addUserWithUpload(
  username = null,
  email = null,
  password = null,
  name = null,
  address = null,
  tel = null,
  files = null
) {
  let form_data = new FormData();
  let access = sessionStorage.getItem("accessToken");
  //access =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ4OTc3OTkwLCJqdGkiOiIyY2EyY2NjMjFmMjQ0YjQyYTc3MjgzYjAzZGM2MTdhMSIsInVzZXJfaWQiOjJ9.uGyjMDKwWTMowoBgxNLiDbfijFcwutbKBkLNrXlvnTA"
  let headers = set_header(access, true);
  let body = {
    email,
    username,
    password,
    name,
    tel,
    address,
  };
  console.log(body);
  let key = "logo";
  let endpoint = "adduserwithupload";
  for (let i = 0; i < files.length; i++) {
    form_data.append(key, files[i], files[i].name);
  }

  for (let key of Object.keys(body)) {
    form_data.append(key, body[key]);
  }

  let url = api + endpoint;
  try {
    let resp = await axios.post(url, form_data, {
      headers,
    });
    console.log(resp.status);
    console.log(resp.data);

    if (resp.status == 201) {
      return true;
    } else if (resp.status == 200 || resp.status == 400) {
      return resp.data;
    } else {
      console.log("other errors");
      return false;
    }
  } catch (error) {
    let resp = error.response;
    console.log(resp);
    if (resp.status == 401) {
      let dec = await refreshToken();
      if (dec) {
        return addUserWithUpload(
          username,
          email,
          password,
          name,
          address,
          tel,
          files
        );
      } else {
        return false;
      }
    } else {
      console.log("other errors");
      return false;
    }
  }
}

export async function adduser(email = null, password = null, name = null) {
  let access = sessionStorage.getItem("accessToken");

  let data = {
    email,
    username: name,
    password,
    name,
  };

  let body = data;

  let headers = set_header(access);

  let options = {
    method: "post",
    body: JSON.stringify(body),
    headers: headers,
  };

  let res = await postReq("register", body);
  return res;
}

export const registerUploadFiles = async (files, body, key, endpoint) => {
  let form_data = new FormData();
  let access = sessionStorage.getItem("accessToken");
  //access =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ4OTc3OTkwLCJqdGkiOiIyY2EyY2NjMjFmMjQ0YjQyYTc3MjgzYjAzZGM2MTdhMSIsInVzZXJfaWQiOjJ9.uGyjMDKwWTMowoBgxNLiDbfijFcwutbKBkLNrXlvnTA"
  let headers = set_header(access, true);
  console.log(files);
  for (let i = 0; i < files.length; i++) {
    form_data.append(key, files[i], files[i].name);
  }

  /* form_data.append('front',files.front,files.front.name);
    form_data.append('back',files.back,files.back.name);
    form_data.append('selfie',files.selfie,files.selfie.name); */

  for (let key of Object.keys(body)) {
    let temp = body[key];
    for (let key2 of Object.keys(temp)) {
      form_data.append(key2, temp[key2]);
    }
  }
  let url = api + endpoint;
  try {
    let resp = await axios.post(url, form_data, {
      headers,
    });
    console.log(resp.status);
    console.log(resp.data);

    if (resp.status == 201) {
      return true;
    } else if (resp.status == 200 || resp.status == 400) {
      return resp.data;
    } else {
      console.log("other errors");
      return false;
    }
  } catch (error) {
    let resp = error.response;
    console.log(resp);
    if (resp.status == 401) {
      let dec = await refreshToken();
      if (dec) {
        return registerUploadFiles(files, body, key, endpoint);
      } else {
        return false;
      }
    } else {
      console.log("other errors");
      return false;
    }
  }
};

export const uploadFiles = async (files, body, key, endpoint) => {
  let form_data = new FormData();
  let access = sessionStorage.getItem("accessToken");
  //access =  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ4OTc3OTkwLCJqdGkiOiIyY2EyY2NjMjFmMjQ0YjQyYTc3MjgzYjAzZGM2MTdhMSIsInVzZXJfaWQiOjJ9.uGyjMDKwWTMowoBgxNLiDbfijFcwutbKBkLNrXlvnTA"
  let headers = set_header(access, true);
  headers["Content-Type"] = "multipart/form-data";
  console.log(files);
  console.log(files.length);
  for (let i = 0; i < files.length; i++) {
    console.log("adding");
    form_data.append(key, files[i], files[i].name);
  }

  /* form_data.append('front',files.front,files.front.name);
    form_data.append('back',files.back,files.back.name);
    form_data.append('selfie',files.selfie,files.selfie.name); */

  for (let key of Object.keys(body)) {
    form_data.append(key, body[key]);
  }
  console.log(form_data);
  let url = api + endpoint;
  try {
    let resp = await axios.post(url, form_data, {
      headers,
    });
    console.log(resp.status);

    if (resp.status == 201 || resp.status === 200) {
      return true;
    } else {
      console.log("other errors");
      return false;
    }
  } catch (error) {
    let resp = error.response;
    console.log(resp);
    if (resp.status == 401) {
      let dec = await refreshToken();
      if (dec) {
        return uploadFiles(files, body, key, endpoint);
      } else {
        return false;
      }
    } else {
      console.log("other errors");
      return false;
    }
  }
};

export async function get_token(username = null, password = null) {
  let body = {
    email: username,
    password,
  };

  let headers = set_header();

  let options = {
    method: "post",
    body: JSON.stringify(body),
    headers: headers,
    mode: "cors",
  };

  let preResp = await fetch(api + "token", options);
  if (preResp.ok) {
    console.log("got token");
    var resp = await preResp.json();
    let access = resp.access;
    let refresh = resp.refresh;
    sessionStorage.setItem("refreshToken", refresh);
    sessionStorage.setItem("accessToken", access);
    resp = await isLogged();
    return resp;
  } else {
    return false;
  }
}

export async function registerCall(data) {
  console.log(data);

  let headers = set_header();

  let options = {
    method: "post",
    body: JSON.stringify(data),
    headers: headers,
    mode: "cors",
  };

  let preResp = await fetch(api + "register", options);

  if (preResp.ok) {
    let nextresp = await get_token(data.username, data.password);
    return nextresp;
  } else {
    return false;
  }
}

export async function refreshToken() {
  let refresh = sessionStorage.getItem("refreshToken");
  let headers = set_header();
  let options = {
    method: "post",
    body: JSON.stringify({
      refresh,
    }),
    headers: headers,
    mode: "cors",
  };

  let preResp = await fetch(api + "token/refresh", options);
  if (preResp.ok) {
    let resp = await preResp.json();
    let access = resp.access;
    sessionStorage.setItem("accessToken", access);
    return true;
  } else {
    console.log("need to login");
    return false;
  }
}

export async function postReq(url, body, base_use = false) {
  let access = sessionStorage.getItem("accessToken");
  let headers = set_header(access);

  /* let body = {
        title,
        keywords
    } */

  let options = {
    method: "post",
    body: JSON.stringify(body),
    headers: headers,
    mode: "cors",
  };

  let preResp = await fetch((base_use ? base : api) + url, options);
  if (preResp.ok) {
    let resp = await preResp.json();
    console.log(resp);
    return resp;
  } else if (preResp.status == 401) {
    let dec = await refreshToken();
    if (dec) {
      return postReq(url, body, base_use);
    } else {
      return false;
    }
  } else {
    console.log("other errors");
    return false;
  }
}

export async function patchReq(url, body, base_use = false) {
  let access = sessionStorage.getItem("accessToken");
  let headers = set_header(access);

  /* let body = {
        title,
        keywords
    } */

  let options = {
    method: "patch",
    body: JSON.stringify(body),
    headers: headers,
    mode: "cors",
  };

  let preResp = await fetch((base_use ? base : api) + url, options);
  if (preResp.ok) {
    let resp = await preResp.json();
    console.log(resp);
    return resp;
  } else if (preResp.status == 401) {
    let dec = await refreshToken();
    if (dec) {
      return patchReq(url, body, base_use);
    } else {
      return false;
    }
  } else {
    console.log("other errors");
    return false;
  }
}

export async function req(url, base_use = false) {
  let access = sessionStorage.getItem("accessToken");
  let headers = set_header(access);

  let options = {
    method: "get",
    headers: headers,
    mode: "cors",
  };

  let preResp = await fetch((base_use ? base : api) + url, options);
  if (preResp.ok) {
    let resp = await preResp.json();
    return resp;
  } else if (preResp.status == 401) {
    let dec = await refreshToken();
    if (dec) {
      return req(url, base_use);
    } else {
      return false;
    }
  } else {
    console.log("other errors");
    return false;
  }
}

export async function deleteReq(url, base_use = false) {
  let access = sessionStorage.getItem("accessToken");
  let headers = set_header(access);

  let options = {
    method: "delete",
    headers: headers,
    mode: "cors",
  };

  let preResp = await fetch((base_use ? base : api) + url, options);
  if (preResp.ok) {
    return true;
  } else if (preResp.status == 401) {
    let dec = await refreshToken();
    if (dec) {
      return deleteReq(url, base_use);
    } else {
      return false;
    }
  } else {
    console.log("other errors");
    return false;
  }
}

export async function req_body(url, body) {
  let access = sessionStorage.getItem("accessToken");
  let headers = set_header(access);

  let options = {
    method: "get",
    headers: headers,
    body,
    mode: "cors",
  };

  let preResp = await fetch(api + url, options);
  if (preResp.ok) {
    let resp = await preResp.json();
    return resp;
  } else if (preResp.status == 401) {
    let dec = await refreshToken();
    if (dec) {
      return req(url);
    } else {
      return false;
    }
  } else {
    console.log("other errors");
    return false;
  }
}

export async function isLogged() {
  let resp = await req("session");
  return resp;
}

export function logout(nav, setUser) {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  setUser({
    logged: false,
    username: "",
    email: "",
    tier: 0,
    valid: false,
    id: null,
  });
  nav.push("/login");
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

export function getRating(a, b) {
  // Determine the number of interest
  const interest = Math.abs(a) >= Math.abs(b) ? a : b;

  let stars;
  let signal;

  // Determine the number of stars and signal
  if (Math.abs(interest) <= 5) {
    stars = 1;
    signal = "Neutral";
  } else if (Math.abs(interest) <= 15) {
    stars = 2;
    signal = interest > 0 ? "Buy" : "Sell";
  } else if (Math.abs(interest) <= 37) {
    stars = 3;
    signal = interest > 0 ? "Buy" : "Sell";
  } else if (Math.abs(interest) <= 48) {
    stars = 4;
    signal = interest > 0 ? "Strong Buy" : "Strong Sell";
  } else if (Math.abs(interest) > 48) {
    stars = 5;
    signal = interest > 0 ? "Strong Buy" : "Strong Sell";
  } else {
    throw new Error("Interest value is out of the expected range.");
  }

  return { stars, signal };
}

export function getThresholdSignal(interest) {
  let signal;

  // Determine the signal
  if (interest >= 0 && interest <= 10) {
    signal = "Neutral";
  } else if (interest > 10 && interest <= 30) {
    signal = "Buy";
  } else if (interest > 30) {
    signal = "Strong Buy";
  } else if (interest >= -10 && interest < 0) {
    signal = "Neutral";
  } else if (interest < -10 && interest >= -30) {
    signal = "Sell";
  } else if (interest < -30) {
    signal = "Strong Sell";
  } else {
    throw new Error("Interest value is out of the expected range.");
  }

  return signal;
}

export function formatImage(path) {
  return base + path;
}

export function calculateNet(entry) {
  let quote_currency = entry.pair.split("/").slice(-1)[0];
  let base_currency = entry.pair.split("/")[0];
  let pair_long, pair_short, pair_net_position;

  if (quote_currency === "USD") {
    pair_long = entry.base_long;
    pair_short = entry.base_short;
    pair_net_position = entry.base_net_position;
  } else if (base_currency === "USD") {
    pair_long = entry.quote_short;
    pair_short = entry.quote_long;
    pair_net_position = -entry.quote_net_position;
  } else {
    pair_long = entry.base_long;
    pair_short = entry.base_short;
    pair_net_position = entry.base_net_position;
  }
  return pair_net_position;
}

export function formatDateLocal(dateString) {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Format the date using toLocaleDateString
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}
