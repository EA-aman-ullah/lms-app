import { useDispatch } from "react-redux";
import { setSearch } from "../features/bookSearchSlice";
import { useNavigate } from "react-router-dom";
import Search from "./Search";

const BookSearch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
    navigate("/books");
    dispatch(setSearch({ search: event.target.value }));
  };

  return <Search search="book" handleSearching={handleSearching} />;
};

export default BookSearch;
