import { useParams } from "react-router-dom";
import useBook from "../hooks/useBook";

const BookDetailPage = () => {
  const { id } = useParams();
  const { data, currentUser, navigate, handleRequest } = useBook(id as string);

  return (
    <>
      <div className=" p-5 flex flex-col md:flex-row items-center">
        <div className="w-[300px] h-[85vh] rounded-lg overflow-hidden border ">
          <img
            className="w-full h-full shadow-xl"
            src={data?.imageURL}
            alt=""
          />
        </div>
        <div className=" w-[300px] md:w-1/2  p-5 flex flex-col gap-5">
          <h1 className="font-bold text-xl">Book Details</h1>

          <div>
            <span>Name: </span>
            {data?.name}
          </div>
          <div>
            <span>Auther Name: </span>
            {data?.autherName}
          </div>
          <div>
            <span>Location: </span>
            {data?.location}
          </div>

          <div>
            <span>Book ID: </span>
            {data?.bookId}
          </div>
          {currentUser && !data?.isLegible && (
            <p>
              The Request has been Submitted. You can get book After aprovel
              <span
                onClick={() => navigate("/dashboard")}
                className="bg-slate-200 hover:bg-slate-300 p-1 rounded-xl text-[#3c44d4] cursor-pointer text-nowrap"
              >
                view Detail
              </span>
            </p>
          )}
          <button
            onClick={handleRequest}
            disabled={currentUser ? (data?.isLegible ? false : true) : false}
            className={
              currentUser
                ? data?.isLegible
                  ? "bg-[#636AE8] text-[#fff] rounded px-5 py-2 text-nowrap w-[130px]"
                  : "bg-[#9b9ed2] text-[#fff] rounded px-5 py-2 text-nowrap w-[130px]"
                : "bg-[#636AE8] text-[#fff] rounded px-5 py-2 text-nowrap w-[130px]"
            }
          >
            Send Request
          </button>
        </div>
      </div>
    </>
  );
};

export default BookDetailPage;
