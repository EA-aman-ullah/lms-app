import requestService from "../services/request-service";
import Botton from "./Botton";
import { Request } from "../entites/Request";
import Table from "./Table";
import Loader from "./Loader";
import Image from "./Image";
import Badge from "./Badge";
type RequestId = Request["_id"];

const RequestList = () => {
  const columnHeading = [
    "Photo",
    "Name",
    "Book ID",
    "Location",
    "Photo",
    "Name",
    "Student ID",
    "Status",
  ];

  const { data, isLoading } = requestService.useGetAll<Request[]>(["requests"]);
  const { mutate } = requestService.useUpdate<RequestId>([
    "requests",
    "overviewCard",
    "borrowsBooks",
  ]);

  const handleApprove = (id: string) => {
    mutate([id, null]);
  };

  if (isLoading) return <Loader />;

  if (data?.length === 0) return <p>No book Requested</p>;

  return (
    <Table heading="Recent Request" thead={columnHeading}>
      <tbody>
        {data?.map((el, ind) => (
          <tr key={ind} className="border td-padding border-collapse ">
            <td>
              <img src={el.book.imageURL} alt="" />
            </td>
            <td>
              <p>{el.book.name}</p>
              <p>{el.book.autherName}</p>
            </td>
            <td>{el.book.bookId}</td>
            <td>{el.book.location}</td>
            <td>
              <Image imageURL={el.student.imageURL} name={el.student.name} />
            </td>
            <td>{el.student.name}</td>
            <td>{el.student.studentId}</td>
            <td>
              <Badge condition={el.isApproved}>{["Approved", "Pending"]}</Badge>
            </td>
            <td>
              <Botton
                condition={el.isApproved}
                handleFunction={handleApprove}
                id={el._id}
              >
                {el.isApproved ? "Approved" : "Approve"}
              </Botton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default RequestList;
