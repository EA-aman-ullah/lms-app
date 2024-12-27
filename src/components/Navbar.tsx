import { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { useLocation } from "react-router-dom";
import AddBook from "./AddBook";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const title = location.pathname.split("/")[1];
  const formattedTitle = title
    ? title.charAt(0).toUpperCase() + title.slice(1)
    : "";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="modal"
      className={`p-[1.5rem] flex rounded-full items-center justify-between mr-[1.5rem] w-[calc(100%-2.5rem)] md:w-[calc(100%-28.6rem)] fixed top-[1rem] z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#ffffffc4] backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div>
        <div className="flex items-center gap-2 text-[#52555b] text-[1.4rem] font-[600]">
          <MdHome /> <span> / {formattedTitle}</span>
        </div>
        <div className="text-[1.6rem] font-bold text-[#344767]">
          {formattedTitle}
        </div>
      </div>
      <div>
        <AddBook />
      </div>
    </div>
  );
};

export default Navbar;
