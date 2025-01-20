import { ReactNode } from "react";
import Search from "./Search";

interface Props {
  thead: string[];
  children: ReactNode;
  search: string;
  handleSearching: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Table = ({ thead, search, handleSearching, children }: Props) => {
  return (
    <div className="relative pt-[2rem] transition-all ease-in-out duration-500 ">
      <div className=" flex items-center absolute top-[0rem] left-1/2 transform -translate-x-1/2 z-[33]  bg-primary  w-[calc(100%-4rem)] text-[1.6rem] font-bold text-white rounded-xl  px-[1rem] py-[2rem] text-start">
        {/* <h1> {heading}</h1> */}
        <div className=" border mx-auto w-fit bg-white rounded-full shadow-2xl">
          <Search search={search} handleSearching={handleSearching} />
        </div>
      </div>

      <div className=" table-fixed  w-full bg-white rounded-2xl border  overflow-x-auto scrollbar scrollbar-w-[1rem]  scrollbar-thumb-hoverSecondary  ">
        {/* <div className="mt-[6rem] mx-auto w-fit">
        </div> */}
        <table className=" w-full ">
          <thead>
            <tr className="th-padding ">
              {thead.map((el, ind) => (
                <th key={ind} className="text-nowrap">
                  {el}
                </th>
              ))}
            </tr>
          </thead>
          {children}
        </table>
      </div>
    </div>
  );
};

export default Table;
