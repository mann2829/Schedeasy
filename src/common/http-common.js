import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  json: true,
});

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    //Unauthorized request
    if (
      error.response.status === 401 &&
      localStorage.getItem("token") &&
      window.location.pathname !== "/changepassword"
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      toast.error(error.response.data.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
    console.log("error interceptors", error.response.status);
    return Promise.reject(error);
  }
);

const execute = (
  method,
  resource,
  data = null,
  params = null,
  headers = null,
  auth
) =>
  new Promise((resolve, reject) => {
    let options = {
      method,
      url: resource,
      params,
      headers: getHeaders(headers, auth),
      //withCredentials: auth This should be turned off for DTA
    };
    if (data !== null) {
      options["data"] = data;
    }
    client(options)
      .then((req) => resolve(req.data))
      .catch((err) => {
        if (
          err.response.data.status === 500 &&
          (err.response.data.message === "jwt expired" ||
            err.response.data.message === "jwt malformed")
        ) {
          localStorage.setItem("token", null);
          localStorage.setItem("userName", null);
          window.location.href = "/";
        }
        if (
          err.response &&
          [400, 401, 402, 405, 406, 410, 500, 409, 404].indexOf(
            err.response.status
          ) >= 0
        ) {
          resolve(err.response.data);
        } else {
          reject(err);
        }
      });
  });

const executeLoginRequest = (
  method,
  resource,
  data = null,
  params = null,
  headers = null,
  auth
) =>
  new Promise((resolve, reject) => {
    client({
      method,
      url: resource,
      data,
      params,
      headers: headers,
      withCredentials: auth,
    })
      .then((req) => resolve(req.data))
      .catch((err) => {
        if (
          err.response &&
          [400, 401, 402, 405, 406, 410, 500, 409, 404].indexOf(
            err.response.status
          ) >= 0
        ) {
          resolve(err.response.data);
        } else {
          reject(err);
        }
      });
  });

const executeRefreshToken = (
  method,
  resource,
  data = null,
  params = null,
  headers = null,
  auth
) =>
  new Promise((resolve, reject) => {
    client({
      method,
      url: resource,
      data,
      params,
      headers: headers,
      withCredentials: auth,
    })
      .then((req) => resolve(req.data))
      .catch((err) => {
        if (
          err.response &&
          [400, 401, 402, 405, 406, 410, 409, 404].indexOf(
            err.response.status
          ) >= 0
        ) {
          resolve(err.response.data);
        } else {
          reject(err);
        }
      });
  });

const getHeaders = (headers, isAuth = false) => {
  if (isAuth) {
    let token = select();
    return {
      ...headers,
      //Authorization: "Bearer " + token,
      Authorization: token,
    };
  } else {
    return {
      ...headers,
    };
  }
};

const select = (state) => {
  //return state.loginRequest.token;
  return localStorage.getItem("token");
};

const httpClient = {
  execute,
  executeLoginRequest,
  executeRefreshToken,
  client,
};

export default httpClient;
