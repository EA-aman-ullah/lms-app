import { useNavigate, useParams } from "react-router-dom";
import book from "../services/book-service";
import { ToastContainer } from "react-toastify";
import request from "../services/request-service";
import { useQueryClient } from "@tanstack/react-query";
import Book from "../entites/Books";

const BookDetailPage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = book.useGetById<Book>(["book", `${id}`], id as string);
  const { mutate } = request.usePost(["dbCard"], "Resquest Submitted.");
  let isrequested;

  const currentUser = JSON.parse(localStorage.getItem("currentUser") as string);
  isrequested = data?.requests.find((el) => el.studentId === currentUser?._id);

  const handleRequest = () => {
    queryClient.invalidateQueries({
      queryKey: ["book", `${id}`],
    });
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
          <p>
            The Request has been Submitted. You can get book After aprovel
            <span className="bg-slate-200 hover:bg-slate-300 p-1 rounded-xl text-[#3c44d4] cursor-pointer text-nowrap">
              view Detail
            </span>
          </p>
          <button
            onClick={handleRequest}
            disabled={isrequested ? true : false}
            className={
              isrequested
                ? "bg-[#9b9ed2] text-[#fff] rounded px-5 py-2 text-nowrap w-[130px]"
                : "bg-[#636AE8] text-[#fff] rounded px-5 py-2 text-nowrap"
            }
          >
            Send Request
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default BookDetailPage;
