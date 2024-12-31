import axios from "axios";
import post from "../services/login-service";
import { axiosInstance } from "../services/api-client";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useInputsData from "../hooks/useInputsData";
import { useNavigate } from "react-router-dom";

interface Person {
  email: string;
  password: string;
}

const useLogin = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const { inputData, handleInputData } = useInputsData<Person>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await toast.promise(post(inputData), {
        pending: "Logging....",
        success: "Successfully Loge In",
      });
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (localStorage.getItem("auth-token")) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("auth-token")}`;
        queryClient.invalidateQueries();

        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`${error.response?.data}`, {
          position: "top-right",
        });
      } else {
        console.log("Non-Axios Error:", error);
      }
    }
  };

  return { handleInputData, handleSubmit, inputData };
};

export default useLogin;
