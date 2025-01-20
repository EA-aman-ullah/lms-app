import { FaSearch } from "react-icons/fa";
import debounce from "../utils/debounce";

interface Props {
  search: string;
  handleSearching: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ handleSearching, search }: Props) => {
  const debounceSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounce(handleSearching)(event);
  };

  return (
    <div className="relative w-full">
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
        placeholder={`Search ${search}...`}
        className="focus:outline-dotted w-[20rem] sm:w-[41rem] pl-[4rem] text-[1.8rem] text-headings rounded-full py-[.5rem] px-[1rem] border-2 border-headings shadow-md bg-transparent placeholder-headings"
      />
    </div>
  );
};

export default Search;
