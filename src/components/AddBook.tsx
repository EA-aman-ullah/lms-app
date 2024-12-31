import React, { useEffect } from "react";
import Modal from "react-modal";
import AddBookForm from "./AddBookForm";
import withPermission from "./withPermission";
import { BiSolidBookAdd } from "react-icons/bi";
const AddBook = () => {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    Modal.setAppElement("#modal");
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#636AE8";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-primary flex items-center text-nowrap gap-[.5rem] sm:gap-[1rem]  text-white py-[0.5rem] sm:py-[1rem] px-[1rem] sm:px-[2rem] rounded-full shadow-md hover:bg-hoverPrimary focus:outline-none"
      >
        <div>
          <BiSolidBookAdd size={25} />
        </div>
        <p className=" text-[1.3rem] sm:text-[1.5rem] font-bold">Add Book</p>
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="fixed inset-0 flex items-center justify-center z-[9999999999] bg-transBlack"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
      >
        <div className="bg-body p-6 rounded-lg max-w-lg w-full h-full overflow-y-auto">
          <div className="flex justify-between pb-3">
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className="text-primary pt-1 text-xl font-semibold mb-4"
            >
              Enter Book Details
            </h2>
            <div>
              <button
                onClick={closeModal}
                className="bg-primary text-white py-2 px-20 rounded-lg shadow-md hover:bg-hoverPrimary focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
          <div className="mb-4 overflow-y-auto">
            <AddBookForm closeModal={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withPermission(AddBook);
