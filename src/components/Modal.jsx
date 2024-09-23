import React from 'react';
import ReactDOM from 'react-dom';
import Close from '../assets/icons/close.svg';

const Modal = ({ isOpen, onClose, title, children, onThemeChange }) => {
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
        {onThemeChange && (
          <div className="mt-4 border-t pt-4 flex flex-col gap-y-3 justify-around">
            <button
              onClick={() => onThemeChange('light')}
              className="bg-gray-200 px-4 py-4 rounded"
            >
              Light
            </button>
            <button
              onClick={() => onThemeChange('dark')}
              className="bg-gray-800 text-white px-4 py-4 rounded"
            >
              Dark
            </button>
            <button
              onClick={() => onThemeChange('system')}
              className="bg-blue-500 text-white px-4 py-4 rounded"
            >
              System Default
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
