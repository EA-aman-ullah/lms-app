import Logo from "./Logo";
import RouteList from "./RouteList";
import SignInSignOut from "./SignInSignOut";
import { RxCross2 } from "react-icons/rx";

interface Props {
  isExpended: boolean;
  handleExpended: () => void;
}

const Sidebar = ({ isExpended, handleExpended }: Props) => {
  return (
    <div
      className={`flex flex-col justify-between bg-secondary z-[60] w-[25rem] h-[96.5vh] fixed top-[1.5rem] rounded-3xl text-white p-[1.5rem] transition duration-700 ease-in-out -translate-x-[26.6rem] md:translate-x-[0rem] ${
        isExpended && "translate-x-[0rem]"
      }`}
    >
      <div>
        <div
          onClick={handleExpended}
          className="cursor-pointer w-fit ml-[20rem] sm:hidden"
        >
          <RxCross2 size={20} color="white" />
        </div>
        <div className="border-b border-borderPrimary pb-[1rem]">
          <Logo />
        </div>
        <RouteList />
      </div>
      <SignInSignOut />
    </div>
  );
};

export default Sidebar;
