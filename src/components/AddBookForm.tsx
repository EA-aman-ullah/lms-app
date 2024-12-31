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

const AddBookForm = ({ closeModal }: Props) => {
  const { usePost } = bookService;
  const { inputData, isValid, handleInputData, setValid } =
    useInputsData<Book>();
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const { mutate } = usePost(
    ["books", "overviewCard"],
    "Book Successfully Added"
  );

  const formData = new FormData();

  formData.append("image", selectedImage as Blob);
  formData.append("name", inputData.name);
  formData.append("autherName", inputData.autherName);
  formData.append("location", inputData.location);
  formData.append("numberInStock", inputData.numberInStock as any);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      /^[a-zA-Z _-]{4,}$/.test(inputData.name) &&
      /^[a-zA-Z _-]{4,}$/.test(inputData.autherName) &&
      /^[a-zA-Z _-]{4,}$/.test(inputData.location) &&
      inputData.numberInStock &&
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
                ? "bg-body text-accent border-2 border-accent"
                : "bg-body text-primary border-2 border-primary"
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
            <label htmlFor="name" className="text-primary font-semibold">
              Name
            </label>
            <input
              onChange={handleInputData}
              type="text"
              id="name"
              name="name"
              placeholder="Enter book name"
              className="border-2 border-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hoverPrimary"
            />
            {!inputData.name && !isValid && (
              <p className="text-red-500">Please Enter a Book Name</p>
            )}
            {!(inputData.name === "") &&
              !/^[a-zA-Z _-]{4,}$/.test(inputData.name) &&
              !isValid && (
                <p className="text-red-500">
                  Name must be at least 4 characters
                </p>
              )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="autherName" className="text-primary font-semibold">
              Author Name
            </label>
            <input
              onChange={handleInputData}
              type="text"
              id="autherName"
              name="autherName"
              placeholder="Enter author name"
              className="border-2 border-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hoverPrimary"
            />
            {!inputData.autherName && !isValid && (
              <p className="text-red-500">Please Enter an Author Name</p>
            )}
            {!(inputData.autherName === "") &&
              !/^[a-zA-Z _-]{4,}$/.test(inputData.autherName) &&
              !isValid && (
                <p className="text-red-500">
                  Name must be at least 4 characters
                </p>
              )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="text-primary font-semibold">
              Location
            </label>
            <input
              onChange={handleInputData}
              type="text"
              id="location"
              name="location"
              placeholder="Enter location"
              className="border-2 border-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hoverPrimary"
            />
            {!inputData.location && !isValid && (
              <p className="text-red-500">Please Enter a Location</p>
            )}
            {!(inputData.location === "") &&
              !/^[a-zA-Z _-]{4,}$/.test(inputData.location) &&
              !isValid && (
                <p className="text-red-500">
                  Location must be at least 4 characters
                </p>
              )}
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="numberInStock"
              className="text-primary font-semibold"
            >
              Quantity
            </label>
            <input
              onChange={handleInputData}
              type="number"
              id="numberInStock"
              name="numberInStock"
              placeholder="Enter quantity"
              className="border-2 border-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-hoverPrimary"
            />
            {!inputData.numberInStock && !isValid && (
              <p className="text-red-500">Please Enter Quantity</p>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-primary flex-1 text-white px-8 py-3 rounded-lg shadow-md hover:bg-hoverPrimary transition-all"
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

export default AddBookForm;
