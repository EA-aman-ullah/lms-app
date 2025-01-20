import Table from "../components/Table";
import { TbListDetails } from "react-icons/tb";
import { MdAttachEmail } from "react-icons/md";
import React, { useState } from "react";
import studentWithBorrowd from "../services/studentWithBorrowd-service";
import Image from "../components/Image";
import { Student } from "../entites/User";
import Badge from "../components/Badge";
import Pagination from "../components/pagination";
import { STUDENTS_WITH_BORROWED } from "../constants/queryKeys";

const StudentsPage = () => {
  const Theadings = [
    "Photo",
    "Name",
    "Phone",
    "Email",
    "Student ID",
    "Books",
    "Overdue Books",
  ];

  const [rowId, setRowId] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>();

  const { data } = studentWithBorrowd.useGetAll<Student[]>(
    [STUDENTS_WITH_BORROWED, page, search],
    { params: { page: page, search: search } }
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

  const handleSelectedRow = (id: string) => {
    if (rowId === id) setRowId("");
    else setRowId(id);
  };

  return (
    <>
      <Table thead={Theadings} search="Students" handleSearching={handleSearch}>
        <tbody>
          {data?.result?.map((el, ind) => (
            <React.Fragment key={ind}>
              <tr
                key={ind}
                className="border border-b-0 td-padding border-collapse "
              >
                <td>
                  <div className="size-[4rem]">
                    <Image imageURL={el.imageURL} name={el.name} />
                  </div>
                </td>
                <td>{el.name}</td>
                <td>{el.phone}</td>
                <td>{el.email}</td>
                <td>{el.studentId}</td>
                <td>{el.returnableBooks}</td>
                <td>{el.overdueBooks.length}</td>
                <td className="flex justify-end">
                  <div
                    onClick={() => handleSelectedRow(el.studentId)}
                    className="flex w-fit  items-center gap-[1rem] text-white text-[1.4rem] px-[1.7rem] py-[1rem] bg-primary rounded-xl  cursor-pointer"
                  >
                    <TbListDetails size={20} />
                    <span className="hidden lg:block">See Details</span>
                  </div>
                </td>
              </tr>
              <tr className="">
                <td colSpan={8} className={rowId !== el.studentId ? "h-0" : ""}>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden max-h-0 ${
                      rowId === el.studentId
                        ? "max-h-[50rem]  py-[2rem] shadow-inner "
                        : ""
                    }`}
                  >
                    <div className="text-[2rem] pl-[2rem] text-headings font-bold pb-[1rem]">
                      Books Details
                    </div>

                    <table className="w-full">
                      <tbody>
                        {el.borrows.map((element, index) => (
                          <tr
                            key={index}
                            className="border td-padding border-collapse "
                          >
                            <td>
                              <div className="size-[4rem]">
                                <Image
                                  imageURL={element.imageURL}
                                  name={element.name}
                                />
                              </div>
                            </td>
                            <td>{element.name}</td>
                            <td>{element.autherName}</td>
                            <td>{element.bookId}</td>
                            <td>
                              {new Date(
                                element.dateBorrow
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(
                                element.dateReturn
                              ).toLocaleDateString()}
                            </td>
                            <td>
                              <Badge
                                condition={
                                  new Date(element.dateReturn).getTime() <
                                  Date.now()
                                    ? false
                                    : true
                                }
                              >
                                {[
                                  `${Math.ceil(
                                    new Date(
                                      new Date(element.dateReturn).getTime() -
                                        Date.now()
                                    ).getTime() / 86400000
                                  )} days remaining`,
                                  `${Math.ceil(
                                    new Date(
                                      Date.now() -
                                        new Date(element.dateReturn).getTime()
                                    ).getDate() / 86400000
                                  )} Days Late`,
                                ]}
                              </Badge>
                            </td>
                            <td className="flex justify-end ">
                              <div className="flex w-fit  items-center gap-[1rem] text-white text-[1.4rem] px-[1.7rem] py-[1rem] bg-primary rounded-xl  cursor-pointer">
                                <MdAttachEmail size={20} />
                                <span className="hidden lg:block">
                                  Send Reminder
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </React.Fragment>
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

export default StudentsPage;
