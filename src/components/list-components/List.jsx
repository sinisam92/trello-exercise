import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Link } from "wouter";
import PropTypes from "prop-types";
import Dots from "../../assets/icons/dots.svg";
import Card from "../card-components/Card";
import AddNewCard from "../card-components/AddNewCard";
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
  activeId,
}) => {
  const { setNodeRef } = useDroppable({
    id: list.id,
  });

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
      className="bg-primaryDark min-w-[280px] max-w-[280px] flex flex-col h-fit max-h-[calc(100vh-200px)] ml-5 mt-0 rounded-[20px]"
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

      <div
        ref={setNodeRef}
        className="overflow-auto flex-1 max-w-[290px] min-h-[50px] mx-auto"
      >
        <SortableContext
          items={list.cards.map((card) => card.id)}
          strategy={rectSortingStrategy}
        >
          {list.cards.map((card) => (
            <div key={card.id}>
              <Link to={`/projects/${projectId}/card/${card.id}`}>
                {activeId !== card.id && (
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
                )}
              </Link>
            </div>
          ))}
        </SortableContext>
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

ListSection.propTypes = {
  list: PropTypes.object,
  projects: PropTypes.array,
  projectId: PropTypes.string,
  currentProject: PropTypes.object,
  users: PropTypes.array,
  setProjects: PropTypes.func,
  setSmallTags: PropTypes.func,
  smallTags: PropTypes.bool,
  setSelectedList: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  setIsCardEditing: PropTypes.func,
  setSelectedCard: PropTypes.func,
  toggleDropdown: PropTypes.func,
  dropdownListId: PropTypes.string,
  handleEditList: PropTypes.func,
  listMenuIconRef: PropTypes.object,
  listMenuRef: PropTypes.object,
  isEditing: PropTypes.bool,
  setIsEditing: PropTypes.func,
  openListId: PropTypes.string,
  setOpenListId: PropTypes.func,
  newListName: PropTypes.string,
  setNewListName: PropTypes.func,
  handleInputChange: PropTypes.func,
  setDropdownListId: PropTypes.func,
  activeId: PropTypes.string,
};
