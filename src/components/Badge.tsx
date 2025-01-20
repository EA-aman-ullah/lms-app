interface Props {
  condition: boolean;
  children: string[];
}
const Badge = ({ children, condition }: Props) => {
  return (
    <div
      className={`inline-block text-[1rem]  text-center rounded-xl p-2 font-[600]  text-[#fff] ${
        condition ? "bg-pending" : "bg-accent"
      } `}
    >
      {condition ? children[0] : children[1]}
    </div>
  );
};

export default Badge;
