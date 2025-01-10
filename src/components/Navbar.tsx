import { useEffect, useState } from "react";
import Logo from "./Logo";
import SignInSignOut from "./SignInSignOut";
import BookSearch from "./BookSearch";
import DashboardButton from "./DashboardButton";
import CurrentUser from "../entites/CurrentUser";
import BooksButton from "./BooksButton";

const Navbar = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as CurrentUser;

  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`pb-[5rem] md:pb-0 w-full pr-[1.7rem] flex items-center justify-between fixed top-[0rem] z-50  ${
        isScrolled
          ? "bg-transWhite backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <Logo />
      <div className="fixed left-[50%] transform -translate-x-1/2 top-[5.5rem] md:static md:-translate-x-0">
        <BookSearch />
      </div>
      <div className="flex gap-[1rem]">
        <BooksButton />
        {currentUser ? <DashboardButton /> : <SignInSignOut />}
      </div>
    </div>
  );
};

export default Navbar;
