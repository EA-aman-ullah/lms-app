import axios, { AxiosRequestConfig } from "axios";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Request } from "../entites/Request";
import useToast from "../hooks/useToast";
import { FetchResponse } from "../entites/FetchResponse";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
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
  constructor(endpoint: string) {
    super(endpoint);
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

export class APIClientWithCache extends APIClient {
  constructor(endpoint: string) {
    super(endpoint);
  }

  useGetAllWithPagination = <T>(
    queryKey: any[],
    config: AxiosRequestConfig = {}
  ) => {
    return useInfiniteQuery({
      queryKey: queryKey,
      queryFn: ({ pageParam }) => {
        config.params.page = pageParam;
        return this.getAll<FetchResponse<T>>(config);
      },
      getNextPageParam: (lastPage, allpages) => {
        return lastPage.pagination.hasNextPage
          ? allpages.length + 1
          : undefined;
      },
      initialPageParam: 1,
    });
  };

  useGetAll = <T>(queryKey: any[], config: AxiosRequestConfig = {}) => {
    return useQuery({
      queryKey: queryKey,
      queryFn: () => this.getAll<FetchResponse<T>>(config),
      placeholderData: keepPreviousData,
    });
  };

  useGetById = <T>(
    queryKey: any[],
    id: string,
    config: AxiosRequestConfig = {}
  ) => {
    return useQuery({
      queryKey: queryKey,
      queryFn: () => this.getById<T>(id, config),
    });
  };

  usePost = <T>(
    queryKey: any[] = [],
    message: string = "RESOURCE SUCCESSFULLY CREATED"
  ) => {
    const { showToast } = useToast();

    const queryClient = useQueryClient();

    return useMutation<FormData | string | T, AxiosError | Error, FormData | T>(
      {
        mutationFn: this.post,

        onSuccess: () => {
          showToast("success", message);

          queryKey.forEach((el) =>
            queryClient.invalidateQueries({
              queryKey: [el],
            })
          );
        },

        onError: (error) => {
          if (error instanceof AxiosError)
            showToast("error", `Message: ${error.response?.data}`);
          if (error instanceof Error) {
            console.error(error);
          }
        },
      }
    );
  };

  useUpdate = <T>(
    queryKey: any[] = [],
    message: string = "Successfully Updated"
  ) => {
    const { showToast } = useToast();

    const queryClient = useQueryClient();

    return useMutation<Request, AxiosError | Error, [string, T | null]>({
      mutationFn: ([id, payload]) => this.put(id, payload),

      onSuccess: () => {
        showToast("success", message);

        queryKey.forEach((el) =>
          queryClient.invalidateQueries({
            queryKey: [el],
          })
        );
      },

      onError: (error) => {
        if (error instanceof AxiosError)
          showToast("error", `Message: ${error.response?.data}`);
        if (error instanceof Error) {
          console.error(error);
        }
      },
    });
  };
}

export default APIClient;
