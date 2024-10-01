import React, { useState } from "react";
import ThemeModal from "./ThemeModal";

const ThemeSwitch = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <h3 className="pl-2">Application Theme</h3>
      <div className="h-20 flex justify-start w-full">
        <button onClick={openModal} className="w-full flex items-center">
          <h1 className="text-nowrap indent-5 font-semibold text-xl ">
            Select Theme
          </h1>
        </button>
      </div>

      <ThemeModal isOpen={isModalOpen} onClose={closeModal} title="Select Theme" />
    </>
  );
};

export default ThemeSwitch;
