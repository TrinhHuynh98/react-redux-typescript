import axios from "axios";
import env from "react-dotenv";

const api = axios.create({
  baseURL: `${env.API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
    }
    return Promise.reject(err);
  }
);

export { api };
