import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.0.103:3030",
//   baseURL: "http://192.168.201.64:3030",
//   baseURL: "http://192.168.137.156:3030",
  timeout: 50000
});

export default Api;
