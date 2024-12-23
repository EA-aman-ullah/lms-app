import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Books from "../pages/Books";
import Users from "../pages/Users";
import Borrows from "../pages/Borrows";
import Dashboard from "../pages/dashboard";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home";
import BookDetailPage from "../pages/BookDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
      { path: "/books", element: <Books /> },
      { path: "/books/:id", element: <BookDetailPage /> },
      { path: "/borrows", element: <Borrows /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    element: <PrivateRoute />,
    children: [
      { path: "/Students", element: <Users /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

export default router;
