import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
// TODO: replace this with some other text editor as this one is return errors and not maintained
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import { createNewCard } from "../../reducers/cardSlice";
import { updateCard } from "../../reducers/cardSlice";
import { fetchUsersByIds } from "../../reducers/userSlice";

const AddCardModal = ({
  onClose,
  list,
  projectId,
  selectedCard,
  isCardEditing,
  setIsCardEditing,
  setProjectCards,
  projectCards,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [_, setTags] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");
  const [currentProjectMembers, setCurrentProjectMembers] = useState([]);
  const [assignedUsersOptions, setAssignedUsersOptions] = useState([]);

  const quillRef = useRef();
  const dispatch = useDispatch();

  const predefinedTags = [
    "critical",
    "important",
    "bug",
    "feature",
    "urgent",
    "default",
  ];

  const currentProject = useSelector((state) =>
    state.projects.projects.find((project) => project.id === projectId),
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (currentProject.membersId.length > 0) {
      dispatch(fetchUsersByIds(currentProject.membersId)).then((response) => {
        setCurrentProjectMembers(response.payload);
      });
      const assignedUsersOptions = currentProjectMembers.map((member) => ({
        value: member._id,
        label: member.username,
      }));
      setAssignedUsersOptions(assignedUsersOptions);
    }
  }, [currentProject.membersId, dispatch, currentProjectMembers.length]);

  const handleAddOrEditCard = () => {
    if (!title) {
      setError("Title is required!");
      return;
    }

    const newCard = {
      _id: isCardEditing ? selectedCard?._id : uuidv4(),
      listId: list._id,
      createdByUserId: user._id,
      title,
      description: description || "",
      tags: selectedTags,
      assigned: assigned,
      comments: isCardEditing ? selectedCard?.comments : [],
      commentsCount: isCardEditing ? selectedCard?.commentsCount : 0,
      status: list.name,
      dateAdded: isCardEditing
        ? selectedCard?.dateAdded
        : moment().toISOString(),
      dueDate: dueDate || "",
    };

    if (isCardEditing) {
      setProjectCards((prevCards) =>
        prevCards.map((card) =>
          card._id === selectedCard._id ? newCard : card,
        ),
      );

      dispatch(updateCard(newCard));
    } else {
      setProjectCards([...projectCards, newCard]);

      dispatch(createNewCard(newCard));
    }
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTags([]);
    setSelectedTags([]);
    setAssigned([]);
    setDueDate("");
    setIsCardEditing(false);
    setError("");
  };

  const handleCLose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (isCardEditing && selectedCard) {
      setTitle(selectedCard.title || "");
      setDescription(selectedCard.description || "");
      setSelectedTags(selectedCard.tags || []);
      setAssigned(selectedCard.assigned || []);
      setDueDate(selectedCard.dueDate || "");
    }
  }, [isCardEditing, selectedCard]);

  const handleTagChange = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag],
    );
  };

  const handleAssignedChange = (selectedOptions) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setAssigned(selectedValues);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4">
        <label htmlFor="card-title" className="block text-gray-700">
          Title
        </label>
        <input
          id="card-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded ${error ? "border border-danger" : ""}`}
          placeholder="Card Title"
          required
        />
        {error && <div className="text-danger">{error}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="card-description" className="block text-gray-700">
          Description
        </label>
        <ReactQuill
          id="card-description"
          ref={quillRef}
          theme="snow"
          value={description || ""}
          onChange={setDescription}
          placeholder="Card Description"
        />
      </div>
      <div className="mb-4">
        <h3>Select Tags:</h3>

        <div className="grid grid-cols-3">
          {predefinedTags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                value={tag}
                checked={selectedTags.includes(tag)}
                onChange={() => handleTagChange(tag)}
                className="mr-1"
              />
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="selectMembers" className="block mb-2">
          Assign to:
          <Select
            id="selectMembers"
            isMulti
            options={assignedUsersOptions}
            onChange={handleAssignedChange}
            value={assigned.map((user) => {
              const matchedMember = currentProjectMembers.find(
                (currUser) => currUser._id === user,
              );
              return {
                value: user,
                label: matchedMember ? matchedMember.username : "Unknown user",
              };
            })}
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={isCardEditing ? selectedCard.dueDate : dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCLose}
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleAddOrEditCard}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isCardEditing ? "Save Changes" : "Add Card"}
        </button>
      </div>
    </form>
  );
};

export default AddCardModal;

AddCardModal.propTypes = {
  onClose: PropTypes.func,
  users: PropTypes.array,
  list: PropTypes.object,
  projectId: PropTypes.string,
  selectedCard: PropTypes.object,
  isCardEditing: PropTypes.bool,
  setIsCardEditing: PropTypes.func,
  setProjectCards: PropTypes.func,
  projectCards: PropTypes.array,
};
