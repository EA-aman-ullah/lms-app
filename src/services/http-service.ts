// import {
//   keepPreviousData,
//   useInfiniteQuery,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { APIClientType } from "./api-client";
// import { AxiosError, AxiosRequestConfig } from "axios";
// import { Request } from "../entites/Request";
// import useToast from "../hooks/useToast";
// import { FetchResponse } from "../entites/FetchResponse";

// class httpService {
//   APICliente: APIClientType;

//   constructor(APIClient: APIClientType) {
//     this.APICliente = APIClient;
//   }

//   useGetAllWithPagination = <T>(
//     queryKey: any[],
//     config: AxiosRequestConfig = {}
//   ) => {
//     return useInfiniteQuery({
//       queryKey: queryKey,
//       queryFn: ({ pageParam }) => {
//         config.params.page = pageParam;
//         return this.APICliente.getAll<FetchResponse<T>>(config);
//       },
//       getNextPageParam: (lastPage, allpages) => {
//         return lastPage.pagination.hasNextPage
//           ? allpages.length + 1
//           : undefined;
//       },
//       initialPageParam: 1,
//     });
//   };

//   useGetAll = <T>(queryKey: any[], config: AxiosRequestConfig = {}) => {
//     return useQuery({
//       queryKey: queryKey,
//       queryFn: () => this.APICliente.getAll<FetchResponse<T>>(config),
//       placeholderData: keepPreviousData,
//     });
//   };

//   useGetById = <T>(
//     queryKey: any[],
//     id: string,
//     config: AxiosRequestConfig = {}
//   ) => {
//     return useQuery({
//       queryKey: queryKey,
//       queryFn: () => this.APICliente.getById<T>(id, config),
//     });
//   };

//   usePost = <T>(
//     queryKey: any[] = [],
//     message: string = "RESOURCE SUCCESSFULLY CREATED"
//   ) => {
//     const { showToast } = useToast();

//     const queryClient = useQueryClient();

//     return useMutation<FormData | string | T, AxiosError | Error, FormData | T>(
//       {
//         mutationFn: this.APICliente.post,

//         onSuccess: () => {
//           showToast("success", message);

//           queryKey.forEach((el) =>
//             queryClient.invalidateQueries({
//               queryKey: [el],
//             })
//           );
//         },

//         onError: (error) => {
//           if (error instanceof AxiosError)
//             showToast("error", `Message: ${error.response?.data}`);
//           if (error instanceof Error) {
//             console.error(error);
//           }
//         },
//       }
//     );
//   };

//   useUpdate = <T>(
//     queryKey: any[] = [],
//     message: string = "Successfully Updated"
//   ) => {
//     const { showToast } = useToast();

//     const queryClient = useQueryClient();

//     return useMutation<Request, AxiosError | Error, [string, T | null]>({
//       mutationFn: ([id, payload]) => this.APICliente.put(id, payload),

//       onSuccess: () => {
//         showToast("success", message);

//         queryKey.forEach((el) =>
//           queryClient.invalidateQueries({
//             queryKey: [el],
//           })
//         );
//       },

//       onError: (error) => {
//         if (error instanceof AxiosError)
//           showToast("error", `Message: ${error.response?.data}`);
//         if (error instanceof Error) {
//           console.error(error);
//         }
//       },
//     });
//   };
// }

// export default httpService;
