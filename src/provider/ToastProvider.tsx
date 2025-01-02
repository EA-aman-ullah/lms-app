import React, { createContext, useCallback, ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";

type ToastPromiseMessages = {
  pending: string;
  success?: string;
  error?: string;
};

export type ToastContextType = {
  showToast: (type: "success" | "error" | "info", message: string) => void;
  toastPromise: <T>(
    promise: Promise<T>,
    messages: ToastPromiseMessages
  ) => Promise<T>;
};

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const showToast = useCallback(
    (type: "success" | "error" | "info", message: string) => {
      if (type === "success") {
        toast.success(message, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      } else if (type === "error") {
        toast.error(message, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      } else {
        toast.info(message, {
          position: "top-right",
          theme: "colored",
          autoClose: 3000,
        });
      }
    },
    []
  );

  const toastPromise = useCallback(
    async <T,>(
      promise: Promise<T>,
      messages: ToastPromiseMessages
    ): Promise<T> => {
      const hasSuccessMessage = Boolean(messages.success);
      const hasErrorMessage = Boolean(messages.error);

      if (hasSuccessMessage || hasErrorMessage) {
        return await toast.promise(
          promise,
          {
            pending: messages.pending,
            success: hasSuccessMessage ? messages.success : undefined,
            error: hasErrorMessage ? messages.error : undefined,
          },
          { position: "top-right", theme: "colored", autoClose: 3000 }
        );
      } else {
        return promise;
      }
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast, toastPromise }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};
