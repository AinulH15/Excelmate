
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://api.excelmate.my.id/api",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
