interface Props {
  imageURL: string;
  name: string;
}

const Image = ({ imageURL, name }: Props) => {
  if (imageURL)
    return <img src={imageURL} alt="" className="w-full h-full object-cover" />;
  if (!imageURL)
    return (
      <div className="border flex justify-center items-center rounded-full h-full w-full p-[.9rem] mx-auto bg-secondary text-white">
        {name[0]}
      </div>
    );
};

export default Image;
