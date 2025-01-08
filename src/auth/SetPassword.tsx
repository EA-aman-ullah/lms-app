import { useParams } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import usePassword from "../hooks/usePassowrd";

const SetPassword = () => {
  const { id } = useParams();
  const { isLoading, isValid, inputData, handleSubmit, handleInputData } =
    usePassword();

  return (
    <FormWrapper
      heading="Password"
      navigationLink="/singup"
      navigationButtonText="Sign Up"
      navigationPragraphText="Want to change something ?"
    >
      <form
        className="flex flex-col gap-[2rem] w-full text-[1.6rem] pt-[6rem]"
        onSubmit={(e) => handleSubmit(e, id as string)}
      >
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
                Password must be 8-16 characters long, with an uppercase letter,
                a lowercase letter, a number, and a special character (@, #, $,
                etc.).
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
          <button
            disabled={isLoading}
            type="submit"
            className="w-full px-6 py-2 "
          >
            Save
          </button>
        </div>
      </form>
    </FormWrapper>
  );
};

export default SetPassword;
