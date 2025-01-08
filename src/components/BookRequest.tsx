import useRequest from "../hooks/useRequest";

interface Props {
  bookId: string;
}
const BookRequest = ({ bookId }: Props) => {
  const { handleRequest } = useRequest(bookId);
  return (
    <button
      onClick={handleRequest}
      className="bg-card text-[1.8rem] text-green-700 py-[0.5rem] px-[2rem]  w-fit  font-semibold hover:bg-hoverPrimar focus:outline-none "
    >
      Send Request
    </button>
  );
};

export default BookRequest;
