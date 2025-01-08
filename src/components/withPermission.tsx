import React from "react";
import CurrentUser from "../entites/CurrentUser";

const withPermission = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") as string
    ) as CurrentUser;

    // const isDisabled = !(
    //   currentUser?.role === "admin" || currentUser?.role === "librarian"
    // );

    if (currentUser?.role === "admin" || currentUser?.role === "librarian")
      return <WrappedComponent {...props} />;
  };
};

export default withPermission;
