import { useEffect, useState } from "react";
import useToast from "./useToast";
import { SingUp } from "../entites/Signup";
import axios from "axios";
import useInputsData from "./useInputsData";
import getById from "../services/resendOtp-service";
import post from "../services/verifyOtp-service";

interface Otp {
  otp: string;
}

const useOTPVerification = () => {
  const [isLoading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { inputData, handleInputData } = useInputsData<Otp>();
  const { toastPromise, showToast } = useToast();

  const sendotp = async (id: string) => {
    setLoading(true);
    try {
      await toastPromise(getById<SingUp>(id), {
        pending: "Sending....",
        success: "OTP sent to your email.",
      });
      startCountdown();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showToast("error", `${error.response?.data}`);
        console.error("Axios Error Response:", error.response);
      } else {
        console.error("Non-Axios Error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeRemaining(60);
    startCountdown();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  let intervalId: NodeJS.Timeout;

  const startCountdown = () => {
    setTimeRemaining(60);
    intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = (id: string) => {
    if (!isLoading && timeRemaining < 1) sendotp(id);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      const user = await toastPromise(post<SingUp>(inputData as any, id), {
        pending: "verifying....",
        success: "Registration Completed.",
      });

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setLoading(false);
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

  return {
    isLoading,
    timeRemaining,
    inputData,
    handleInputData,
    handleResendOtp,
    handleSubmit,
  };
};

export default useOTPVerification;
