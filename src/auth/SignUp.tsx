import useSignUp from "../hooks/useSignUp";
import FormWrapper from "../components/FormWrapper";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
  const { inputData, isValid, handleSubmit, handleInputData } = useSignUp();

  return (
    <>
      <FormWrapper
        heading="Sign UP"
        navigationLink="/login"
        navigationButtonText="Sign In"
        navigationPragraphText="Already have an account ?"
      >
        <form
          className="flex flex-col gap-[2rem] w-full text-[1.6rem] pt-[6rem]"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="flex flex-col relative border-[2px] border-borderSecondary rounded-xl group focus-within:border-primary">
              <label
                htmlFor="email"
                className={`absolute left-[1rem] top-1/2 -translate-y-1/2 text-textSecondary text-[1.4rem] transition-all duration-300 group-focus-within:top-[-0.2rem] group-focus-within:text-[1.2rem] group-focus-within:text-primary group-focus-within:bg-white group-focus-within:px-[.5rem] ${
                  inputData.email?.length > 0 &&
                  "top-[-0.2rem] bg-white px-[0.5rem] text-[1.18rem]"
                } `}
              >
                Email
              </label>
              <input
                onChange={handleInputData}
                type="text"
                id="email"
                name="email"
                className="p-[1rem] outline-none border-none focus:ring-0 rounded-xl"
              />
            </div>
            {!inputData.email && !isValid && (
              <p className="text-accent text-[1.2rem]">Enter Your Email</p>
            )}
            {!/^([^@\s]+)[@]((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.test(
              inputData.email
            ) &&
              inputData.email &&
              !isValid && (
                <p className="text-accent text-[1.2rem]">
                  Formt must be like "email@example.com"
                </p>
              )}
          </div>
          <div>
            <div className="flex flex-col relative border-[2px] border-borderSecondary rounded-xl group focus-within:border-primary">
              <label
                htmlFor="name"
                className={`absolute left-[1rem] top-1/2 -translate-y-1/2 text-textSecondary text-[1.4rem] transition-all duration-300 group-focus-within:top-[-0.2rem] group-focus-within:text-[1.2rem] group-focus-within:text-primary group-focus-within:bg-white group-focus-within:px-[.5rem] ${
                  inputData.name?.length > 0 &&
                  "top-[-0.2rem] bg-white px-[0.5rem] text-[1.18rem]"
                } `}
              >
                Name
              </label>
              <input
                onChange={handleInputData}
                type="text"
                id="name"
                name="name"
                className="p-[1rem] outline-none border-none focus:ring-0 rounded-xl"
              />
            </div>
            {!inputData.name && !isValid && (
              <p className="text-accent text-[1.2rem]">
                Please Enter Your Name
              </p>
            )}
            {!(inputData.name === "") &&
              !/^[a-zA-Z]{4,}$/.test(inputData.name) &&
              !isValid && (
                <p className="text-accent text-[1.2rem]">
                  Name must be at least 4 alphabets charecters
                </p>
              )}
          </div>
          <div>
            <div className="flex flex-col relative border-[2px] border-borderSecondary rounded-xl group focus-within:border-primary">
              <label
                htmlFor="phone"
                className={`absolute left-[1rem] top-1/2 -translate-y-1/2 text-textSecondary text-[1.4rem] transition-all duration-300 group-focus-within:top-[-0.2rem] group-focus-within:text-[1.2rem] group-focus-within:text-primary group-focus-within:bg-white group-focus-within:px-[.5rem] ${
                  inputData.phone?.length > 0 &&
                  "top-[-0.2rem] bg-white px-[0.5rem] text-[1.18rem]"
                } `}
              >
                Phone
              </label>
              <input
                onChange={handleInputData}
                type="text"
                id="phone"
                name="phone"
                className="p-[1rem] outline-none border-none focus:ring-0 rounded-xl"
              />
            </div>
            {!inputData.phone && !isValid && (
              <p className="text-accent text-[1.2rem]">
                Please Enter Phone Number
              </p>
            )}
            {!(inputData.phone === "") &&
              inputData.phone?.length < 9 &&
              !isValid && (
                <p className="text-accent text-[1.2rem]">
                  The Number must be at least 10 charecters{" "}
                </p>
              )}
          </div>
          <div>
            <div className="flex flex-col relative border-[2px] border-borderSecondary rounded-xl group focus-within:border-primary">
              <label
                htmlFor="password"
                className={`absolute left-[1rem] top-1/2 -translate-y-1/2 text-textSecondary text-[1.4rem] transition-all duration-300 group-focus-within:top-[-0.2rem] group-focus-within:text-[1.2rem] group-focus-within:text-primary group-focus-within:bg-white group-focus-within:px-[.5rem] ${
                  inputData.password?.length > 0 &&
                  "top-[-0.2rem] bg-white px-[0.5rem] text-[1.18rem]"
                } `}
              >
                Password
              </label>
              <input
                onChange={handleInputData}
                type="text"
                name="password"
                id="password"
                className="p-[1rem] outline-none border-none focus:ring-0 rounded-xl"
              />
            </div>
            {!inputData.password && !isValid && (
              <p className="text-accent text-[1.2rem]">Please Enter Password</p>
            )}
            {inputData.password &&
              !/^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[@#$%^&*]+).{8,16}$/.test(
                inputData.password
              ) &&
              !isValid && (
                <p className="text-accent text-[1.2rem]">
                  Password must be 8-16 characters long, with an uppercase
                  letter, a lowercase letter, a number, and a special character
                  (@, #, $, etc.).
                </p>
              )}
          </div>
          <div>
            <div className="flex flex-col relative border-[2px] border-borderSecondary rounded-xl group focus-within:border-primary">
              <label
                htmlFor="confirmPassword"
                className={`absolute left-[1rem] top-1/2 -translate-y-1/2 text-textSecondary text-[1.4rem] transition-all duration-300 group-focus-within:top-[-0.2rem] group-focus-within:text-[1.2rem] group-focus-within:text-primary group-focus-within:bg-white group-focus-within:px-[.5rem] ${
                  inputData.confirmPassword?.length > 0 &&
                  "top-[-0.2rem] bg-white px-[0.5rem] text-[1.18rem]"
                } `}
              >
                Confirm Password
              </label>
              <input
                onChange={handleInputData}
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                className="p-[1rem] outline-none border-none focus:ring-0 rounded-xl"
              />
            </div>
            {!isValid && inputData.confirmPassword !== inputData.password && (
              <p className="text-accent text-[1.2rem]">
                Confirm Password does not matched!
              </p>
            )}
          </div>
          <div className="flex-1 rounded-xl hover:shadow-xl bg-primary text-white  ">
            <button type="submit" className="w-full px-6 py-2 ">
              Sign Up
            </button>
          </div>
        </form>
      </FormWrapper>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default SignUp;
