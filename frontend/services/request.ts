import axios from "axios";

export const API_URL = "http://127.0.0.1:5000/api";

export default axios.create({ baseURL: API_URL });
