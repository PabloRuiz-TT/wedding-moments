import axios from "axios";

const weddingAPI = axios.create({
  baseURL: "http://192.168.0.195:7025/api",
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
  timeout: 10000,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});

export { weddingAPI };
