import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import book from "../services/book-service";
import BookRequest from "../components/BookRequest";
import { MdOutlineLanguage } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import userOpenRequestService from "../services/userOpenRequest-service";
import CurrentUser from "../entites/CurrentUser";
import { Request } from "../entites/Request";
import { Book } from "../entites/Books";
import { BOOKS, STUDENT_OPEN_REQUEST } from "../constants/queryKeys";

const BooksPage = () => {
  const bookQuery = useSelector((state: RootState) => state.bookQuery);
  const { data, isLoading, fetchNextPage, hasNextPage } =
    book.useGetAllWithPagination<Book[]>([BOOKS, bookQuery], {
      params: { search: bookQuery.search, onlyAvailable: true },
    });

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as CurrentUser;

  const { data: requestData } = userOpenRequestService.useGetById<Request[]>(
    [STUDENT_OPEN_REQUEST],
    currentUser?._id
  );

  const fetchedBooksCount =
    data?.pages.reduce((total, page) => total + page.result?.length, 0) || 0;

  if (isLoading)
    return (
      <div className=" w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );

  console.log();

  return (
    <InfiniteScroll
      dataLength={fetchedBooksCount}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={
        <div>
          <Loader />;
        </div>
      }
    >
      <div className="flex gap-10 flex-wrap justify-center max-w-[132rem] min-h-[100vh] mx-auto py-[14rem] md:py-[8rem]">
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.result?.map((el) => (
              <div
                key={el._id}
                className=" basis-[25rem] h-fit flex flex-col  justify-between bg-card   transition-all shadow-2xl overflow-hidden "
              >
                <div className="px-[8rem] py-[3rem] h-[20rem] bg-card">
                  <Link to={`/books/${el._id}`}>
                    <img
                      className="w-full h-full  transition-transform duration-300 transform hover:scale-105"
                      src={el.imageURL}
                      alt={el.name}
                    />
                  </Link>
                </div>
                <div className="flex flex-col justify-between gap-[1rem] px-[1rem] pt-[3rem] pb-[1rem] bg-white">
                  <div className="bg-card text-[1.8rem] text-green-700  w-fit  font-semibold hover:bg-hoverPrimar focus:outline-none ">
                    <BookRequest
                      userOpenRequest={requestData}
                      bookId={el._id}
                    />
                  </div>

                  <h1 className="text-2xl font-semibold text-primary">
                    <span className="font-bold text-[#76515a]">{el.name}</span>
                  </h1>
                  <p className="text-[1.3rem] text-headings italic">
                    By: {el.autherName}
                  </p>
                  <div className="text-[1.3rem] text-headings flex items-center gap-[1rem] ">
                    <MdOutlineLanguage /> {el.language}
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default BooksPage;
