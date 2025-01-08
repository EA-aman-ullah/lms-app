import { useNavigate } from "react-router-dom";
import request from "../services/request-service";

const useRequest = (id: string) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  const { mutate } = request.usePost(
    ["overviewCard", "requests", "book", `${id}`],
    "Resquest Submitted."
  );

  const handleRequest = () => {
    if (currentUser) {
      mutate({ bookId: id  });
    } else {
      navigate("/login");
    }
  };

  return { handleRequest };
};

export default useRequest;
