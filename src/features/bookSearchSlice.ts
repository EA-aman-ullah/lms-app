import { PayloadAction } from "../../node_modules/@reduxjs/toolkit/src/createAction";
import { createSlice } from "@reduxjs/toolkit";

interface bookQuery {
  search: string;
  page: string;
}

const initialState: bookQuery = {} as bookQuery;

const bookSearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<{ search: string }>) => {
      state.search = action.payload.search;
    },
    clearSearch: (state) => {
      state.search = "";
    },
  },
});

export const { setSearch, clearSearch } = bookSearchSlice.actions;
export default bookSearchSlice.reducer;
