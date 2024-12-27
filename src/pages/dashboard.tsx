import { ToastContainer } from "react-toastify";
import OverviewCard from "../components/OverviewCard";
import RequestList from "../components/RequestList";
import { useState } from "react";
import BorrowTable from "../components/BorrowTable";

const dashboard = () => {
  const [table, setTable] = useState("request");

  return (
    <>
      <div className="flex flex-col gap-5 max-w-[1320px] mx-auto">
        <OverviewCard />

        <div>
          <div>
            <RequestList />
          </div>
          <div>{/* <BorrowTable /> */}</div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default dashboard;
