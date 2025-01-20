import { FaUser } from "react-icons/fa6";
import { SiGitbook } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import {TbBookDownload } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import CurrentUser from "../entites/CurrentUser";

const RouteList = () => {
  const location = useLocation();
  const links = [
    { title: "Dashboard", icon: <MdDashboard size={20} color="white" /> },
    { title: "Books", icon: <SiGitbook size={20} color="white" /> },
    { title: "Profile", icon: <FaUser size={20} color="white" /> },
  ];

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as CurrentUser;

  if (currentUser?.role === "admin" || currentUser?.role === "librarian") {
    links.splice(
      2,
      0,
      {
        title: "Students",
        icon: <FaUser size={20} color="white" />,
      },
      { title: "Borrows", icon: <TbBookDownload size={20} color="white" /> }
    );
  }

  return (
    <ul className="flex flex-col py-[1.5rem] gap-[.5rem]">
      {links.map((el, ind) => (
        <Link key={ind} to={el.title.toLowerCase()}>
          <li
            className={
              el.title.toLowerCase() === location.pathname.split("/")[1]
                ? " flex  items-center gap-[1rem] text-[1.6rem] px-[1.7rem] py-[1rem] bg-primary rounded-xl  cursor-pointer"
                : " flex  items-center gap-[1rem] text-[1.6rem] px-[1.7rem] py-[1rem] hover:bg-hoverSecondary  rounded-xl cursor-pointer"
            }
          >
            <div>{el.icon}</div>
            <p>{el.title}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default RouteList;
