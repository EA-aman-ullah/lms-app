import React, { useEffect } from "react";
import Modal from "react-modal";
import AddBookFrom from "./AddBookFrom";
import withPermission from "./withPermission";

const AddBook = () => {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    Modal.setAppElement("#modaal");
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
        className="bg-[#636AE8] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#4C52D7] focus:outline-none"
      >
        Add New Book
      </button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="fixed inset-0 flex items-center mt-[55px] justify-center z-50 bg-[#000000a0]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-[#F2F2FD] p-6 rounded-lg max-w-lg w-full h-full overflow-y-auto  ">
          <div className="flex justify-between pb-3">
            <h2
              ref={(_subtitle) => (subtitle = _subtitle)}
              className="text-[#636AE8] pt-1 text-xl font-semibold mb-4"
            >
              Enter Book Details
            </h2>
            <div>
              <button
                onClick={closeModal}
                className="bg-[#636AE8] text-white py-2 px-20 rounded-lg shadow-md hover:bg-[#4C52D7] focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
          <div className="mb-4 overflow-y-auto">
            <AddBookFrom closeModal={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default withPermission(AddBook);
