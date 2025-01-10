import { useNavigate } from "react-router-dom";
import BrandLogo from "../assets/images/BrandLogo.svg";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/books")}
      className="flex items-center gap-2 cursor-pointer px-[1.7rem] py-[1rem] "
    >
      <img src={BrandLogo} alt="" />
      <p className="text-3xl flex-1">LibraryIsight</p>
    </div>
  );
};

export default Logo;
