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
import SetPassword from "../auth/SetPassword";
import ForgetPassword from "../auth/ForgetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/books" replace /> },
      { path: "/requests", element: <Requests /> },
      { path: "/borrows", element: <Borrows /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/otp/:id", element: <Otp /> },
  { path: "/books", element: <Books /> },
  { path: "/books/:id", element: <BookDetailPage /> },

  {
    element: <PrivateRoute />,
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/set-password/:id", element: <SetPassword /> },
    ],
  },
]);

export default router;
