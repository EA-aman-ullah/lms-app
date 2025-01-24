import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";
import socket from "../services/socket";
import { useQueryClient } from "@tanstack/react-query";
import useToast from "../hooks/useToast";
import {
  BORROWED_BOOKS,
  DASHBOARD_CARDS,
  REQUESTS_APPROVEABLE,
  REQUESTS_ASSIGNABLE,
  REQUESTS_RETURNABLE,
  STUDENT_OPEN_REQUESTS,
  STUDENTS_WITH_BORROWED,
} from "../constants/queryKeys";
import { notificationSound } from "../utils/debounce";
import Navbar from "../components/Navbar";
import CurrentUser from "../entites/CurrentUser";

const Layout = () => {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") as string
  ) as CurrentUser;
  const location = useLocation();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isExpended, setExpended] = useState(false);

  const handleExpended = () => {
    setExpended(!isExpended);
  };

  useEffect(() => {
    const handleRequest = (data: any) => {
      if (data) {
        [REQUESTS_APPROVEABLE, DASHBOARD_CARDS].forEach((el) => {
          queryClient.invalidateQueries({
            queryKey: [el],
          });
        });
        if (currentUser?._id !== data?.newRequest?.user) {
          showToast("info", data.notification.message);
          notificationSound();
        }
      }
    };
    const handleRefetch = (data: any) => {
      if (data) {
        [
          STUDENTS_WITH_BORROWED,
          STUDENT_OPEN_REQUESTS,
          REQUESTS_APPROVEABLE,
          REQUESTS_ASSIGNABLE,
          REQUESTS_RETURNABLE,
          DASHBOARD_CARDS,
          BORROWED_BOOKS,
        ].forEach((el) => {
          queryClient.invalidateQueries({
            queryKey: [el],
          });
        });

        showToast("info", data.notification.message);
        notificationSound();
      }
    };

    socket.on("approved", handleRefetch);
    socket.on("assigned", handleRefetch);
    socket.on("returned", handleRefetch);
    socket.on("request", handleRequest);

    return () => {
      socket.off("request", handleRequest);
      socket.off("assigned", handleRefetch);
      socket.off("returned", handleRefetch);
      socket.off("approved", handleRefetch);
    };
  }, []);

  if (location.pathname.split("/")[1] === "set-password") return <Outlet />;

  if (
    location.pathname.split("/")[1] === "" ||
    location.pathname.split("/")[1] === "books"
  )
    return (
      <div className="bg-gray-100">
        <Navbar />
        <Outlet />
      </div>
    );

  return (
    <div className="relative p-[1rem] bg-body min-h-[100vh]">
      <Sidebar isExpended={isExpended} handleExpended={handleExpended} />

      <div className="md:ml-[26.6rem]">
        <Navigation isExpended={isExpended} handleExpended={handleExpended} />
        <div className="mt-[8rem]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
