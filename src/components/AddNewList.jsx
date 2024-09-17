import React from "react";
import Plus from "../assets/icons/plus.svg";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "wouter";

const AddNewList = ({
  isAdding,
  setIsAdding,
  newListName,
  setNewListName,
  handleInputChange,
  handleCancel,
  setProjects,
}) => {
  const { projectId } = useParams();

  /**
   * Handles adding a new list to the project
   */
  const handleAddNewList = () => {
    if (!newListName) return;

    const formattedName =
      newListName.charAt(0).toUpperCase() + newListName.slice(1);
    const formattedSlug = newListName.toLowerCase().replace(/\s/g, "-");
    const newList = {
      id: uuidv4(),
      name: formattedName,
      cards: [],
      slug: formattedSlug,
    };

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, lists: [...project.lists, newList] }
          : project
      )
    );

    setNewListName("");
    setIsAdding(false);
  };

  

  return (
    <div>
      {!isAdding ? (
        <button
          className="flex justify-center items-center gap-x-2 bg-primary min-w-[340px] p-4 rounded-[12px] text-white ml-4 cursor-pointer hover:bg-primaryHover"
          onClick={() => setIsAdding(true)}
        >
          <img src={Plus} alt="add list" className="w-6" />
          Add new list
        </button>
      ) : (
        <div className="flex justify-center items-center gap-x-2 bg-primary min-w-[340px] p-4 rounded-[12px] m-4 mt-0">
          <input
            type="text"
            value={newListName}
            onChange={handleInputChange}
            placeholder="Enter list name"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleAddNewList}
            className="bg-success text-white px-4 py-2 rounded"
          >
            Add
          </button>
          <button
            onClick={handleCancel}
            className="bg-danger text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNewList;
