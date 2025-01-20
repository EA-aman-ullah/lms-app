import OverviewCard from "../components/OverviewCard";
import RequestList from "../components/RequestTable";
import AssignTable from "../components/AssignTable";
import { useState } from "react";
import TableSeclectionBar from "../components/TableSeclectionBar";
import ReturnTable from "../components/ReturnTable";

const dashboard = () => {
  const [selectedTable, setTable] = useState("request");
  const handleSelectedTable = (selectedTable: string) => {
    selectedTable === "request"
      ? setTable(selectedTable)
      : setTable(selectedTable);
  };
  return (
    <>
      <div className="flex flex-col gap-[1.25rem] mx-auto ">
        <OverviewCard />
        <TableSeclectionBar
          handleSelectedTable={handleSelectedTable}
          selectedTable={selectedTable}
        />
        <div>
          {selectedTable === "request" && <RequestList />}
          {selectedTable === "assign" && <AssignTable />}
          {selectedTable === "return" && <ReturnTable />}
        </div>
      </div>
    </>
  );
};

export default dashboard;
