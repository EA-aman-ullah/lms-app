import withPermission from "./withPermission";
import { FiCheckCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";
import Loader from "./Loader";
import { useState } from "react";

interface Props {
  handleFunction: (id: string) => void;
  id: string;
  children: string;
  condition: boolean;
  isFetching: boolean;

  isDisabled?: boolean;
}

const TableBotton = ({
  handleFunction,
  id,
  children,
  isFetching,
  condition,
  isDisabled,
}: Props) => {
  const [buttonId, setButtonId] = useState<string>();

  let disabling = buttonId === id && isFetching ? true : false;

  const handleClick = (id: string) => {
    setButtonId(id);
    handleFunction(id);
  };

  return (
    <button
      onClick={() => handleClick(id)}
      disabled={isDisabled || condition || disabling}
      className={`${
        condition ? "bg-pending" : "bg-primary hover:bg-hoverPrimary"
      }   mx-auto flex items-center gap-[1rem] text-[1.2rem] text-white py-[1rem] font-[700] px-[1.5rem] rounded-md shadow-md  focus:outline-none`}
    >
      {disabling ? (
        <Loader />
      ) : condition ? (
        children === "Decline" ? (
          <RxCross2 size={15} />
        ) : (
          <FiCheckCircle size={15} />
        )
      ) : (
        <GoQuestion size={20} />
      )}
      {disabling ? "Loading" : children}
    </button>
  );
};

export default withPermission(TableBotton);
