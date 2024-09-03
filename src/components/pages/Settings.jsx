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
    console.log(`Theme changed to: ${newTheme}`);
    closeModal(); 
  };
  return (
    <div>
      <h3 className="pl-2">Application Theme</h3>
      <div className="h-20 border-b border-primary flex items-center justify-between">
        <button onClick={openModal}>
          <h1 className="text-nowrap indent-5 font-semibold text-xl">
            Select Theme
          </h1>
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Select Theme"
        onThemeChange={handleThemeChange}
      />
      <div>
        <h3 className="pl-2">Accessibility</h3>
        <div className="h-20 border-b border-primary flex items-center justify-between">
          <h1 className="text-nowrap indent-5 font-semibold text-xl">
            Enable Animations
          </h1>
          <div className="flex-end">
            <ToggleSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
