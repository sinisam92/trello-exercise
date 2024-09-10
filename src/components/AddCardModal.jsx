import moment from "moment";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AddCardModal = ({
  isOpen,
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
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");

  const predefinedTags = [
    "critical",
    "important",
    "bug",
    "feature",
    "urgent",
    "default",
  ];

  const handleAddOrEditCard = () => {
    if (!title) {
      setError("Title is required!");
      return;
    }

    const newCard = {
      id: selectedCard?.id || uuidv4(),
      title: title,
      description: description || "",
      tags: selectedTags,
      assigned,
      comments: selectedCard?.comments || [],
      status: list.name,
      dateAdded: selectedCard?.dateAdded || moment().toISOString(),
      dueDate: dueDate || "",
    };
    const updatedProjects = projects.map((proj) => 
    proj.id === projectId
      ? {
          ...proj,
          lists: proj.lists.map((lst) =>
            lst.id === list.id
              ? {
                  ...lst,
                  cards: lst.cards.some((card) => isCardEditing && card.id === selectedCard?.id)
                    ? lst.cards.map((card) =>
                        card.id === selectedCard?.id ? { ...card, ...newCard } : card
                      )
                    : [...lst.cards, newCard] 
                }
              : lst
          ),
        }
      : proj
  );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    setTitle("");
    setDescription("");
    setTags([]);
    setSelectedTags([]);
    setAssigned([]);
    setDueDate("");
    setIsCardEditing(false);
    setIsCardEditing(null);
    onClose();
    setError("");
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

  if (!isOpen) return null;

  const handleAssignedChange = (e) => {
    const { options } = e.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setAssigned(selectedValues);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl mb-4">Add New Card</h2>
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
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Card Description"
            ></textarea>
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
              <select
                multiple
                value={assigned}
                onChange={handleAssignedChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              >
                {users.map((user) => {
                  return (
                    <option
                      key={user.username}
                      value={user.username}
                      className="text-black"
                    >
                      {user.username}
                    </option>
                  );
                })}
              </select>
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
              onClick={onClose}
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
      </div>
    </div>
  );
};

export default AddCardModal;
