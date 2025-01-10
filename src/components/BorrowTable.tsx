import { Request } from "../entites/Request";
import borrowService from "../services/borrow-service";
import Badge from "./Badge";
import TableBotton from "./TableBotton";
import Image from "./Image";
import Loader from "./Loader";
import Table from "./Table";

const BorrowTable = () => {
  const columnHeading = [
    "Photo",
    "Name",
    "Book ID",
    "Photo",
    "Name",
    "Student ID",
    "Status",
  ];
  const { data, isLoading } = borrowService.useGetAll<Request[]>([
    "borrowsBooks",
  ]);
  const { mutate } = borrowService.useUpdate(
    ["borrowsBooks", "OpenRequests", "overviewCard", "book"],
    "Oppration Successfull"
  );

  const handleAsign = (id: string) => {
    mutate([`/assigned/${id}`, null]);
  };

  const handleReturn = (id: string) => {
    mutate([id, null]);
  };

  if (isLoading) return <Loader />;

  if (data?.length === 0) return <p>No Book Borrowed</p>;

  return (
    <Table heading="Recent Borrows" thead={columnHeading}>
      <tbody>
        {data?.map((el, ind) => (
          <tr key={ind} className="border border-collapse gap-2 td-padding">
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
              <Image imageURL={el.student.imageURL} name={el.student.name} />
            </td>
            <td>{el.student.name}</td>
            <td>{el.student.studentId}</td>
            <td className="text-center">
              <Badge condition={el.isAssigned}>{["Assigned", "Pending"]}</Badge>
            </td>
            <td>
              {!el.isAssigned && (
                <TableBotton
                  condition={el.isAssigned}
                  handleFunction={handleAsign}
                  id={el._id}
                >
                  Assign
                </TableBotton>
              )}
              {el.isAssigned && !el.isReturned && (
                <TableBotton
                  condition={el.isReturned}
                  handleFunction={handleReturn}
                  id={el._id}
                >
                  Return
                </TableBotton>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BorrowTable;
