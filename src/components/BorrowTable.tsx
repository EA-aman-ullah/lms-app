import { Borrow } from "../entites/Borrow";
import borrowService from "../services/borrow-service";
import Badge from "./Badge";
import Botton from "./Botton";
import Table from "./Table";

const BorrowTable = () => {
  const columnHeading = [
    "Photo",
    "Name",
    "Book ID",
    "Photo",
    "Name",
    "Student ID",
    "Assigned",
    "Action",
  ];
  const { data } = borrowService.useGetAll<Borrow[]>(["borrowsBooks"]);
  const { mutate } = borrowService.useUpdate(
    ["borrowsBooks", "overviewCard", "book"],
    "Oppration Successfull"
  );

  const handleAsign = (id: string) => {
    mutate([`/assigned/${id}`, null]);
  };

  const handleReturn = (id: string) => {
    mutate([id, null]);
  };

  if (data?.length === 0) return <p>No Book Borrowed</p>;

  return (
    <Table heading="Recent Borrows" thead={columnHeading}>
      <tbody>
        {data?.map((el, ind) => (
          <tr
            key={ind}
            className="border border-collapse gap-2 even:bg-slate-50 bg-white td-padding"
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
            <td className="text-center">
              <Badge condition={el.isAssigned}>{["Assigned", "Pending"]}</Badge>
            </td>
            <td>
              {!el.isAssigned && (
                <Botton
                  condition={el.isAssigned}
                  handleFunction={handleAsign}
                  id={el._id}
                >
                  Assign
                </Botton>
              )}
              {el.isAssigned && !el.isReturned && (
                <Botton
                  condition={el.isReturned}
                  handleFunction={handleReturn}
                  id={el._id}
                >
                  Return
                </Botton>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BorrowTable;
