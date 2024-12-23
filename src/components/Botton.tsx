import withPermission from "./withPermission";

interface Props {
  handleFunction: (id: string) => void;
  id: string;
  children: string;
}

const Botton = ({ handleFunction, id, children }: Props) => {
  return (
    <button
      onClick={() => handleFunction(id)}
      className="bg-[#636AE8] text-white p-[6px] rounded-lg"
    >
      {children}
    </button>
  );
};

export default withPermission(Botton);
