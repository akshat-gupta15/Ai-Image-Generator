import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-image-generator-0asf.onrender.com",
});

export default API;
