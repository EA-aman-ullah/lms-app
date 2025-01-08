import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  heading: string;
  navigationLink: string;
  navigationPragraphText: string;
  navigationButtonText: string;
  children: ReactNode;
}

const FormWrapper = ({
  heading,
  children,
  navigationLink,
  navigationButtonText,
  navigationPragraphText,
}: Props) => {
  return (
    <>
      <div className="bg-login bg-cover w-[100vw] h-[100vh]">
        <div className="w-[100vw] h-[100vh] bg-transBlack">
          <div className="flex flex-col fixed top-[50%]  left-[50%] transform -translate-x-1/2 -translate-y-1/2  items-center gap-[2rem] w-[calc(100%-4rem)] sm:w-[32rem] bg-white p-[2rem] rounded-2xl">
            <div className="bg-primary  text-white text-[2.5rem] w-[calc(100%-4rem)] p-[2rem] rounded-2xl absolute top-[-2rem] ">
              <h1 className="mx-auto w-fit font-bold">{heading}</h1>
            </div>
            {children}
            <div className="flex gap-[0.3rem] text-[1.4rem] ">
              <p className="text-textSecondary">{navigationPragraphText}</p>
              <Link
                to={navigationLink}
                className="font-bold text-primary text-nowrap"
              >
                {navigationButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormWrapper;
