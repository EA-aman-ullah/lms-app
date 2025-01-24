import { Request } from "../entites/Request";
import Badge from "./Badge";
import TableBotton from "./TableBotton";
import Image from "./Image";
import Loader from "./Loader";
import Table from "./Table";
import { useState } from "react";
import Pagination from "./pagination";
import assignService from "../services/assign-service";
import {
  REQUESTS_ASSIGNABLE,
  BORROWED_BOOKS,
  DASHBOARD_CARDS,
  REQUESTS_RETURNABLE,
  STUDENTS_WITH_BORROWED,
} from "../constants/queryKeys";
import socket from "../services/socket";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../hooks/useToast";

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
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState<string>();
  const { data, isLoading, isFetching } = assignService.useGetAll<Request[]>(
    [REQUESTS_ASSIGNABLE, page, search],
    { params: { page: page, search: search, sortByAssign: true } }
  );
  const [isButtonFetching, setButtonFetching] = useState(isFetching);

  // const { mutate } = assignService.useUpdate(
  //   [
  //     REQUESTS_ASSIGNABLE,
  //     REQUESTS_RETURNABLE,
  //     BORROWED_BOOKS,
  //     STUDENTS_WITH_BORROWED,
  //     DASHBOARD_CARDS,
  //   ],
  //   "Oppration Successfull"
  // );

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
    setButtonFetching(true)
    // mutate([`${id}`, null]);
    socket.emit("assign", { requestId: id }, (response: any) => {
      if (response.success) {
        [
          REQUESTS_ASSIGNABLE,
          REQUESTS_RETURNABLE,
          BORROWED_BOOKS,
          STUDENTS_WITH_BORROWED,
          DASHBOARD_CARDS,
        ].forEach((el) => {
          queryClient.invalidateQueries({
            queryKey: [el],
          });
        });

        showToast("success", response.message);
      } else {
        showToast("error", response.message);
      }
    });
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
                  isFetching={isButtonFetching}
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
