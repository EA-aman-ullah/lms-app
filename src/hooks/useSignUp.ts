import axios from "axios";
import post from "../services/signup-service";
import useInputsData from "../hooks/useInputsData";
import { useNavigate } from "react-router-dom";
import { Person } from "../entites/User";
import useToast from "./useToast";
import { useState } from "react";

const useSignUp = () => {
  const [isLoading, setLoading] = useState(false);
  const { showToast, toastPromise } = useToast();
  const { inputData, isValid, handleInputData, setValid } =
    useInputsData<Person>();
  let navigate = useNavigate();
  //   const [selectedImage, setSelectedImage] = useState<File | null>();

  //   const formData = new FormData();

  //   formData.append("image", selectedImage as Blob);
  //   formData.append("email", inputData.email);
  //   formData.append("password", inputData.password);
  //   formData.append("phone", inputData.phone);
  //   formData.append("name", inputData.name);

  const getToken = async () => {
    try {
      let data = {
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
        password: inputData.password,
      };

      setLoading(true);
      const user = await toastPromise(post<Person>(data as Person), {
        pending: "Signing....",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      /^[a-zA-Z ]{3,}$/.test(inputData.name) &&
      inputData.phone?.length > 9 &&
      /^([^@\s]+)[@]((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.test(inputData.email)
    ) {
      getToken();
      setValid(true);
    } else {
      setValid(false);
    }
  };
  return {
    isLoading,
    inputData,
    isValid,
    // selectedImage,
    handleInputData,
    handleSubmit,
    // setSelectedImage,
  };
};

export default useSignUp;
