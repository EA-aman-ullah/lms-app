interface Props {
  imageURL: string;
  name: string;
}

const Image = ({ imageURL, name }: Props) => {
  if (imageURL) return <img src={imageURL} alt="" />;
  if (!imageURL)
    return (
      <div className="border rounded-full size-[4rem] p-[.9rem] mx-auto bg-secondary text-white">
        {name[0]}
      </div>
    );
};

export default Image;
