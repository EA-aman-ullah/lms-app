import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setSearch } from "../features/bookSearchSlice";
import debounce from "../utils/debounce";

const BookSearch = () => {
  const dispatch = useDispatch();
  const handleSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch({ search: event.target.value }));
  };
  const debounceSearch = debounce(handleSearching);

  return (
    <div className="relative">
      <label htmlFor="bookSearch" className="cursor-text">
        <FaSearch
          size={20}
          className="absolute top-1/2 left-[1rem] -translate-y-1/2  text-headings"
        />
      </label>

      <input
        onChange={debounceSearch}
        id="bookSearch"
        type="text"
        name="search"
        placeholder="Search Book..."
        className="focus:outline-dotted sm:w-[41rem] pl-[4rem] text-[1.8rem] text-headings rounded-full py-[.5rem] px-[1rem] border-2 border-headings shadow-md bg-transparent placeholder-headings"
      />
    </div>
  );
};

export default BookSearch;
