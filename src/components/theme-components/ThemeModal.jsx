import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import Close from "../../assets/icons/close.svg";
import { useTheme } from "../../contexts/ThemeContext";

const ThemeModal = ({ isOpen, onClose, title, children }) => {
  const { switchTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    switchTheme(newTheme);
    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {title && (
          <div className="flex justify-between items-center pb-2 mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <img src={Close} alt="close button" />
            </button>
          </div>
        )}
        <div>{children}</div>

        <div className="mt-4 border-t pt-4 flex flex-col gap-y-3 justify-around">
          <button
            onClick={() => handleThemeChange("light")}
            className="bg-[#fffdfd] text-black px-4 py-4 rounded border border-black"
          >
            Light
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className="bg-[#264653] text-white px-4 py-4 rounded border border-[#264653]"
          >
            Dark
          </button>
          <button
            onClick={() => handleThemeChange("purple")}
            className="bg-[#a8b1eb] text-black px-4 py-4 rounded border border-[#a8b1eb]"
          >
            Purple
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ThemeModal;

ThemeModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};
