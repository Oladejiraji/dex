import axios, { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosConfig";
import { baseURL } from "@/utils/constants";

interface Request {
  url: string;
  body?: any;
  auth?: boolean;
  options?: AxiosRequestConfig<any> | undefined;
  [x: string]: any;
}

const del = async ({ url, body: data }: Request) => {
  return await axiosInstance.delete(url, {
    data,
  });
};

const get = async ({ url, auth = true }: Request) => {
  const ald: any = await (auth
    ? axiosInstance.get(url)
    : axios.get(baseURL + url));
  return ald;
};

const post = async ({ url, body, auth = true, options = {} }: Request) => {
  return await (auth
    ? axiosInstance.post(url, body, options)
    : axios.post(baseURL + url, body));
};

const patch = async ({ url, body }: Request) => {
  return await axiosInstance.patch(url, body);
};

const put = async ({ url, body }: Request) => {
  return (await axiosInstance.put(url, body)).data;
};

const api = {
  delete: del,
  get,
  patch,
  post,
  put,
};

export default api;
