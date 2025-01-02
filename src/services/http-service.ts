import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import APIClient from "./api-client";
import { AxiosError, AxiosRequestConfig } from "axios";
import { Request } from "../entites/Request";
import useToast from "../hooks/useToast";

class httpService {
  endpiont: string;

  constructor(endpiont: string) {
    this.endpiont = endpiont;
  }

  useGetAll = <T>(queryKey: string[], config: AxiosRequestConfig = {}) => {
    const { getAll } = new APIClient(this.endpiont);

    return useQuery({
      queryKey: queryKey,
      queryFn: () => getAll<T>(config),
    });
  };

  useGetById = <T>(
    queryKey: string[],
    id: string,
    config: AxiosRequestConfig = {}
  ) => {
    const { getById } = new APIClient(this.endpiont);

    return useQuery({
      queryKey: queryKey,
      queryFn: () => getById<T>(id, config),
    });
  };

  usePost = <T>(
    queryKey: string[] = [""],
    message: string = "RESOURCE SUCCESSFULLY CREATED"
  ) => {
    const { post } = new APIClient(this.endpiont);

    const { showToast } = useToast();

    const queryClient = useQueryClient();

    return useMutation<FormData | string | T, AxiosError | Error, FormData | T>(
      {
        mutationFn: post,

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
    queryKey: string[] = [""],
    message: string = "Successfully Updated"
  ) => {
    const { put } = new APIClient(this.endpiont);

    const { showToast } = useToast();

    const queryClient = useQueryClient();

    return useMutation<Request, AxiosError | Error, [string, T | null]>({
      mutationFn: ([id, payload]) => put(id, payload),

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

export default httpService;
