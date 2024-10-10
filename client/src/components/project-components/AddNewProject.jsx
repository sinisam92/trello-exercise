import PropTypes from "prop-types";
import React from "react";

import Plus from "../../assets/icons/plus.svg";

const AddNewProject = ({ setIsAdding, isAdding }) => {
  return (
    <div className="fixed bottom-32 right-10 z-40">
      <button
        onClick={() => setIsAdding((prevState) => !prevState)}
        className=" text-white p-3 rounded-full h-[100px] w-[100px] flex justify-center items-center bg-success"
      >
        <img
          src={Plus}
          alt="add project"
          className={`w-[50px] ${isAdding ? "rotate-45 duration-150 delay-100 ease-in " : "rotate-0 duration-150 delay-100 ease-in"}`}
        />
      </button>
    </div>
  );
};

export default AddNewProject;

AddNewProject.propTypes = {
  setIsAdding: PropTypes.func,
  isAdding: PropTypes.bool,
};
