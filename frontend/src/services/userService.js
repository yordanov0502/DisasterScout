import axios from "axios";
import { API_URL } from "../utils/constants";

export const loginRequest = (credentials) => {
  return axios.post(`${API_URL}/external/login`, credentials, { withCredentials: true });
};
