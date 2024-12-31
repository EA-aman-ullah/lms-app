import React from "react";
import Badge from "./Badge";

interface CurrentUser {
  _id: string;
  name: string;
  role: string;
}

const withPermission = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") as string
    ) as CurrentUser;

    if (currentUser?.role === "admin" || currentUser?.role === "librarian") {
      return <WrappedComponent {...props} />;
    }
  };
};

export default withPermission;
