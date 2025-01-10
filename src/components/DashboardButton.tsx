import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DashboardButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/dashboard")}
      className="flex  items-center gap-[1rem] text-white text-[1.6rem] px-[1.7rem] py-[1rem] bg-primary rounded-xl  cursor-pointer"
    >
      <MdDashboard size={20} color="white" />
      <p className="hidden lg:block">Dashboard</p>
    </div>
  );
};

export default DashboardButton;
