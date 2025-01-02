import { useParams } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import useOTPVerification from "../hooks/useOTPVerification";

const Otp = () => {
  const { id } = useParams();
  const {
    isLoading,
    timeRemaining,
    inputData,
    handleInputData,
    handleResendOtp,
    handleSubmit,
  } = useOTPVerification();

  return (
    <FormWrapper
      heading="OTP"
      navigationLink="/signup"
      navigationButtonText="Sign Up"
      navigationPragraphText="Want ot change something?"
    >
      <form
        onSubmit={(e) => handleSubmit(e, id as string)}
        className="flex flex-col gap-[2rem] w-full text-[1.6rem] pt-[6rem]"
      >
        <div className="flex flex-col relative border-[2px] border-borderSecondary rounded-xl group focus-within:border-primary">
          <label
            htmlFor="otp"
            className={`absolute left-[1rem] top-1/2 -translate-y-1/2 text-textSecondary text-[1.4rem] transition-all duration-300 group-focus-within:top-[-0.2rem] group-focus-within:text-[1.2rem] group-focus-within:text-primary group-focus-within:bg-white group-focus-within:px-[.5rem] ${
              inputData.otp?.length > 0 &&
              "top-[-0.2rem] bg-white px-[0.5rem] text-[1.18rem]"
            } `}
          >
            OTP
          </label>
          <input
            onChange={handleInputData}
            type="text"
            name="otp"
            id="otp"
            className="p-[1rem] outline-none border-none focus:ring-0 rounded-xl"
          />
        </div>
        <div className="text-secondary text-[1.2rem]">
          {timeRemaining > 0 && (
            <p>
              OTP wil be expired in{" "}
              <span className="text-accent">{timeRemaining}</span>
            </p>
          )}
          {timeRemaining === 0 && <p className="text-accent">OTP Expired!</p>}
        </div>
        <div className="flex-1 rounded-xl hover:shadow-xl bg-primary text-white  ">
          <button
            disabled={isLoading}
            type="submit"
            className="w-full px-6 py-2 "
          >
            Verify
          </button>
        </div>
        <div
          onClick={() => handleResendOtp(id as string)}
          className="flex-1 rounded-xl  bg-primary text-white  text-center cursor-pointer "
        >
          <div
            className={
              timeRemaining > 0
                ? "bg-disable px-6 py-2 rounded-xl cursor-auto"
                : " px-6 py-2 rounded-xl  hover:shadow-xl"
            }
          >
            Resend OTP
          </div>
        </div>
      </form>
    </FormWrapper>
  );
};

export default Otp;
