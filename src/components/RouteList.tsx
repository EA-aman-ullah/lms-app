import { FaUser } from "react-icons/fa6";
import { SiGitbook } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { TbBookUpload, TbBookDownload } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";

const RouteList = () => {
  const links = [
    { title: "Dashboard", icon: <MdDashboard size={20} color="white" /> },
    { title: "Books", icon: <SiGitbook size={20} color="white" /> },
    { title: "Requests", icon: <TbBookUpload size={20} color="white" /> },
    { title: "Borrows", icon: <TbBookDownload size={20} color="white" /> },
    { title: "Profile", icon: <FaUser size={20} color="white" /> },
  ];

  const location = useLocation();
  return (
    <ul className="flex flex-col py-[1.5rem] gap-[.5rem]">
      {links.map((el, ind) => (
        <Link key={ind} to={el.title.toLowerCase()}>
          <li
            className={
              el.title.toLowerCase() === location.pathname.split("/")[1]
                ? " flex  items-center gap-[1rem] text-[1.6rem] px-[1.7rem] py-[1rem] bg-[#3992ee] rounded-xl  cursor-pointer"
                : " flex  items-center gap-[1rem] text-[1.6rem] px-[1.7rem] py-[1rem] hover:bg-[#464648]  rounded-xl cursor-pointer"
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
