import axios from "axios";

export const BASE_API_URL = process.env.BASE_API_URL;

const $api = axios.create({
  baseURL: `${BASE_API_URL}/api`,
  withCredentials: true,
});

export default $api;
