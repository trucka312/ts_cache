import axios from "axios";
import { API } from "@/constants/api";

const apiInstance = axios.create({
  baseURL: API.BASE,
});

export default apiInstance;
