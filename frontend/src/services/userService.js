import { axiosInstanceWithCredentials } from "../utils/axiosInstances";

export const isUserAuthenticated = () => {
  return axiosInstanceWithCredentials.get("/internal/dispatcher/check-authentication");
};

export const loginRequest = (loginForm) => {
  return axiosInstanceWithCredentials.post("/external/login", loginForm);
};

export const logoutRequest = () => {
  return axiosInstanceWithCredentials.post("/external/logout");
};

export const forgotPasswordRequest = (forgotPasswordForm) => {
  return axiosInstanceWithCredentials.post("external/user/forgot-password", forgotPasswordForm);
};



//TODO: DELETE unnecessary request and refactor cms home page accordingly
export const testRequest = () => {
  return axiosInstanceWithCredentials.get("/internal/dispatcher");
};

//TODO: DELETE unnecessary request and refactor cms home page accordingly
export const addNewDispatcherRequest = () => {
   return axiosInstanceWithCredentials.post("/internal/admin/register-new-dispatcher",
    {
      firstName:"Емил",
      lastName:"Ефтимов",
      email:"eftimovemil20@gmail.com",
      username:"emil20",
      password:"B0502HTto$hko",
      initialZone: 3
    }
   );
};