import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Borrows from "../pages/Borrows";
import Dashboard from "../pages/dashboard";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import BookDetailPage from "../pages/BookDetailPage";
import ProfilePage from "../pages/ProfilePage";
import Requests from "../pages/Requests";
import Otp from "../auth/Otp";
import SetPassword from "../auth/SetPassword";
import ForgetPassword from "../auth/ForgetPassword";
import Books from "../pages/BooksPage";
import StudentsPage from "../pages/StudentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Books /> },
      { path: "/books/:id", element: <BookDetailPage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/forget-password", element: <ForgetPassword /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/otp/:id", element: <Otp /> },

  {
    element: <PrivateRoute />,
    children: [
      { path: "/profile", element: <ProfilePage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/requests", element: <Requests /> },
      { path: "/borrows", element: <Borrows /> },
      { path: "/students", element: <StudentsPage /> },
      { path: "/set-password/:id", element: <SetPassword /> },
    ],
  },
]);

export default router;
