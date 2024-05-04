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

export const clearMyCacheRequest = () => {
  return axiosInstanceWithCredentials.delete("/internal/dispatcher/settings/clear-my-cache");
};

export const clearAdminCacheRequest = () => {
  return axiosInstanceWithCredentials.delete(`/internal/dispatcher/settings/clear-admin-cache/${"ADMIN"}`);
};

export const clearDispatcherCacheRequest = (username) => {
  return axiosInstanceWithCredentials.delete(`/internal/admin/settings/clear-dispatcher-cache/${username}`);
};

export const clearAllUsersCacheRequest = () => {
  return axiosInstanceWithCredentials.delete("/internal/admin/settings/clear-all-user-cache");
};

export const clearZoneCacheRequest = (zoneId) => {
  return axiosInstanceWithCredentials.delete(`/internal/admin/settings/clear-zone-cache/${zoneId}`);
};

export const clearAllZonesCachesRequest = () => {
  return axiosInstanceWithCredentials.delete("/internal/admin/settings/clear-all-zones-caches");
};

export const getLogsFromPageRequest = (pageNumber,level,username) => {
  return axiosInstanceWithCredentials.get(`/internal/admin/logger?page=${pageNumber}&level=${level}&username=${username}`);
};

export const getDispatchersFromPageRequest = (pageNumber) => {
  return axiosInstanceWithCredentials.get(`/internal/admin/dispatchers?page=${pageNumber}`);
};

export const deleteDispatcherRequest = (dispatcherId) => { //? Axios doesn't automatically assume the second parameter as the request body for DELETE requests like it does for POST requests.
  return axiosInstanceWithCredentials.delete("/internal/admin/dispatchers",{data: { id: dispatcherId }});
};

export const lockDispatcherRequest = (dispatcherId) => { //? When passing single value as request body, I must make sure it is in a format expexted by the backend API
  return axiosInstanceWithCredentials.put("/internal/admin/dispatchers/lock",{id: dispatcherId});
};

export const unlockDispatcherRequest = (dispatcherId) => { //? When passing single value as request body, I must make sure it is in a format expexted by the backend API
  return axiosInstanceWithCredentials.put("/internal/admin/dispatchers/unlock",{ id: dispatcherId });
};

export const updateZonesOfDispatcherRequest = (requestBody) => {
  return axiosInstanceWithCredentials.put("/internal/admin/dispatchers/available-zones",requestBody);
};

export const addNewDispatcherRequest = (requestBody) => {
  return axiosInstanceWithCredentials.post("/internal/admin/dispatchers/registration",requestBody);
};

//TODO: DELETE unnecessary request and refactor cms home page accordingly
export const testRequest = () => {
  return axiosInstanceWithCredentials.get("/internal/dispatcher");
};