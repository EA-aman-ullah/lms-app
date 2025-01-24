import { Request } from "../entites/Request";
import Badge from "./Badge";
import TableBotton from "./TableBotton";
import Image from "./Image";
import Loader from "./Loader";
import Table from "./Table";
import { useState } from "react";
import Pagination from "./pagination";
import returnService from "../services/return-service";
import {
  BORROWED_BOOKS,
  DASHBOARD_CARDS,
  REQUESTS_RETURNABLE,
  STUDENT_OPEN_REQUESTS,
  STUDENTS_WITH_BORROWED,
} from "../constants/queryKeys";
import useToast from "../hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import socket from "../services/socket";

const ReturnTable = () => {
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
  const { data, isLoading, isFetching } = returnService.useGetAll<Request[]>(
    [REQUESTS_RETURNABLE, page, search],
    { params: { page: page, search: search, sortByAssign: true } }
  );
  const [isButtonFetching, setButtonFetching] = useState(isFetching);

  // const { mutate } = returnService.useUpdate(
  //   [
  //     REQUESTS_RETURNABLE,
  //     BORROWED_BOOKS,
  //     STUDENTS_WITH_BORROWED,
  //     STUDENT_OPEN_REQUESTS,
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

  const handleReturn = (id: string) => {
    setButtonFetching(true);
    // mutate([id, null]);
    socket.emit("return", { requestId: id }, (response: any) => {
      if (response.success) {
        [
          REQUESTS_RETURNABLE,
          BORROWED_BOOKS,
          STUDENTS_WITH_BORROWED,
          STUDENT_OPEN_REQUESTS,
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
                <Badge condition={el.isReturned}>
                  {["Returned", "Pending"]}
                </Badge>
              </td>
              <td>
                <TableBotton
                  isFetching={isButtonFetching}
                  condition={el.isReturned}
                  handleFunction={handleReturn}
                  id={el._id}
                >
                  {el.isReturned ? "Returned" : "Return"}
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

export default ReturnTable;
