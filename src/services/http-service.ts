import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "./api-client";
import { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

interface APIC_SERVICE<T> {
  getAll: () => T;
  getById: () => T;
  post: () => T;
  put: (paramerter: T | FormData) => T;
  delete: () => T;
}

class httpService<T> {
  endpiont: string;
  apiClient: APIC_SERVICE<T>;

  constructor(endpiont: string) {
    this.endpiont = endpiont;
    this.apiClient = new APIClient<T>(endpiont) as any;
  }

  useGetAll = <T>(queryKey: string[], config: AxiosRequestConfig = {}) => {
    const { getAll } = new APIClient<T>(this.endpiont);

    return useQuery({
      queryKey: queryKey,
      queryFn: () => getAll(config),
    });
  };

  useGetById = <T>(queryKey: string[], id: string) => {
    const { getById } = new APIClient<T>(this.endpiont);

    return useQuery({
      queryKey: queryKey,
      queryFn: () => getById(id),
    });
  };

  usePost = <T>(
    queryKey: string[] = [""],
    message: string = "RESOURCE SUCCESSFULLY CREATED"
  ) => {
    const { post } = new APIClient<FormData | T>(this.endpiont);

    const queryClient = useQueryClient();

    return useMutation<FormData | string | T, AxiosError | Error, FormData | T>(
      {
        mutationFn: post,

        onSuccess: (data) => {
          console.log(data);
          toast.success(message, {
            position: "top-right",
            theme: "colored",
            style: {
              top: 60,
            },
          });
          queryKey.forEach((el) =>
            queryClient.invalidateQueries({
              queryKey: [el],
            })
          );
        },

        onError: (error) => {
          if (error instanceof AxiosError)
            toast.error(`Message: ${error.response?.data}`, {
              position: "top-right",
              theme: "colored",
              style: {
                top: 60,
              },
            });
          if (error instanceof Error) {
            console.error(error);
          }
        },
      }
    );
  };

  useUpdate = <T>(
    queryKey: string[] = [""],
    message: string = "Successfully Updated"
  ) => {
    const { put } = new APIClient<FormData | T>(this.endpiont);

    const queryClient = useQueryClient();

    return useMutation<T, AxiosError | Error, [string, T | null]>({
      mutationFn: ([id, payload]) => put(id, payload),

      onSuccess: (data) => {
        console.log(data);
        toast.success(message, {
          position: "top-right",
          theme: "colored",
          style: {
            top: 60,
          },
        });
        queryKey.forEach((el) =>
          queryClient.invalidateQueries({
            queryKey: [el],
          })
        );
      },

      onError: (error) => {
        if (error instanceof AxiosError)
          toast.error(`Message: ${error.response?.data}`, {
            position: "top-right",
            theme: "colored",
            style: {
              top: 60,
            },
          });
        if (error instanceof Error) {
          console.error(error);
        }
      },
    });
  };
}

export default httpService;
