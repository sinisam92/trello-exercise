import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";
import Modal from "../Modal";

const Settings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState("system");

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    closeModal();
  };
  return (
    <div>
      <div className="border-b border-primary ">
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
        onThemeChange={handleThemeChange}
      />
      <div className="border-b border-primary ">
        <div className="md:w-3/4 mx-auto">
          <h3 className="pl-2 pt-2">Accessibility</h3>
          <div className="h-20 flex items-center justify-between">
            <h1 className="text-nowrap indent-5 font-semibold text-xl">
              Enable Animations
            </h1>
            <div className="flex-end mr-4">
              <ToggleSwitch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
