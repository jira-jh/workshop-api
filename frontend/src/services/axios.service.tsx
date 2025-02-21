import axios from "axios";
const baseURL = "http://localhost:3000";

export const callGet = async (endpoint: string) => {
  const res = await axios.get(`${baseURL}/${endpoint}`);
  return res.data;
}

export const callPost = async (endpoint: string, data: any) => {
  const res = await axios.post(`${baseURL}/${endpoint}`, data);
  return res.data;
}