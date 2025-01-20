import axios from "axios";
import post from "../services/login-service";
import { axiosInstance } from "../services/api-client";
import useInputsData from "../hooks/useInputsData";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

interface Person {
  email: string;
  password: string;
}

const useLogin = () => {
  const { toastPromise, showToast } = useToast();
  let navigate = useNavigate();
  const { inputData, handleInputData } = useInputsData<Person>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await toastPromise(post(inputData), {
        pending: "Logging in...",
        success: "Logged in successfully!",
      });
      localStorage.setItem("currentUser", JSON.stringify(user));
      if (localStorage.getItem("auth-token")) {
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("auth-token")}`;
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("error", `${error.response?.data}`);
      } else {
        console.log("Non-Axios Error:", error);
      }
    }
  };

  return { handleInputData, handleSubmit, inputData };
};

export default useLogin;
