import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "wouter";
import presentationData from "../../data/presentationData";
import Dots from "../../assets/icons/dots.svg";
import Plus from "../../assets/icons/plus.svg";
import AddNewCard from "../AddNewCard";
import { v4 as uuidv4 } from "uuid";
import AddCardModal from "../AddCardModal";
import Card from "../../stories/Card";

const ProjectDetails = () => {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem("projects")) || presentationData
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [isAdding, setIsAdding] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [openListId, setOpenListId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownListId, setDropdownListId] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [smallTags, setSmallTags] = useState(false);
  const [isCardEditing, setIsCardEditing] = useState(false);

  const listMenuRef = useRef(null);
  const listMenuIconRef = useRef(null);

  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedList(null);
  };

  const handleClickOutside = (event) => {
    if (
      listMenuRef.current &&
      !listMenuRef.current.contains(event.target) &&
      listMenuIconRef.current &&
      !listMenuIconRef.current.contains(event.target)
    ) {
      setDropdownListId(null);
    }
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddNewList = () => {
    if (newListName) {
      setProjects((prevProjects) => {
        const updatedProjects = prevProjects.map((project) =>
          project.id === id
            ? {
                ...project,
                lists: [
                  ...project.lists,
                  {
                    id: uuidv4(),
                    name:
                      newListName.charAt(0).toUpperCase() +
                      newListName.slice(1),
                    cards: [],
                    slug: newListName.toLowerCase().replace(/\s/g, "-"),
                  },
                ],
              }
            : project
        );
        return updatedProjects;
      });

      setNewListName("");
      setIsAdding(false);
    }
  };

  const handleEditList = (listId) => {
    const listToEdit = project.lists.find((list) => list.id === listId);
    if (listToEdit) {
      setIsEditing(true);
      setNewListName(listToEdit.name);
      setOpenListId(listId);
      setDropdownListId(null);
    }
  };

  const handleSaveListName = (listId) => {
    const updatedProjects = projects.map((proj) =>
      proj.id === id
        ? {
            ...proj,
            lists: proj.lists.map((list) =>
              list.id === listId ? { ...list, name: newListName } : list
            ),
          }
        : proj
    );

    setProjects(updatedProjects);
    setIsEditing(false);
    setOpenListId(null);
  };

  const handleKeyPress = (event, listId) => {
    if (event.key === "Enter") {
      handleSaveListName(listId);
    }
  };

  const handleCancel = () => {
    setNewListName("");
    setIsAdding(false);
    setIsEditing(false);
    setOpenListId(null);
  };

  const handleDeleteList = (listId) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === id
          ? { ...proj, lists: proj.lists.filter((list) => list.id !== listId) }
          : proj
      )
    );

    setDropdownListId(null);
  };

  const handleInputChange = (event) => {
    setNewListName(event.target.value);
  };

  const toggleDropdown = (listId) => {
    setDropdownListId((prevId) => (prevId === listId ? null : listId));
  };

  return (
    <div className="flex overflow-x-auto overscroll-y-none h-screen">
      {project.lists.map((list, index) => {
        return (
          <section
            key={list.id}
            className="bg-primaryDark min-w-[340px] flex flex-col h-fit max-h-[calc(100vh-200px)] ml-5 mt-0 rounded-[20px]"
          >
            <div className="relative flex justify-between rounded-t-lg">
              {isEditing && openListId === list.id ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="text"
                    value={newListName}
                    onChange={handleInputChange}
                    onKeyDown={(event) => handleKeyPress(event, list.id)}
                    placeholder="Enter list name"
                    className="p-2 ml-4 bg-primaryDark border-0 border-b-2 border-white text-white text-2xl focus:outline-none focus:ring-0"
                    autoFocus
                  />
                </form>
              ) : (
                <h1 className="text-white text-2xl tracking-wider p-4">
                  {list.name}
                </h1>
              )}

              <button onClick={() => toggleDropdown(list.id)}>
                <img
                  src={Dots}
                  alt="option dots"
                  ref={listMenuIconRef}
                  className="pr-3"
                />
              </button>

              {dropdownListId === list.id && (
                <div
                  ref={listMenuRef}
                  className="absolute right-12 top-12 w-40 h-28 bg-primaryHover rounded-lg z-40"
                >
                  <ul className="py-2 px-2 text-white text-lg">
                    <li
                      onClick={() => handleEditList(list.id)}
                      className="flex items-center py-2 hover:bg-primary cursor-pointer"
                    >
                      Edit
                    </li>
                    <li
                      onClick={() => handleDeleteList(list.id)}
                      className="flex items-center py-2 hover:bg-primary cursor-pointer"
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="overflow-y-auto flex-1">
              {list.cards.map((card) => {
                return (
                  <Link key={card.id} to={`/projects/${id}/card/${card.id}`}>
                    <Card
                      card={card}
                      assigned={card.assigned}
                      list={list}
                      project={project}
                      setProjects={setProjects}
                      setSmallTags={setSmallTags}
                      smallTags={smallTags}
                      setSelectedList={setSelectedList}
                      setIsModalOpen={setIsModalOpen}
                      setIsCardEditing={setIsCardEditing}
                      setSelectedCard={setSelectedCard}
                    />
                  </Link>
                );
              })}
            </div>
            <AddNewCard
              setSelectedList={setSelectedList}
              setIsModalOpen={setIsModalOpen}
              setIsCardEditing={setIsCardEditing}
              setSelectedCard={setSelectedCard}
              list={list}
            />
          </section>
        );
      })}
      <AddCardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        users={users}
        list={selectedList}
        projects={projects}
        setProjects={setProjects}
        projectId={project.id}
        isCardEditing={isCardEditing}
        selectedCard={selectedCard}
        setIsCardEditing={setIsCardEditing}
      />
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
          <div className="flex justify-center items-center gap-x-2 bg-primary min-w-[340px] p-4 rounded-[12px] m-4 mt-9">
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
    </div>
  );
};

export default ProjectDetails;
