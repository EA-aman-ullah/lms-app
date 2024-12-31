import withPermission from "./withPermission";
import { FiCheckCircle } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { GoQuestion } from "react-icons/go";

interface Props {
  handleFunction: (id: string) => void;
  id: string;
  children: string;
  condition: boolean;
}

const Botton = ({ handleFunction, id, children, condition }: Props) => {
  return (
    <button
      onClick={() => handleFunction(id)}
      disabled={condition}
      className={`${
        condition ? "bg-pending" : "bg-primary hover:bg-hoverPrimary"
      }   mx-auto flex items-center gap-[1rem] text-[1.2rem] text-white py-[1rem] font-[700] px-[1.5rem] rounded-md shadow-md  focus:outline-none`}
    >
      {condition ? (
        children === "Decline" ? (
          <RxCross2 size={15} />
        ) : (
          <FiCheckCircle size={15} />
        )
      ) : (
        <GoQuestion size={20} />
      )}
      {children}
    </button>
  );
};

export default withPermission(Botton);
