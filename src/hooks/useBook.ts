import { useNavigate } from "react-router-dom";
import book from "../services/book-service";
import useRequest from "./useRequest";
import { Book } from "../entites/Books";
import { BOOK } from "../constants/queryKeys";

const useBook = (id: string) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  const { data } = book.useGetById<Book>([BOOK, `${id}`], id as string, {
    params: { studentId: currentUser?._id },
  });
  const navigate = useNavigate();
  const { handleRequest } = useRequest(id as string);

  return { handleRequest, data, currentUser, navigate };
};

export default useBook;
