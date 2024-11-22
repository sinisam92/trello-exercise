import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// import { useParams } from "wouter";
import Plus from "../../assets/icons/plus.svg";
import { updateProject } from "../../reducers/projectSlice";

const AddNewList = ({ projectId, currentProject, user }) => {
  const [error, setError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newListName, setNewListName] = useState("");

  const dispatch = useDispatch();
  // const { projectId } = useParams();

  /**
   * Handles adding a new list to the project
   */
  const handleAddNewList = () => {
    if (!newListName) {
      setError("List name is required.");
      return;
    }

    const formattedName =
      newListName.charAt(0).toUpperCase() + newListName.slice(1);
    const formattedSlug = newListName.toLowerCase().replace(/\s/g, "-");
    const newList = {
      _id: uuidv4(),
      prodjectId: projectId,
      createdByUserId: user._id,
      name: formattedName,
      cards: [],
      slug: formattedSlug,
    };

    "newList", newList;

    const updatedProject = {
      ...currentProject,
      lists: [...currentProject.lists, newList],
    };

    dispatch(updateProject(updatedProject));

    setNewListName("");
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewListName("");
    setError("");
  };

  const handleCancelNewList = () => {
    handleCancel();
    setError("");
  };

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
    setError("");
  };

  return (
    <div>
      {!isAdding ? (
        <button
          className="flex justify-center items-center gap-x-2 bg-secundary min-w-[340px] p-4 rounded-[12px] text-white ml-4 cursor-pointer hover:bg-primaryHover"
          onClick={() => setIsAdding(true)}
        >
          <img src={Plus} alt="add list" className="w-6" />
          Add new list
        </button>
      ) : (
        <div className="flex justify-center items-center gap-x-2 bg-secundary min-w-[340px] p-4 rounded-[12px] m-4 mt-0">
          <input
            type="text"
            value={newListName}
            onChange={(e) => handleInputChange(e)}
            required
            placeholder={error ? error : "Enter list name"}
            className={`border p-2 rounded mr-2 ${error ? "placeholder:text-red-500 border-red-500 focus:ring-red-500" : "placeholder:text-sm"} `}
          />
          <button
            onClick={handleAddNewList}
            className="bg-success text-white px-4 py-2 rounded"
          >
            Add
          </button>
          <button
            onClick={handleCancelNewList}
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

AddNewList.propTypes = {
  projectId: PropTypes.string,
  user: PropTypes.object,
  currentProject: PropTypes.object,
};
