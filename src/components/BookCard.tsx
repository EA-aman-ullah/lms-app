import { Link } from "react-router-dom";
import Loader from "./Loader";
import book from "../services/book-service";
import Book from "../entites/Books";

const BookCard = () => {
  const { data, isLoading } = book.useGetAll<Book[]>(["books"]);

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.map((el) => (
        <div
          key={el._id}
          className=" basis-[300px] flex-1  flex gap-4 border-2 border-[#E6E6E6] rounded-lg shadow-md p-4 transition-all hover:shadow-xl hover:scale-105"
        >
          <div className="w-[120px] flex-shrink-0 h-[100%] overflow-hidden rounded-lg">
            <img
              className="w-full h-full   transition-transform duration-300 transform hover:scale-110"
              src={el.imageURL}
              alt={el.name}
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <h1 className="text-2xl font-semibold text-[#636AE8]">
              Name: <span className="font-bold text-[#333]">{el.name}</span>
            </h1>
            <p className="text-lg text-[#555]">
              Author:{" "}
              <span className="font-bold text-[#636AE8]">{el.autherName}</span>
            </p>
            <Link
              to={`/books/${el._id}`}
              className="bg-[#636AE8] text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-[#4C52D7] focus:outline-none transition-all"
            >
              See Details
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookCard;