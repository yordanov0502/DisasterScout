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

export const isUserAuthenticated = () => {
   return axiosInstanceWithCredentials.get("/internal/dispatcher/check-authentication");
};