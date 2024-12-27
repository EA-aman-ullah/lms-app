import requestService from "../services/request-service";
import Botton from "./Botton";
import { Request } from "../entites/Request";
type RequestId = Request["_id"];

const RequestList = () => {
  const { data } = requestService.useGetAll<Request[]>(["requests"]);
  const { mutate } = requestService.useUpdate<RequestId>([
    "requests",
    "overviewCard",
    "borrowsBooks",
  ]);

  const handleApprove = (id: string) => {
    mutate([id, null]);
  };

  if (data?.length === 0) return <p>No book Requested</p>;

  return (
    <table className="bg-slate-50">
      <thead>
        <tr className="">
          <th
            className=" relative bg-[#328bed] text-[1.6rem] text-[#fff] rounded-3xl  px-[1rem] py-[2rem] text-start"
            colSpan={8}
          >
            Recent Requests
          </th>
        </tr>
        <tr className="border  p-[2rem]">
          <th>Photo</th>
          <th>Name</th>
          <th>Book ID</th>
          <th>Photo</th>
          <th>Name</th>
          <th>Student ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((el, ind) => (
          <tr
            key={ind}
            className="border td-padding border-collapse gap-2 even:bg-slate-50 bg-white "
          >
            <td className="m-3">
              <img
                className="size-10 object-cover"
                src={el.book.imageURL}
                alt=""
              />
            </td>
            <td className="">{el.book.name}</td>
            <td>{el.book.bookId}</td>
            <td>
              <img
                className="size-10 object-cover"
                src={el.student.imageURL}
                alt=""
              />
            </td>
            <td>{el.student.name}</td>
            <td>{el.student.studentId}</td>
            <td>
              <span className="border  border-blue-700 rounded-xl p-1 text-[#636AE8] ">
                {!el.isApproved ? "Pending" : "Approved"}
              </span>
            </td>
            <td>
              {!el.isApproved && (
                <Botton handleFunction={handleApprove} id={el._id}>
                  Approve
                </Botton>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestList;
