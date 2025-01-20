import { MdArrowOutward } from "react-icons/md";
import { Request } from "../entites/Request";
import useRequest from "../hooks/useRequest";

interface Props {
  bookId: string;
  userOpenRequest: Request[] | undefined;
}
const BookRequest = ({ bookId, userOpenRequest }: Props) => {
  const { handleRequest } = useRequest(bookId);

  let disabled = userOpenRequest?.some((el) => {
    return el.book  === bookId as any;
  });

  let islimitExceeded = false;

  if (userOpenRequest) {
    islimitExceeded = userOpenRequest.length >= 5 ? true : false;
  }

  return (
    <button
      onClick={handleRequest}
      disabled={disabled || islimitExceeded}
      className="py-[0.5rem] px-[1rem] flex items-center gap-[1rem]"
      title={
        disabled
          ? "Request for this book already submitted"
          : islimitExceeded
          ? "You can send only 5 book's request at time"
          : ""
      }
    >
      {!disabled && !islimitExceeded && <MdArrowOutward size={20} />}
      {disabled
        ? "Requested"
        : islimitExceeded
        ? "Limit Exceeded"
        : "Send Request"}
    </button>
  );
};

export default BookRequest;
