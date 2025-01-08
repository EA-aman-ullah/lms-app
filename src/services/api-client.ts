import axios, { AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("auth-token")}`;

export class APIAuthClient {
  endpiont: string;
  constructor(endpiont: string) {
    this.endpiont = endpiont;
  }

  post = <T>(payload: T, id: string = "") => {
    return axiosInstance
      .post<T>(this.endpiont + "/" + id, payload)
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

class APIClient extends APIAuthClient {
  constructor(endpiont: string) {
    super(endpiont);
  }

  getAll = <T>(config: AxiosRequestConfig = {}) => {
    return axiosInstance.get<T>(this.endpiont, config).then((res) => res.data);
  };

  getById = <T>(id: number | string, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<T>(this.endpiont + "/" + id, config)
      .then((res) => res.data);
  };

  put = <T>(id: string, payload: T | null = null) => {
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

export type APIClientType = InstanceType<typeof APIClient>;


export default APIClient;
