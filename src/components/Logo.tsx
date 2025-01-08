import BrandLogo from "../assets/images/BrandLogo.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 px-[1.7rem] py-[1rem] ">
      <img src={BrandLogo} alt="" />
      <p className="text-3xl flex-1">LibraryIsight</p>
    </div>
  );
};

export default Logo;
