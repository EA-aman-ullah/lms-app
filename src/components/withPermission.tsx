import React from "react";

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

    const isDisabled = !(
      currentUser?.role === "admin" || currentUser?.role === "librarian"
    );

    return <WrappedComponent {...props} isDisabled={isDisabled} />;
  };
};

export default withPermission;
