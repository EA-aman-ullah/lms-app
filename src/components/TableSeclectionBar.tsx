import { TbBookUpload, TbBookDownload } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa";

interface Props {
  selectedTable: string;
  handleSelectedTable: (selectedTable: string) => void;
}

const TableSeclectionBar = ({ selectedTable, handleSelectedTable }: Props) => {
  return (
    <div className=" flex justify-between items-center bg-secondary p-[1rem] rounded-full">
      <h1 className="text-white text-[1.4rem] text-nowrap sm:text-[1.6rem] font-[700] ml-[1rem] hidden sm:block ">
        Recent Book
      </h1>
      <div className="flex flex-1 sm:flex-shrink-0 sm:flex-grow-0 gap-[1rem] ">
        <div
          onClick={() => handleSelectedTable("request")}
          className={`flex-1 flex gap-[0.5rem] sm:gap-[1rem] items-center justify-center  text-white cursor-pointer text-[1.2rem] sm:text-[1.5rem] py-[0.4rem] sm:py-[.8rem] px-[1rem] sm:px-[1.5rem] rounded-full shadow-md focus:outline-none transition duration-300 ease-in-out 
              ${
                selectedTable === "request"
                  ? "bg-primary hover:bg-hoverPrimary scale-[1.03] sm:scale-105 shadow-lg"
                  : "hover:bg-hoverSecondary"
              }`}
        >
          <FaQuestion size={20} color="white" />
          <button>Requests</button>
        </div>
        <div
          onClick={() => handleSelectedTable("assign")}
          className={`flex-1 flex gap-[0.5rem] sm:gap-[1rem] items-center justify-center text-white cursor-pointer text-[1.2rem] sm:text-[1.5rem] py-[0.4rem] sm:py-[.8rem] px-[1rem] sm:px-[1.5rem] rounded-full shadow-md focus:outline-none transition duration-300 ease-in-out 
              ${
                selectedTable === "assign"
                  ? "bg-primary hover:bg-hoverPrimary scale-[1.03] sm:scale-105 shadow-lg"
                  : "hover:bg-hoverSecondary"
              }`}
        >
          <TbBookUpload size={20} color="white" />
          <button>Assign</button>
        </div>
        <div
          onClick={() => handleSelectedTable("return")}
          className={`flex-1 flex gap-[0.5rem] sm:gap-[1rem] items-center justify-center text-white cursor-pointer text-[1.2rem] sm:text-[1.5rem] py-[0.4rem] sm:py-[.8rem] px-[1rem] sm:px-[1.5rem] rounded-full shadow-md focus:outline-none transition duration-300 ease-in-out 
              ${
                selectedTable === "return"
                  ? "bg-primary hover:bg-hoverPrimary scale-[1.03] sm:scale-105 shadow-lg"
                  : "hover:bg-hoverSecondary"
              }`}
        >
          <TbBookDownload size={20} color="white" />
          <button>Return</button>
        </div>
      </div>
    </div>
  );
};

export default TableSeclectionBar;
