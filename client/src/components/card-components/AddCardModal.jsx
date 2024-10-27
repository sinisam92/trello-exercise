import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useEffect, useRef, useState } from "react";
// TODO: replace this with some other text editor as this one is return errors and not maintained
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import { updateProject } from "../../reducers/projectSlice";

const AddCardModal = ({
  onClose,
  users,
  list,
  projectId,
  selectedCard,
  isCardEditing,
  setIsCardEditing,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [_, setTags] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");

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

  console.log("currentProject => currentProject", currentProject);

  const currentProjectMembers = currentProject.members.map((member) => {
    const members = users.find((user) => user.username === member);
    return members
      ? {
          value: members.username,
          label: members.username,
        }
      : null;
  });

  const handleAddOrEditCard = () => {
    if (!title) {
      setError("Title is required!");
      return;
    }

    const newCard = {
      id: isCardEditing ? selectedCard?.id : uuidv4(),
      title,
      description: description || "",
      tags: selectedTags,
      assigned,
      comments: isCardEditing ? selectedCard?.comments : [],
      status: list.name,
      dateAdded: isCardEditing
        ? selectedCard?.dateAdded
        : moment().toISOString(),
      dueDate: dueDate || "",
    };

    console.log("ADD CARD MODAL => newCard", newCard);

    const updateListCards = (lst) => {
      console.log("lst.id", lst.id);
      console.log("list.id", list.id);
      console.log("is card editing", isCardEditing);
      return lst.id === list.id
        ? {
            ...lst,
            cards: isCardEditing
              ? lst.cards.map((card) =>
                  card.id === selectedCard?.id ? { ...card, ...newCard } : card,
                )
              : [...lst.cards, newCard],
          }
        : lst;
    };

    const updatedProject = {
      ...currentProject,
      lists: currentProject.lists.map(updateListCards),
    };

    dispatch(updateProject(updatedProject));
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
      setTitle(selectedCard.title);
      setDescription(selectedCard.description);
      setSelectedTags(selectedCard.tags);
      setAssigned(selectedCard.assigned);
      setDueDate(selectedCard.dueDate);
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
        <label className="block text-gray-700">Title</label>
        <input
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
        <label className="block text-gray-700">Description</label>
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={description}
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
        <label className="block mb-2">
          Assign to:
          <Select
            isMulti
            options={currentProjectMembers}
            onChange={handleAssignedChange}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Due Date</label>
        <input
          type="date"
          value={dueDate}
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
};
