import { axiosInstanceWithCredentials } from "../utils/axiosInstances";


export const loginRequest = (loginForm) => {
  return axiosInstanceWithCredentials.post("/external/login", loginForm);
};
