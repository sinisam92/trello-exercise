import React, {useState} from "react";
import Modal from "./Modal";

const ThemeSwitch = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <div className="border-b border-black ">
        <div className="md:w-3/4 mx-auto">
          <h3 className="pl-2">Application Theme</h3>
          <div className="h-20 flex justify-start w-full">
            <button onClick={openModal} className="w-full flex items-center">
              <h1 className="text-nowrap indent-5 font-semibold text-xl ">
                Select Theme
              </h1>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Select Theme"
      />
    </>
  );
};

export default ThemeSwitch;
