interface Props {
  condition: boolean;
  children: string[];
}
const Badge = ({ children, condition }: Props) => {
  return (
    <div
      className={`inline-block text-[1rem] w-[6rem] text-center rounded-xl p-2 font-[600]  text-[#fff] ${
        condition ? "bg-[#55ae59]" : "bg-[#dc2265]"
      } `}
    >
      {condition ? children[0] : children[1]}
    </div>
  );
};

export default Badge;
