import { useNavigate } from "react-router-dom";
// import requestService from "../services/request-service";
import {
  REQUESTS_APPROVEABLE,
  DASHBOARD_CARDS,
  STUDENT_OPEN_REQUESTS,
} from "../constants/queryKeys";
import socket from "../services/socket";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "./useToast";

const useRequest = (id: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  // const { mutate } = requestService.usePost(
  //   [DASHBOARD_CARDS, REQUESTS_APPROVEABLE, STUDENT_OPEN_REQUESTS],
  //   "Resquest Submitted."
  // );

  const handleRequest = () => {
    if (currentUser) {
      // mutate({ bookId: id });
      socket.emit("createRequest", { bookId: id }, (response: any) => {
        if (response.success) {
          [
            DASHBOARD_CARDS,
            REQUESTS_APPROVEABLE,
            STUDENT_OPEN_REQUESTS,
          ].forEach((el) =>
            queryClient.invalidateQueries({
              queryKey: [el],
            })
          );

          showToast("success", response.message);
        } else {
          showToast("error", response.message);
        }
      });
    } else {
      navigate("/login");
    }
  };

  return { handleRequest };
};

export default useRequest;
