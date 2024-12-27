import BrandLogo from "../assets/images/BrandLogo.svg";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 px-[1.7rem] pt-[.8rem] pb-[1.8rem] border-b border-[#69696f]">
      <img src={BrandLogo} alt="" />
      <p className="text-3xl flex-1">LibraryIsight</p>
    </div>
  );
};

export default Logo;
