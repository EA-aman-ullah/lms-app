import useLogin from "../hooks/useLogin";
import FormWrapper from "../components/FormWrapper";
import { Link } from "react-router-dom";

const Login = () => {
  const { inputData, handleInputData, handleSubmit } = useLogin();

  return (
    <>
      <FormWrapper
        heading="Sign In"
        navigationLink="/signup"
        navigationButtonText="Sing UP"
        navigationPragraphText="Don't have an account?"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[2rem] w-full text-[1.6rem] pt-[6rem]"
        >
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
              type="password"
              name="password"
              id="password"
              className="p-[1rem] outline-none border-none focus:ring-0 rounded-xl"
            />
          </div>
          <p className="text-secondary text-[1.2rem]">
            Forgot your password?
            <Link to={"/forget-password"}>
              <span className="font-bold text-primary text-nowrap">
                {" "}
                Forget Password
              </span>
            </Link>
          </p>
          <div className="flex-1 rounded-xl hover:shadow-xl bg-primary text-white  ">
            <button type="submit" className="w-full px-6 py-2 ">
              Login
            </button>
          </div>
        </form>
      </FormWrapper>
    </>
  );
};

export default Login;
