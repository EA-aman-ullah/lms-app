import { Request } from "../entites/Request";
import useRequest from "../hooks/useRequest";

interface Props {
  bookId: string;
  userOpenRequest: Request[] | undefined;
}
const BookRequest = ({ bookId, userOpenRequest }: Props) => {
  const { handleRequest } = useRequest(bookId);

  let disabled = userOpenRequest?.some((el) => {
    return el.book._id === bookId;
  });

  let islimitExceeded = false;

  if (userOpenRequest) {
    islimitExceeded = userOpenRequest.length >= 5 ? true : false;
  }

  return (
    <button
      onClick={handleRequest}
      disabled={disabled || islimitExceeded}
      title={
        disabled
          ? "Request for this book already submitted"
          : islimitExceeded
          ? "You can send only 5 book's request at time"
          : ""
      }
      className="bg-card text-[1.8rem] text-green-700 py-[0.5rem] px-[2rem]  w-fit  font-semibold hover:bg-hoverPrimar focus:outline-none "
    >
      {disabled
        ? "Requested"
        : islimitExceeded
        ? "Limit Exceeded"
        : "Send Request"}
    </button>
  );
};

export default BookRequest;
