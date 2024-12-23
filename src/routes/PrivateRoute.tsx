import { Navigate } from "react-router-dom";
import Layout from "./Layout";

const PrivateRoute = () => {
  const token = localStorage.getItem("auth-token");
  if (!token) return <Navigate to={"/login"} />;
  return <Layout />;
};

export default PrivateRoute;
