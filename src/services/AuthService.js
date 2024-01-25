import httpClient from "../common/http-common";

const submitLoginRequest = (data) => {
  const url = "/v1/auth/login";
  const header = {
    "Content-Type": "application/json",
  };
  return httpClient.executeLoginRequest("post", url, data, null, header, false);
};

const AuthService = {
  submitLoginRequest,
};

export default AuthService;
