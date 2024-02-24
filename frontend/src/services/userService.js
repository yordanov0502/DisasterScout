import { axiosInstanceWithCredentials } from "../utils/axiosInstances";


export const loginRequest = (loginForm) => {
  return axiosInstanceWithCredentials.post("/external/login", loginForm);
};

export const logoutRequest = () => {
  return axiosInstanceWithCredentials.post("/external/logout");
};

export const testRequest = () => {
  return axiosInstanceWithCredentials.get("/internal/dispatcher");
};