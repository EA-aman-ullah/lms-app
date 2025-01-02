import OverviewCard from "../components/OverviewCard";
import RequestList from "../components/RequestTable";
import BorrowTable from "../components/BorrowTable";
import { useEffect, useState } from "react";
import TableSeclectionBar from "../components/TableSeclectionBar";

const dashboard = () => {
  const [selectedTable, setTable] = useState("request");
  const handleSelectedTable = (selectedTable: string) => {
    selectedTable === "request"
      ? setTable(selectedTable)
      : setTable(selectedTable);
  };

  const [data, setData] = useState();

  useEffect(() => {
    console.log("data");
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-[1.25rem] max-w-[1320px] mx-auto">
        <OverviewCard />
        <TableSeclectionBar
          handleSelectedTable={handleSelectedTable}
          selectedTable={selectedTable}
        />
        <div>
          {selectedTable === "request" ? <RequestList /> : <BorrowTable />}
        </div>
      </div>
    </>
  );
};

export default dashboard;
