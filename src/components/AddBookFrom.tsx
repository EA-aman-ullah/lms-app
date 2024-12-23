import { useState } from "react";
import useInputsData from "../hooks/useInputsData";
import book from "../assets/images/book.jpeg";
import { ToastContainer } from "react-toastify";
import bookService from "../services/book-service";

interface Book {
  name: string;
  autherName: string;
  location: string;
  numberInStock: number;
}

interface Props {
  closeModal: () => void;
}

const AddBookFrom = ({ closeModal }: Props) => {
  const { usePost } = bookService;
  const { data, isValid, handleData, setValid } = useInputsData<Book>();
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const { mutate } = usePost(["books", "dbCard"], "Book Successfully Added");

  const formData = new FormData();

  formData.append("image", selectedImage as Blob);
  formData.append("name", data.name);
  formData.append("autherName", data.autherName);
  formData.append("location", data.location);
  formData.append("numberInStock", data.numberInStock as any);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      /^[a-zA-Z _-]{4,}$/.test(data.name) &&
      /^[a-zA-Z _-]{4,}$/.test(data.autherName) &&
      /^[a-zA-Z _-]{4,}$/.test(data.location) &&
      data.numberInStock &&
      selectedImage
    ) {
      mutate(formData);
      setValid(true);
      setTimeout(() => {
        closeModal();
      }, 2200);
    } else {
      setValid(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
          <div className="w-[200px] h-[200px] rounded-lg overflow-hidden mx-auto">
            <img
              className="w-full h-full object-cover"
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage as Blob)
                  : book
              }
              alt="Book Cover"
            />
          </div>
          <label
            htmlFor="image"
            className={`cursor-pointer text-center block p-3 rounded-xl transition-colors duration-300 ${
              !selectedImage && !isValid
                ? "bg-[#F2F2FD] text-[#E8618C] border-2 border-[#E8618C]"
                : "bg-[#F2F2FD] text-[#636AE8] border-2 border-[#636AE8]"
            }`}
          >
            {!selectedImage && !isValid
              ? "Please Upload Image"
              : "Upload Image"}
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => {
              if (e.target.files) setSelectedImage(e.target.files[0]);
            }}
            name="image"
            className="hidden"
          />

          <div className="flex flex-col">
            <label htmlFor="name" className="text-[#636AE8] font-semibold">
              Name
            </label>
            <input
              onChange={handleData}
              type="text"
              id="name"
              name="name"
              placeholder="Enter book name"
              className="border-2 border-[#636AE8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636AE8]"
            />
            {!data.name && !isValid && (
              <p className="text-red-500">Please Enter a Book Name</p>
            )}
            {!(data.name === "") &&
              !/^[a-zA-Z _-]{4,}$/.test(data.name) &&
              !isValid && (
                <p className="text-red-500">
                  Name must be at least 4 characters
                </p>
              )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="autherName"
              className="text-[#636AE8] font-semibold"
            >
              Author Name
            </label>
            <input
              onChange={handleData}
              type="text"
              id="autherName"
              name="autherName"
              placeholder="Enter author name"
              className="border-2 border-[#636AE8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636AE8]"
            />
            {!data.autherName && !isValid && (
              <p className="text-red-500">Please Enter an Author Name</p>
            )}
            {!(data.autherName === "") &&
              !/^[a-zA-Z _-]{4,}$/.test(data.autherName) &&
              !isValid && (
                <p className="text-red-500">
                  Name must be at least 4 characters
                </p>
              )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="text-[#636AE8] font-semibold">
              Location
            </label>
            <input
              onChange={handleData}
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              className="border-2 border-[#636AE8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636AE8]"
            />
            {!data.location && !isValid && (
              <p className="text-red-500">Please Enter a Location</p>
            )}
            {!(data.location === "") &&
              !/^[a-zA-Z _-]{4,}$/.test(data.location) &&
              !isValid && (
                <p className="text-red-500">
                  Location must be at least 4 characters
                </p>
              )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="numberInStock"
              className="text-[#636AE8] font-semibold"
            >
              Quantity
            </label>
            <input
              onChange={handleData}
              type="number"
              id="numberInStock"
              name="numberInStock"
              placeholder="Enter quantity"
              className="border-2 border-[#636AE8] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#636AE8]"
            />
            {!data.numberInStock && !isValid && (
              <p className="text-red-500">Please Enter Quantity</p>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-[#636AE8] flex-1 text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#4C52D7] transition-all"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  );
};

export default AddBookFrom;
