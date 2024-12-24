import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("auth-token")}`;

export class APIAuthClient<T> {
  endpiont: string;
  constructor(endpiont: string) {
    this.endpiont = endpiont;
  }

  post = (payload: T) => {
    return axiosInstance
      .post<string | T>(this.endpiont, payload)
      .then((res) => {
        const authHeader = res.headers["authorization"];
        const token = authHeader?.split(" ")[1];
        if (token) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          localStorage.setItem("auth-token", token);
        }

        return res.data;
      });
  };
}

class APIClient<T> extends APIAuthClient<T> {
  constructor(endpiont: string) {
    super(endpiont);
  }

  getAll = (config: AxiosRequestConfig = {}) => {
    return axiosInstance.get<T>(this.endpiont, config).then((res) => res.data);
  };

  getById = (id: number | string, config: AxiosRequestConfig) => {
    return axiosInstance
      .get<T>(this.endpiont + "/" + id, config)
      .then((res) => res.data);
  };

  put = (id: string, payload: T | null = null) => {
    return axiosInstance
      .put(this.endpiont + "/" + id, payload)
      .then((res) => res.data);
  };

  delete = (id: string) => {
    return axiosInstance
      .delete(this.endpiont + "/" + id)
      .then((res) => res.data);
  };
}

export default APIClient;
