import Table from "../components/Table";
import { TbListDetails } from "react-icons/tb";
import React, { useState } from "react";
import studentWithBorrowd from "../services/studentWithBorrowd-service";
import Image from "../components/Image";

const StudentsPage = () => {
  const { data } = studentWithBorrowd.useGetAll(["studentsWithBorrowed"]);
  const [rowId, setRowId] = useState("");

  const Theadings = [
    "Photo",
    "Name",
    "Phone",
    "Email",
    "Student ID",
    "Books",
    "Overdue Books",
  ];

  const handleSelectedRow = (id: string) => {
    if (rowId === id) setRowId("");
    else setRowId(id);
  };

  console.log(data);

  return (
    <Table heading="Studnts" thead={Theadings}>
      <tbody>
        {data?.map((el, ind) => (
          <React.Fragment key={ind}>
            {el.studentId === rowId ? (
              <>
                <tr key={ind} className="border td-padding border-collapse ">
                  <td>
                    <Image imageURL={el.imageURL} name={el.name} />
                  </td>
                  <td>{el.name}</td>
                  <td>{el.phone}</td>
                  <td>{el.email}</td>
                  <td>{el.studentId}</td>
                  <td>{el.returnableBooks}</td>
                  <td>{el.lastBorrowdReturnDate}</td>
                  <td>{el.OverDyeBorrowed}</td>
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
                <tr>
                  <td colSpan={7} className="px-[2rem] py-[4rem] shadow-inner">
                    <div className="text-[2rem] text-headings font-bold pb-[1rem]">
                      Books Details
                    </div>

                    <table className="w-full">
                      <tbody>
                        {data.map((element, index) => (
                          <tr
                            key={index}
                            className="border td-padding border-collapse "
                          >
                            <td>
                              {" "}
                              <Image imageURL={el.imageURL} name={el.name} />
                            </td>
                            <td>{element.name}</td>
                            <td>{element.studentId}</td>
                            <td>{element.BorrowedBooks}</td>
                            <td>{element.lastBorrowdReturnDate}</td>
                            <td>{element.OverDyeBorrowed}</td>
                            <td className="flex justify-end ">
                              <div
                                onClick={() => handleSelectedRow(el.studentId)}
                                className="flex w-fit  items-center gap-[1rem] text-white text-[1.4rem] px-[1.7rem] py-[1rem] bg-primary rounded-xl  cursor-pointer"
                              >
                                <TbListDetails size={20} />
                                <span className="hidden lg:block">
                                  Send Reminder
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </>
            ) : (
              <tr key={ind} className="border td-padding border-collapse ">
                <td>
                  {" "}
                  <Image imageURL={el.imageURL} name={el.name} />
                </td>
                <td>{el.name}</td>
                <td>{el.phone}</td>
                <td>{el.email}</td>
                <td>{el.studentId}</td>
                <td>{el.returnableBooks}</td>

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
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentsPage;
