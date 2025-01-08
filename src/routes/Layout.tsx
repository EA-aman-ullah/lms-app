import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import { useState } from "react";

const Layout = () => {
  const location = useLocation();
  const [isExpended, setExpended] = useState(false);

  const handleExpended = () => {
    setExpended(!isExpended);
  };

  if (location.pathname.split("/")[1] === "set-password") return <Outlet />;

  return (
    <div className="relative p-[1rem] bg-gray-100 min-h-[100vh]">
      <Sidebar isExpended={isExpended} handleExpended={handleExpended} />

      <div className="md:ml-[26.6rem]">
        <Navigation isExpended={isExpended} handleExpended={handleExpended} />
        <div className="mt-[8rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
