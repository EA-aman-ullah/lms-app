import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Layout = () => {
  const [isExpended, setExpended] = useState(false);

  const handleExpended = () => {
    setExpended(!isExpended);
  };

  return (
    <div className="relative p-[1rem]">
      <Sidebar isExpended={isExpended} handleExpended={handleExpended} />

      <div className="md:ml-[26.6rem]">
        <Navbar isExpended={isExpended} handleExpended={handleExpended} />
        <div className="mt-[8rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
