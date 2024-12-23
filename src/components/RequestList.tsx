import requestService from "../services/request-service";
import RequestApprove from "./RequestApprove";

interface Request {
  _id: string;
  isApproved: boolean;
  book: {
    _id: string;
    autherName: string;
    name: string;
    imageURL: string;
    bookId: string;
  };
  student: {
    _id: string;
    name: string;
    phone: string;
    studentId: string;
    imageURL: string;
  };
}

type RequestId = Request["_id"];

const RequestList = () => {
  const { data } = requestService.useGetAll<Request[]>(["requests"]);
  const { mutate, data: requestData } = requestService.useUpdate<
    RequestId | Request
  >(["requests"]);

  const handleApprove = (id: string) => {
    mutate([id, null]);
    console.log(requestData);
  };

  return (
    <table className="bg-slate-50">
      <thead>
        <tr className="border ">
          <th></th>
          <th>Name</th>
          <th>Book ID</th>
          <th></th>
          <th>Name</th>
          <th>Student ID</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((el, ind) => (
          <tr
            key={ind}
            className="border border-collapse gap-2 even:bg-slate-50 bg-white "
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
              <span className="border border-blue-700 rounded-xl p-1 text-[#636AE8] ">
                {!el.isApproved ? "Pending" : "Approved"}
              </span>
            </td>
            <td>
              <RequestApprove handleApprove={handleApprove} id={el._id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestList;
