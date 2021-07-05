import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? "/api" : "https://localhost:3001/api";

export default axios.create({
  baseURL,
  withCredentials:true
});
