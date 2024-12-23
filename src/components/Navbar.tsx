import { Link, useLocation, useNavigate } from "react-router-dom";
import BrandLogo from "../assets/images/BrandLogo.svg";
import { axiosInstance } from "../services/api-client";
import { CgMenuRound } from "react-icons/cg";
import { useState } from "react";

const Navbar = () => {
  const links = ["Home", "Dashboard", "Books", "Students"];
  const location = useLocation();
  const [isExpended, setExpended] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("currentUser");
    axiosInstance.defaults.headers.common["Authorization"] = "";
  };

  return (
    <nav className=" flex fixed top-0 w-full bg-[#FFF] z-30  px-6 py-1 md:py-0 items-center justify-between border-b border-gray-300">
      <div className="flex items-center gap-2">
        <img src={BrandLogo} alt="" />
        <p className="text-3xl flex-1">LibraryIsight</p>
      </div>
      <div>
        <ul
          className={
            !isExpended
              ? "translate-x-[-250px] md:translate-x-0 transition duration-500 ease-in-out  flex gap-2 fixed md:static left-0 top-[47px] w-[250px] md:w-fit px-[20px] pt-5 md:p-0 border-r md:border-0 h-full flex-col md:flex-row bg-[#FFF] border-separate z-50"
              : " transition duration-500 ease-in-out flex gap-2 fixed md:static left-0 top-[47px] w-[250px] md:w-fit px-[20px] pt-5 md:p-0 border-r md:border-0 h-full flex-col md:flex-row bg-[#FFF] border-separate z-50"
          }
        >
          {links.map((el, ind) => (
            <Link key={ind} to={el.toLowerCase()}>
              <li
                className={
                  el.toLowerCase() === location.pathname.split("/")[1]
                    ? "p-3 shadow md:shadow-none border-b-4 border-[#636AE8] rounded text-[#636AE8] font-[700] cursor-pointer"
                    : "p-3 cursor-pointer shadow md:shadow-none"
                }
              >
                {el}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <div>
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={handleLogout}
              className="rounded bg-[#636AE8] text-[#fff] py-2 px-4 "
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="rounded bg-[#636AE8]  text-[#fff] py-2 px-4 ">
                Login
              </button>
            </Link>
          )}
        </div>
        <div onClick={() => setExpended(!isExpended)} className=" md:hidden">
          <CgMenuRound size={30} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
