import { configureStore } from "@reduxjs/toolkit";
import bookQueryReducer from "../features/bookSearchSlice";

const store = configureStore({
  reducer: {
    bookQuery: bookQueryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
