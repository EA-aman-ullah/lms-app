import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/api-client";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const SignInSignOut = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("auth-token");

  const handleLogging = (to: string) => {
    navigate(to);
    localStorage.removeItem("auth-token");
    localStorage.removeItem("currentUser");
    axiosInstance.defaults.headers.common["Authorization"] = "";
  };

  return (
    <div className="  text-[1.6rem] px-[1.7rem] py-[1rem] bg-primary hover:bg-hoverPrimary rounded-xl  cursor-pointer">
      {token ? (
        <div
          onClick={() => handleLogging("/")}
          className="flex  items-center gap-[1rem]"
        >
          <FaSignOutAlt size={20} color="white" />
          <p>Sign Out</p>
        </div>
      ) : (
        <div
          onClick={() => handleLogging("/login")}
          className="flex  items-center gap-[1rem]"
        >
          <FaSignInAlt size={20} color="white" />
          <p>Sign In</p>
        </div>
      )}
    </div>
  );
};

export default SignInSignOut;
