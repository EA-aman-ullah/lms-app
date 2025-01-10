import { ReactNode } from "react";

interface Props {
  heading: string;
  thead: string[];
  children: ReactNode;
}

const Table = ({ heading, thead, children }: Props) => {
  return (
    <div className="relative pt-[2rem] overflow-x-scroll transition-all ease-in-out duration-500 ">
      <h2 className="absolute top-[0rem] left-1/2 transform -translate-x-1/2 z-[33]  bg-primary  w-[calc(100%-4rem)] text-[1.6rem] font-bold text-white rounded-xl  px-[1rem] py-[2rem] text-start">
        {heading}
      </h2>
      <div className="table-fixed w-full rounded-2xl  overflow-x-scroll">
        <table className="bg-white w-full ">
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
