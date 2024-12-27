import Logo from "./Logo";
import RouteList from "./RouteList";
import SignInSignOut from "./SignInSignOut";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between bg-[#333338] z-[40] border-b w-[25rem] h-[96.5vh] fixed top-[1.5rem] rounded-3xl text-[#f2f2f3] p-[1.5rem]">
      <div>
        <Logo />
        <RouteList />
      </div>
      <SignInSignOut />
    </div>
  );
};

export default Sidebar;
