import withPermission from "./withPermission";

interface Props {
  handleApprove: (id: string) => void;
  id: string;
}

const RequestApprove = ({ handleApprove, id }: Props) => {
  return (
    <button
      onClick={() => handleApprove(id)}
      className="bg-[#636AE8] text-white p-[6px] rounded-lg"
    >
      Approve
    </button>
  );
};

export default withPermission(RequestApprove);
