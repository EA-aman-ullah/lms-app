import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";
import useInputsData from "./useInputsData";
import post from "../services/setPassword-service";
import { Person } from "../entites/User";
import axios from "axios";

const usePassword = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toastPromise, showToast } = useToast();
  const { inputData, isValid, handleInputData, setValid } =
    useInputsData<Person>();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    event.preventDefault();

    if (
      /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[@#$%^&*]+).{8,16}$/.test(
        inputData.password
      ) &&
      inputData.confirmPassword === inputData.password
    ) {
      try {
        let data = { password: inputData.password };
        setLoading(true);
        const user = await toastPromise(post<Person>(data as any, id), {
          pending: "Saving....",
          success: "Password Saved.",
        });
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          setLoading(false);
          navigate("/dashboard");
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
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return { isLoading, inputData, isValid, handleInputData, handleSubmit };
};

export default usePassword;
