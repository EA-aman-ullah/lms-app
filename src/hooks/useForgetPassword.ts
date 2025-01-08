import { useState } from "react";
import useInputsData from "./useInputsData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToast from "./useToast";
import post from "../services/forgetPassword";
import { Person } from "../entites/User";

const useForgetPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toastPromise, showToast } = useToast();
  const { inputData, handleInputData } = useInputsData<Person>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const user = await toastPromise(post<Person>(inputData as any), {
        pending: "Sending....",
        success: "OTP sent to your email.",
      });
      if (user) {
        setLoading(false);
        navigate(`/otp/${user._id}`);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        showToast("error", `${error.response?.data}`);
        const { response } = error;
        console.log("Axios Error Response:", response);
      } else {
        console.log("Non-Axios Error:", error);
      }
    }
  };

  return { isLoading, inputData, handleInputData, handleSubmit };
};

export default useForgetPassword;
