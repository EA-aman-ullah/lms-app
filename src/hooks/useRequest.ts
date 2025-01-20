import { useNavigate } from "react-router-dom";
import requestService from "../services/request-service";
import {
  APPROVE_BOOK,
  DASHBOARD_CARDS,
  STUDENT_OPEN_REQUEST,
} from "../constants/queryKeys";

const useRequest = (id: string) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  const { mutate } = requestService.usePost(
    [DASHBOARD_CARDS, APPROVE_BOOK, STUDENT_OPEN_REQUEST],
    "Resquest Submitted."
  );

  const handleRequest = () => {
    if (currentUser) {
      mutate({ bookId: id });
    } else {
      navigate("/login");
    }
  };

  return { handleRequest };
};

export default useRequest;
