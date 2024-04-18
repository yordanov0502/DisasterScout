import { axiosInstanceWithCredentials } from "../utils/axiosInstances";

export const loginRequest = (loginForm) => {
  return axiosInstanceWithCredentials.post("/external/login", loginForm);
};

export const logoutRequest = () => {
  return axiosInstanceWithCredentials.post("/external/logout");
};

export const forgotPasswordRequest = (forgotPasswordForm) => {
  return axiosInstanceWithCredentials.put("/external/user/forgot-password", forgotPasswordForm);
};



export const isUserAuthenticated = () => {
  return axiosInstanceWithCredentials.get("/internal/dispatcher/check-authentication");
};

export const updateAccountRequest = (accountForm) =>{
  return axiosInstanceWithCredentials.put("/internal/dispatcher/account/update",accountForm);
};

export const changePasswordRequest = (changePasswordForm) => {
  return axiosInstanceWithCredentials.put("/internal/dispatcher/settings/change-password", changePasswordForm);
};



//TODO: DELETE unnecessary request and refactor cms home page accordingly
export const testRequest = () => {
  return axiosInstanceWithCredentials.get("/internal/dispatcher");
};

//TODO: DELETE unnecessary request and refactor cms home page accordingly
export const addNewDispatcherRequest = () => {
   return axiosInstanceWithCredentials.post("/internal/admin/register-new-dispatcher",
    {
      id: "0246301025",
      firstName:"Емил",
      lastName:"Ефтимов",
      email:"eftimovemil20@gmail.com",
      username:"emil20",
      password:"B0502HTto$hko",
      initialZoneId: "st4"
    }
   );
};