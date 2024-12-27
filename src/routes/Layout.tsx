import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="relative">
      <Sidebar />

      <div className="md:ml-[26.6rem]">
        <Navbar />
        <div className="mt-[8rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
