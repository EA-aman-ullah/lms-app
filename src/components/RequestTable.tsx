import TableBotton from "./TableBotton";
import { Request } from "../entites/Request";
import Table from "./Table";
import Loader from "./Loader";
import Image from "./Image";
import Badge from "./Badge";
import { useState } from "react";
import Pagination from "./pagination";
import approveService from "../services/approve-service";
import {
  REQUESTS_APPROVEABLE,
  REQUESTS_ASSIGNABLE,
  DASHBOARD_CARDS,
} from "../constants/queryKeys";
import socket from "../services/socket";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../hooks/useToast";
// type RequestId = Request["_id"];

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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>();
  const { showToast } = useToast();

  const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = approveService.useGetAll<Request[]>(
    [REQUESTS_APPROVEABLE, page, search],
    {
      params: { page: page, search: search },
    }
  );
  const [isButtonFetching, setButtonFetching] = useState(isFetching);

  // const { mutate } = approveService.useUpdate<RequestId>([
  //   REQUESTS_APPROVEABLE,
  //   REQUESTS_ASSIGNABLE,
  //   DASHBOARD_CARDS,
  // ]);

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

  const handleApprove = (id: string) => {
    // mutate([id, null]);
    setButtonFetching(true);
    socket.emit("approve", { requestId: id }, (response: any) => {
      if (response.success) {
        [REQUESTS_APPROVEABLE, REQUESTS_ASSIGNABLE, DASHBOARD_CARDS].forEach(
          (el) => {
            queryClient.invalidateQueries({
              queryKey: [el],
            });
          }
        );
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
        thead={columnHeading}
        search="Request"
        handleSearching={handleSearch}
      >
        <tbody>
          {data?.result?.map((el, ind) => (
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
                <div className="size-[4rem]">
                  <Image imageURL={el.user?.imageURL} name={el.user?.name} />
                </div>
              </td>
              <td>{el.user?.name}</td>
              <td>{el.user?.studentId}</td>
              <td>
                <Badge condition={el.isApproved}>
                  {["Approved", "Pending"]}
                </Badge>
              </td>
              <td>
                <TableBotton
                  isFetching={isButtonFetching}
                  condition={el.isApproved}
                  handleFunction={handleApprove}
                  id={el._id}
                >
                  {el.isApproved ? "Approved" : "Approve"}
                </TableBotton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex justify-center mt-[1rem]">
        <Pagination
          handleChange={handleChange}
          previousNext={previousNext}
          currentPage={data?.pagination.currentPage}
          totalPage={data?.pagination.totalPages}
        />
      </div>
    </>
  );
};

export default RequestList;
