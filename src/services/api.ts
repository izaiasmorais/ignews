import axios from "axios";

export const api = axios.create({
  baseURL: "https://igblog.vercel.app/api",
});
