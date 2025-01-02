import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Borrows from "../pages/Borrows";
import Dashboard from "../pages/dashboard";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import Books from "../pages/Books";
import BookDetailPage from "../pages/BookDetailPage";
import Profile from "../pages/Profile";
import Requests from "../pages/Requests";
import Otp from "../auth/Otp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/books" replace /> },
      { path: "/books", element: <Books /> },
      { path: "/books/:id", element: <BookDetailPage /> },
      { path: "/requests", element: <Requests /> },
      { path: "/borrows", element: <Borrows /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signup/:id", element: <Otp /> },
  {
    element: <PrivateRoute />,
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

export default router;
