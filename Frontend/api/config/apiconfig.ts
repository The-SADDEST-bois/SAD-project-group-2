import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
