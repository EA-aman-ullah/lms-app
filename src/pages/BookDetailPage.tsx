import { useNavigate, useParams } from "react-router-dom";
import useBook from "../hooks/useBook";
import { GrFormView } from "react-icons/gr";
import userOpenRequestService from "../services/userOpenRequest-service";
import BookRequest from "../components/BookRequest";
import { Request } from "../entites/Request";
import { STUDENT_OPEN_REQUESTS } from "../constants/queryKeys";
import { useEffect } from "react";
import socket from "../services/socket";
import { useQueryClient } from "@tanstack/react-query";

const BookDetailPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, currentUser } = useBook(id as string);
  const { data: requestData, isFetching } = userOpenRequestService.useGetById<
    Request[]
  >([STUDENT_OPEN_REQUESTS], currentUser?._id);

  let disabled = requestData?.some((el) => {
    return el.book === (id as any);
  });

  useEffect(() => {
    const handleReturnd = (data: any) => {
      if (data)
        queryClient.invalidateQueries({
          queryKey: [STUDENT_OPEN_REQUESTS],
        });
    };

    socket.on("returned", handleReturnd);
    socket.on("request", handleReturnd);

    return () => {
      socket.off("returned", handleReturnd);
      socket.off("request", handleReturnd);
    };
  }, []);

  return (
    <div className=" min-h-[100vh] pt-[14rem] md:pt-[10rem] relative">
      <div className="flex flex-col  sm:flex-row md:justify-center px-[7%] sm:gap-[3rem] md:gap-[7rem] relative z-10">
        <div className="mx-auto sm:mx-0 w-full sm:w-[50%] md:w-[30rem] h-[50rem]   sm:h-[35rem] md:h-[45rem] overflow-hidden shadow-2xl  ">
          <img className="w-full h-full" src={data?.imageURL} alt="" />
        </div>
        <div className="mx-auto sm:mx-0 w-full sm:w-[50%]  md:w-[37rem] lg:w-[45rem] h-fit   sm:h-[35rem] md:h-[45rem] pt-[4rem] ">
          <h1 className="font-bold text-[3rem]  sm:text-[2.5rem] md:text-[4rem] lg:text-[5rem] text-headings">
            {data?.name}
          </h1>

          <h2 className="text-headings text-[1.8rem] sm:text-[1.6rem] md:text-[2rem]  lg:text-[2.3rem] pt-[1.8rem]">
            {data?.autherName}
          </h2>
          <div className="flex gap-[1rem] pt-[1rem] text-headings text-[1.3rem]">
            <p>LANGUAGE:</p>
            <p className="bg-secondary rounded-full text-white px-[1rem] py-[.1rem]">
              {data?.language}
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-[50vh] pb-[4rem] bg-white w-[calc(100%-10%)] mx-auto sm:relative top-[-8rem] ">
        <div className="mt-[3rem] sm:mt-0 sm:ml-[55%] md:ml-[48%] mx-[2rem] p-[1rem] border-b-4  sm:min-h-[8rem] flex gap-[1rem] md:gap-[5rem] flex-wrap items-center relative z-20">
          <div
            className={`text-white text-[1.6rem] bg-hoverSecondary rounded-full text-nowrap flex items-center gap-[.8rem] ${
              !disabled && "hover:bg-secondary"
            }`}
          >
            <BookRequest
              isFetching={isFetching}
              userOpenRequest={requestData}
              bookId={id as string}
            />
          </div>
          {disabled && (
            <div
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-[.5rem] bg-hoverSecondary hover:bg-secondary px-[1rem] py-[0.5rem] rounded-full text-white text-[1.6rem] cursor-pointer text-nowrap"
            >
              <GrFormView size={20} />
              <span> view Detail</span>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-[2rem] flex-col-reverse md:flex-row mt-[4rem] sm:mt-[8rem] ">
          <div className="w-full md:max-w-[50rem]">
            <div className="px-[5%]">
              <h2 className="text-[4rem] text-secondary ">Description</h2>
              <p className="text-[1.6rem]">{data?.description}</p>
            </div>
          </div>
          <div className="w-full  md:max-w-[50rem] md:pt-[2rem]">
            <div className="px-[5%] md:px-[20%] flex flex-col gap-[3rem]">
              <div>
                <h2 className="text-[2rem] text-secondary font-bold">
                  BOOK ID
                </h2>
                <p className="text-[1.6rem] mt-[2rem]">{data?.bookId}</p>
              </div>
              <div>
                <h2 className="text-[2rem] text-secondary font-bold">
                  LOCATION
                </h2>
                <p className="text-[1.6rem] mt-[2rem]">
                  The Location of Book In Library is
                  <span className="text-primary text-nowrap pl-[1rem]">
                    {data?.location}
                  </span>
                </p>
              </div>
              <div>
                <h2 className="text-[2rem] text-secondary font-bold">
                  CURRENT READERS
                </h2>
                <p className="text-[1.6rem] mt-[2rem]">
                  Number of Current Reader of this book
                  <span className="text-primary pl-[1rem]">
                    {data?.returnableBooks}
                  </span>
                </p>
              </div>
              <div>
                <h2 className="text-[2rem] text-secondary font-bold">NOTE</h2>
                <p className="text-[1.6rem] mt-[2rem]">
                  If You Borrow This Book You Would Have To Ruturn The book With
                  In
                  <span className="text-primary pl-[1rem]">30 DAYS</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
