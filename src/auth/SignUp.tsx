import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import post from "../services/signup-service";
import avatar from "../assets/images/avatarDM.jpeg";
import useInputsData from "../hooks/useInputsData";

interface Person {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}

const SignUp = () => {
  const { data, isValid, handleData, setValid } = useInputsData<Person>();
  const [selectedImage, setSelectedImage] = useState<File | null>();
  let navigate = useNavigate();

  const formData = new FormData();

  formData.append("image", selectedImage as Blob);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("phone", data.phone);
  formData.append("name", data.name);

  const getToken = async () => {
    try {
      const user = await post(formData);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
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
      /^[a-zA-Z ]{3,}$/.test(data.name) &&
      data.phone?.length > 9 &&
      selectedImage &&
      data.confirmPassword === data.password &&
      /^([^@\s]+)[@]((?:[-a-z0-9]+\.)+[a-z]{3,})$/i.test(data.email)
    ) {
      getToken();
      setValid(true);
    } else {
      setValid(false);
    }
  };

  return (
    <form
      className="mx-auto flex flex-col gap-4 h-svh justify-center items-center w-[50%] "
      onSubmit={handleSubmit}
    >
      <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
        <img
          className=" border w-full h-full object-cover"
          src={
            selectedImage ? URL.createObjectURL(selectedImage as Blob) : avatar
          }
          alt=""
        />
      </div>
      <label
        htmlFor="image"
        className={
          !selectedImage && !isValid
            ? "cursor-pointer bg-[#F2F2FD] text-[#E8618C] rounded-[20px] p-2"
            : "cursor-pointer bg-[#F2F2FD] text-[#636AE8] rounded-[20px] p-2"
        }
      >
        {!selectedImage && !isValid ? "Pease Upload Image" : "Upload Image"}
      </label>
      <input
        id="image"
        type="file"
        onChange={(e) => {
          if (e.target.files) setSelectedImage(e.target.files[0]);
        }}
        name="image"
        className="hidden"
        draggable
      />
      <div className=" flex flex-col ">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleData}
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          className="border flex-1"
        />
        {!data.email && !isValid && (
          <p className="text-red-500">Enter Your Email</p>
        )}
        {!/^([^@\s]+)[@]((?:[-a-z0-9]+\.)+[a-z]{3,})$/i.test(data.email) &&
          data.email &&
          !isValid && (
            <p className="text-red-500">
              Formt must be like "email@example.com"
            </p>
          )}
      </div>
      <div className=" flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleData}
          type="text"
          id="name"
          name="name"
          placeholder="name"
          className="border"
        />
        {!data.name && !isValid && (
          <p className="text-red-500">Please Enter Your Name</p>
        )}
        {!(data.name === "") &&
          !/^[a-zA-Z]{4,}$/.test(data.name) &&
          !isValid && (
            <p className="text-red-500">
              Name must be at least 4 alphabets charecters
            </p>
          )}
      </div>
      <div className=" flex flex-col">
        <label htmlFor="phone">Phone</label>
        <input
          onChange={handleData}
          type="text"
          id="phone"
          name="phone"
          placeholder="phone"
          className="border"
        />
        {!data.phone && !isValid && (
          <p className="text-red-500">Please Enter Phone Number</p>
        )}
        {!(data.phone === "") && data.phone?.length < 9 && !isValid && (
          <p className="text-red-500">
            The Number must be at least 10 charecters{" "}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleData}
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          className="border"
        />
        {!data.password && !isValid && (
          <p className="text-red-500">Please Enter Password</p>
        )}
        {data.password?.length < 4 && !isValid && (
          <p className="text-red-500">
            The Number must be at least 4 Charecters long
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          onChange={handleData}
          type="text"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="border"
        />
        {data.confirmPassword !== data.password && (
          <p className="text-red-500">Confirm Password does not matched!</p>
        )}
      </div>
      <div className="flex justify-center gap-1">
        <button type="submit" className="border px-6 py-2">
          Sign Up
        </button>
        <Link to={"/login"} className="border px-6 py-2">
          Login
        </Link>
      </div>
    </form>
  );
};

export default SignUp;
