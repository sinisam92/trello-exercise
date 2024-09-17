import React from "react";
import AddNewCard from "./AddNewCard";
import Card from "../stories/Card";
import Dots from "../assets/icons/dots.svg";
import { Link } from "wouter";
import ListItem from "./ListItem";

const ListSection = ({
  list,
  projects,
  projectId,
  currentProject,
  users,
  setProjects,
  setSmallTags,
  smallTags,
  setSelectedList,
  setIsModalOpen,
  setIsCardEditing,
  setSelectedCard,
  toggleDropdown,
  dropdownListId,
  handleEditList,
  listMenuIconRef,
  listMenuRef,
  isEditing,
  setIsEditing,
  openListId,
  setOpenListId,
  newListName,
  setNewListName,
  handleInputChange,
  setDropdownListId,
}) => {
  /**
   *
   * Handles saving the new name of the list
   * @param {string} listId - The id of the list to save the new name to
   */
  const handleSaveListName = (listId) => {
    const updatedProjects = projects.map((proj) =>
      proj.id === projectId
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
    setNewListName("");
  };

  /**
   *
   * Handles the pressing of the enter key to save the list name
   */
  const handleKeyPress = (event, listId) => {
    if (event.key === "Enter") {
      handleSaveListName(listId);
    }
  };

  /**
   *
   * Handles deleting a list from the project
   * @param {string} listId - The id of the list to delete
   */
  const handleDeleteList = (listId) => {
    setProjects((prevProjects) =>
      prevProjects.map((proj) =>
        proj.id === projectId
          ? { ...proj, lists: proj.lists.filter((list) => list.id !== listId) }
          : proj
      )
    );

    setDropdownListId(null);
  };
  return (
    <section
      key={list.id}
      className="bg-primaryDark min-w-[300px] flex flex-col h-fit max-h-[calc(100vh-200px)] ml-5 mt-0 rounded-[20px]"
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
              className="p-2 ml-4 w-[96%] bg-primaryDark border-0 border-b-2 border-white text-white rounded-t-[12px] text-2xl focus:outline-none focus:ring-0"
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
              <ListItem
                text="Edit"
                onClick={() => handleEditList(list.id)}
                className="flex items-center py-2 hover:bg-primary cursor-pointer"
              />
              <ListItem
                text="Delete"
                onClick={() => handleDeleteList(list.id)}
                className="flex items-center py-2 hover:bg-primary cursor-pointer"
              />
            </ul>
          </div>
        )}
      </div>

      <div className="overflow-y-auto flex-1">
        {list.cards.map((card) => (
          <Link key={card.id} to={`/projects/${projectId}/card/${card.id}`}>
            <div className="relative">
              <Card
                card={card}
                users={users}
                assigned={card.assigned}
                list={list}
                project={currentProject}
                setProjects={setProjects}
                setSmallTags={setSmallTags}
                smallTags={smallTags}
                setSelectedList={setSelectedList}
                setIsModalOpen={setIsModalOpen}
                setIsCardEditing={setIsCardEditing}
                setSelectedCard={setSelectedCard}
                className="overflow-visible"
              />
            </div>
          </Link>
        ))}
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
};

export default ListSection;
