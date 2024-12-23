import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import post from "../services/login-service";
import { axiosInstance } from "../services/api-client";
import { toast, ToastContainer } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useInputsData from "../hooks/useInputsData";

interface Person {
  email: string;
  password: string;
}

const Login = () => {
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const { data, handleData } = useInputsData<Person>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await toast.promise(post(data), {
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

  return (
    <>
      <form
        className="mx-auto flex flex-col gap-4 justify-center items-center h-svh"
        onSubmit={handleSubmit}
      >
        <div className=" flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleData}
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            className="border p-2 "
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleData}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="border p-2"
          />
        </div>
        <div className="flex justify-center gap-1">
          <button
            type="submit"
            className="rounded bg-[#636AE8] text-[#fff] px-6 py-2"
          >
            Login
          </button>
          <Link
            to={"/signup"}
            className="rounded bg-[#636AE8] text-[#fff] px-6 py-2"
          >
            Sing UP
          </Link>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default Login;
