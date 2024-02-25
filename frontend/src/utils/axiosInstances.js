import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}`; 

//! Axios instance with credentials (means every request using this axios instance have to include cookie/s inside a request header)
export const axiosInstanceWithCredentials = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    //timeout: 5000, //WHAT IS THE PROPER AMOUNT AND HOW TO HANDLE TIMEOUT AXIOS ERROR ? 
    //!EACH REQUEST HAVE A DIFFERENT MINIMAL TIMEOUT, REGARDLESS OF WHAT WE SPECIFY AS TIMEOUT
  });
  
// Axios instance without credentials
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TO BE REVIEWED HOW IT WILL IMPACT THE WHOLE APPLICATION 
//!!!!!!!!!!!!!!AS COOKIE PATH FOR NOW 15.2.2024 IS SET TO "/" WHICH MEANS COOKIE WILL BE SENT WITH EVERY REQUEST TO BACKEND 
//!!!!!!!!!!!!!!BUT HERE IN THIS AXIOS INSTANCE IT IS SET EXACTLY THE OPPOSITE  "WITHCREDENTIALS:FALSE" WHICH MEANS NO COOKIE TO BE SENT WITH REQUESTS TO BACKEND
  export const axiosInstanceWithoutCredentials = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    //timeout: 5000,  WHAT IS THE PROPER AMOUNT AND HOW TO HANDLE TIMEOUT AXIOS ERROR ?
    //!EACH REQUEST HAVE A DIFFERENT MINIMAL TIMEOUT, REGARDLESS OF WHAT WE SPECIFY AS TIMEOUT
  });



  // Add a response interceptor
//   axiosInstanceWithCredentials.interceptors.response.use(
//     response => {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       return response;
//     },
//     error => {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       if (error.response && [401, 403, 500].includes(error.response.status)) {
//         // Handle expected errors gracefully
//         console.log("a");
//         return Promise.resolve(error.response);
//       }
//       console.log("b");
//       // Handle unexpected errors
//       return Promise.reject(error);
//     }
//   );