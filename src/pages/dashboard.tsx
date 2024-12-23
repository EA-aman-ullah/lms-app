import AddBook from "../components/AddBook";
import OverviewCard from "../components/OverviewCard";
import RequestList from "../components/RequestList";

const dashboard = () => {
  return (
    <>
      <div
        id="modaal"
        className=" md:my-10 flex flex-col gap-5 max-w-[1320px] mx-auto"
      >
        <OverviewCard />
        <div className="flex gap-3 pt-5 border-t-2 border-[#7b6cee]">
          <AddBook />
          <button className="bg-[#636AE8] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#4C52D7] focus:outline-none">
            Book Requestes
          </button>
        </div>
        <div>
          <RequestList />
        </div>
      </div>
    </>
  );
};

export default dashboard;
