import DBCard from "../entites/DBCards";
import dashboardService from "../services/dashboard-service";
import { MdPendingActions } from "react-icons/md";
import { TbBookDownload } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { RiBook3Fill } from "react-icons/ri";
import { TbUsersGroup } from "react-icons/tb";
import Loader from "./Loader";

const overviewCard = () => {
  const iconMap = [
    <RiBook3Fill size={30} color="white" />,
    <MdPendingActions size={30} color="white" />,
    <TbBookDownload size={30} color="white" />,
    <TbUsersGroup size={30} color="white" />,
    <FaUsers size={30} color="white" />,
  ];
  const backgroundColors = [
    "bg-[#36363d]",
    "bg-[#55ae59]",
    "bg-[#dc2265]",
    "bg-[#55ae59]",
    "bg-[#dc2265]",
  ];

  const { useGetAll } = dashboardService;
  const { data, isLoading } = useGetAll<DBCard[]>(["overviewCard"]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex gap-[3rem] flex-wrap pt-[1.4rem]">
      {data?.map((el, ind) => (
        <div
          key={ind}
          className=" flex flex-col shadow-lg p-[1rem]   rounded-xl bg-[#FFF] basis-[200px] flex-1"
        >
          <div className=" flex justify-between border-b border-[#eaeaeb]">
            <div
              className={`${backgroundColors[ind]} p-[1.8rem] rounded-3xl shadow-xl relative bottom-[2.5rem] `}
            >
              {iconMap[ind]}
            </div>
            <div className="flex flex-col items-end text-[1.5rem] ">
              <p className="text-[#6e6e6e]">Quantity</p>
              <p className="text-5xl font-[600]">{el.value}</p>
            </div>
          </div>
          <h1 className="text-[#6e6e6e] text-[1.3rem] pt-[0.5rem]">
            {el.title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default overviewCard;
