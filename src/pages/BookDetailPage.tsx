import { useNavigate, useParams } from "react-router-dom";
import book from "../services/book-service";
import { ToastContainer } from "react-toastify";
import request from "../services/request-service";
import Book from "../entites/Books";

const BookDetailPage = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  const navigate = useNavigate();
  const { data } = book.useGetById<Book>(["book", `${id}`], id as string, {
    params: { studentId: currentUser?._id },
  });
  const { mutate } = request.usePost(
    ["overviewCard", "requests", "book", `${id}`],
    "Resquest Submitted."
  );

  const handleRequest = () => {
    if (currentUser) {
      mutate({ bookId: id as string });
    } else {
      navigate("/login");
    }
  };

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
            disabled={currentUser ? (!data?.isLegible ? true : false) : false}
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
