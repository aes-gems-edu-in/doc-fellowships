import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const STRAPI_URL = (process.env.REACT_APP_STRAPI_URL || "http://localhost:1347/api").replace(
  /\/+$/,
  ""
);

const STRAPI_ORIGIN = STRAPI_URL.replace(/\/api\/?$/, "");

export function mediaUrl(
  file?: { url?: string; data?: { url?: string } } | null
): string {
  const url = file?.url || file?.data?.url || "";
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  return `${STRAPI_ORIGIN}${url}`;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: STRAPI_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ error?: { message?: string } }>) => {
    const message =
      error.response?.data?.error?.message || error.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);

export const get = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  apiClient.get<T>(url, config).then((response) => response.data);

export const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  apiClient.post<T>(url, data, config).then((response) => response.data);

const api = { get, post, client: apiClient };

export default api;
