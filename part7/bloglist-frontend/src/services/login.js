import axios from "axios";
axios.defaults.baseURL = "http://localhost:3003";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
