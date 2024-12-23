import DBCard from "../entites/DBCards";
import dashboardService from "../services/dashboard-service";
import Loader from "./Loader";

const overviewCard = () => {
  const { useGetAll } = dashboardService;
  const { data, isLoading } = useGetAll<DBCard[]>(["overviewCard"]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex gap-4 flex-wrap">
      {data?.map((el, ind) => (
        <div
          key={ind}
          className="shadow-lg p-3 rounded-xl bg-[#F3F4F6] basis-[250px] flex-1"
        >
          <h1 className="text-[#636AE8]">{el.title}</h1>
          <p>{el.value}</p>
        </div>
      ))}
    </div>
  );
};

export default overviewCard;
