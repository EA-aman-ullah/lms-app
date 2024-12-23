import { Borrow } from "../entites/Borrow";
import borrowService from "../services/borrow-service";
import Botton from "./Botton";

const BorrowTable = () => {
  const { data } = borrowService.useGetAll<Borrow[]>(["borrowsBooks"]);
  const { mutate } = borrowService.useUpdate(
    ["borrowsBooks", "overviewCard"],
    "Succefully Assigned"
  );

  const handleAsign = (id: string) => {
    mutate([`/assigned/${id}`, null]);
  };

  const handleReturn = (id: string) => {
    mutate([id, null]);
  };

  if (data?.length === 0) return <p>No Book Borrowed</p>;

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
          <th>Returnd</th>
          <th>Assigned</th>
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
                {el.isAssigned && el.isNotReturned
                  ? "pending"
                  : el.isAssigned && !el.isNotReturned
                  ? "Returned"
                  : "Not Assigned"}
              </span>
            </td>
            <td>
              <span className="border border-blue-700 rounded-xl p-1 text-[#636AE8] ">
                {el.isAssigned ? "Assigned" : "Pending"}
              </span>
            </td>
            <td>
              {!el.isAssigned && (
                <Botton handleFunction={handleAsign} id={el._id}>
                  Assign
                </Botton>
              )}
              {el.isAssigned && el.isNotReturned && (
                <Botton handleFunction={handleReturn} id={el._id}>
                  Return
                </Botton>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BorrowTable;
