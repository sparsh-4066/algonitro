import axios from "axios";

const API = axios.create({
  baseURL: "https://algonitro-backend.onrender.com/api"
});

export default API;