import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/api-client";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../services/socket";

const SignInSignOut = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const dashboardsLocations = ["dashboard", "requests", "borrows", "profile"];

  const isDashboard = dashboardsLocations.includes(
    location.pathname.split("/")[1]
  );

  const token = localStorage.getItem("auth-token");

  const handleLogging = (to: string) => {
    navigate(to);
    socket.auth = {};
    localStorage.removeItem("auth-token");
    localStorage.removeItem("currentUser");
    axiosInstance.defaults.headers.common["Authorization"] = "";
    queryClient.invalidateQueries();
  };

  return (
    <div className=" text-[1.3rem]  sm:text-[1.6rem] text-white text-nowrap   bg-primary hover:bg-hoverPrimary rounded-xl  cursor-pointer">
      {token ? (
        <div
          onClick={() => handleLogging("/")}
          className="flex  items-center gap-[1rem] px-[1.7rem] py-[1rem]"
        >
          <FaSignOutAlt size={20} color="white" />
          <p className={`${!isDashboard && "hidden sm:block"}`}>Sign Out</p>
        </div>
      ) : (
        <div
          onClick={() => handleLogging("/login")}
          className="flex  items-center gap-[1rem] px-[1.7rem] py-[1rem]"
        >
          <FaSignInAlt size={20} color="white" />
          <p className={`${!isDashboard && "hidden sm:block"}`}>Sign In</p>
        </div>
      )}
    </div>
  );
};

export default SignInSignOut;
