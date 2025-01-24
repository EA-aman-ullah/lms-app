import { BiSolidBookAdd } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";

const BooksButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className={` ${
        location.pathname.split("/")[
          location.pathname.split("/").length - 1
        ] === "books" && "hidden"
      } flex  items-center gap-[1rem] text-white text-[1.6rem] px-[1.7rem] py-[1rem] bg-primary rounded-xl  cursor-pointer`}
    >
      <BiSolidBookAdd size={20} />
      <p className="hidden lg:block">Books</p>
    </div>
  );
};

export default BooksButton;
