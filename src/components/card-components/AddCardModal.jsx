import React from "react";
import moment from "moment";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import useProjects from "../../hooks/useProjects";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";

const AddCardModal = ({
  onClose,
  users,
  list,
  projects,
  setProjects,
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

  const predefinedTags = [
    "critical",
    "important",
    "bug",
    "feature",
    "urgent",
    "default",
  ];

  const { currentProject } = useProjects(projectId);

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

    const updateListCards = (lst) => {
      return lst.id === list.id
        ? {
            ...lst,
            cards: isCardEditing
              ? lst.cards.map((card) =>
                  card.id === selectedCard?.id ? { ...card, ...newCard } : card
                )
              : [...lst.cards, newCard],
          }
        : lst;
    };

    const updatedProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, lists: project.lists.map(updateListCards) }
        : project
    );

    setProjects(updatedProjects);
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
        : [...prevTags, tag]
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
  projects: PropTypes.array,
  setProjects: PropTypes.func,
  projectId: PropTypes.string,
  selectedCard: PropTypes.object,
  isCardEditing: PropTypes.bool,
  setIsCardEditing: PropTypes.func,
};
