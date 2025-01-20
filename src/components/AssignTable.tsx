import { Request } from "../entites/Request";
import Badge from "./Badge";
import TableBotton from "./TableBotton";
import Image from "./Image";
import Loader from "./Loader";
import Table from "./Table";
import { useState } from "react";
import Pagination from "./pagination";
import assignService from "../services/assign-service";
import { ASSIGN_BOOK, BOOK, BORROWED_BOOK, DASHBOARD_CARDS, RETURN_BOOK, STUDENT_OPEN_REQUEST, STUDENTS_WITH_BORROWED } from "../constants/queryKeys";

const AssignTable = () => {
  const columnHeading = [
    "Photo",
    "Name",
    "Book ID",
    "Photo",
    "Name",
    "Student ID",
    "Status",
  ];
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>();
  const { data, isLoading } = assignService.useGetAll<Request[]>(
    [ASSIGN_BOOK, page, search],
    { params: { page: page, search: search, sortByAssign: true } }
  );
  const { mutate } = assignService.useUpdate(
    [
      ASSIGN_BOOK,
      RETURN_BOOK,
      BORROWED_BOOK,
      STUDENTS_WITH_BORROWED,
      STUDENT_OPEN_REQUEST,
      DASHBOARD_CARDS,
    ],
    "Oppration Successfull"
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleChange = (page: number) => {
    setPage(page);
  };

  const previousNext = (PN: string) => {
    let newPage = PN === "p" ? page - 1 : page + 1;
    setPage(newPage);
  };

  const handleAsign = (id: string) => {
    mutate([`${id}`, null]);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Table
        search="Borrows"
        thead={columnHeading}
        handleSearching={handleSearch}
      >
        <tbody>
          {data?.result?.map((el, ind) => (
            <tr key={ind} className="border border-collapse gap-2 td-padding">
              <td className="m-3">
                <img
                  className="size-10 object-cover"
                  src={el.book.imageURL}
                  alt=""
                />
              </td>
              <td>
                <p>{el.book.name}</p>
                <p>{el.book.autherName}</p>
              </td>
              <td>{el.book.bookId}</td>
              <td>
                <div className="size-[4rem]">
                  <Image imageURL={el.user.imageURL} name={el.user.name} />
                </div>
              </td>
              <td>{el.user.name}</td>
              <td>{el.user.studentId}</td>
              <td className="text-center">
                <Badge condition={el.isAssigned}>
                  {["Assigned", "Pending"]}
                </Badge>
              </td>
              <td>
                <TableBotton
                  condition={el.isAssigned}
                  handleFunction={handleAsign}
                  id={el._id}
                >
                  {el.isAssigned ? "Assigned" : "Assign"}
                </TableBotton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-center">
        <Pagination
          handleChange={handleChange}
          previousNext={previousNext}
          currentPage={data?.pagination?.currentPage}
          totalPage={data?.pagination?.totalPages}
        />
      </div>
    </>
  );
};

export default AssignTable;
