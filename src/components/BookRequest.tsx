import { MdArrowOutward } from "react-icons/md";
import { Request } from "../entites/Request";
import useRequest from "../hooks/useRequest";
import Loader from "./Loader";
import { useEffect, useState } from "react";

interface Props {
  bookId: string;
  isFetching: boolean;
  userOpenRequest: Request[] | undefined;
}
const BookRequest = ({ bookId, userOpenRequest, isFetching }: Props) => {
  const { handleRequest } = useRequest(bookId);
  let disabled = userOpenRequest?.some((el) => {
    return el.book === (bookId as any);
  });
  const [buttonId, setButtonId] = useState<string>();

  let islimitExceeded = false;

  if (userOpenRequest) {
    islimitExceeded = userOpenRequest.length >= 5 ? true : false;
  }

  let disabling = bookId === buttonId && isFetching ? true : false;

  const handleClick = (id: string) => {
    setButtonId(id);
    handleRequest();
  };

  useEffect(() => {
    if (isFetching === false) setButtonId("");
  }, [isFetching]);

  return (
    <button
      onClick={() => handleClick(bookId)}
      disabled={disabled || islimitExceeded || disabling}
      className="py-[0.5rem] px-[1rem] flex items-center gap-[1rem]"
      title={
        disabled
          ? "Request for this book already submitted"
          : islimitExceeded
          ? "You can send only 5 book's request at time"
          : ""
      }
    >
      {disabling ? (
        <Loader />
      ) : (
        !disabled && !islimitExceeded && <MdArrowOutward size={20} />
      )}
      {disabling
        ? "Loading"
        : disabled
        ? "Requested"
        : islimitExceeded
        ? "Limit Exceeded"
        : "Send Request"}
    </button>
  );
};

export default BookRequest;
