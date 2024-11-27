import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "wouter";

import Dots from "../../assets/icons/dots.svg";
import { deleteList, updateList } from "../../reducers/listSlice";
import { updateProject } from "../../reducers/projectSlice";
import AddNewCard from "../card-components/AddNewCard";
import Card from "../card-components/Card";
import ListItem from "./ListItem";

const List = ({
  list,
  cards,
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
  listMenuIconRef,
  listMenuRef,
  setDropdownListId,
  activeId,
  onDeleteList,
  isOpen,
  setIsOpen,
  setProjectCards,
}) => {
  const [openListId, setOpenListId] = useState(null);
  const [newListName, setNewListName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { setNodeRef } = useDroppable({
    id: list._id,
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setNewListName(e.target.value);
  };
  /**
   *
   * Handles saving the new name of the list
   * @param {string} listId - The id of the list to save the new name to
   */
  const handleEditList = (listId) => {
    setIsEditing(true);
    setOpenListId(listId);
    setNewListName(list.name);
    setIsOpen(false);
  };
  const handleSaveList = () => {
    const updatedList = {
      ...list,
      name: newListName,
      slug: newListName.toLowerCase().replace(/\s/g, "-"),
    };
    list.name = newListName;
    dispatch(updateList(updatedList));
    setIsEditing(false);
    setOpenListId(null);
  };
  /**
   *
   * Handles the pressing of the enter key to save the list name
   */
  const handleKeyPress = (event, listId) => {
    if (event.key === "Enter") {
      handleSaveList(listId);
    }
  };

  /**
   *
   * Handles deleting a list from the project
   * @param {string} listId - The id of the list to delete
   */

  const handleDeleteList = (listId) => {
    const updatedProjects = {
      ...currentProject,
      lists: currentProject.lists.filter((list) => list._id !== listId),
    };
    onDeleteList(listId);
    dispatch(updateProject(updatedProjects));
    dispatch(deleteList(listId));

    setDropdownListId(null);
  };

  return (
    <section
      key={list._id}
      className="bg-primaryDark min-w-[280px] max-w-[280px] flex flex-col h-fit max-h-[calc(100vh-200px)] ml-5 mt-0 rounded-[20px]"
    >
      <div className="relative flex justify-between rounded-t-lg">
        {isEditing && openListId === list._id ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={newListName}
              onChange={handleInputChange}
              onKeyDown={(event) => handleKeyPress(event, list._id)}
              placeholder="Enter list name"
              className="p-2 ml-4 w-[96%] bg-primaryDark border-0 border-b-2 border-white text-white rounded-t-[12px] text-2xl focus:outline-none focus:ring-0"
              // autoFocus
            />
          </form>
        ) : (
          <h1 className="text-white text-2xl tracking-wider p-4">
            {list.name}
          </h1>
        )}

        <button onClick={() => toggleDropdown(list._id)}>
          <img
            src={Dots}
            alt="option dots"
            ref={listMenuIconRef}
            className="pr-3"
          />
        </button>
        {dropdownListId === list._id && isOpen ? (
          <div
            ref={listMenuRef}
            className="absolute right-12 top-12 w-40 h-28 bg-primaryHover rounded-lg z-40"
          >
            <ul className="py-2 px-2 text-white text-lg">
              <ListItem
                text="Edit"
                onClick={() => handleEditList(list._id)}
                className="flex items-center py-2 hover:bg-primary cursor-pointer"
              />
              <ListItem
                text="Delete"
                onClick={() => handleDeleteList(list._id)}
                className="flex items-center py-2 hover:bg-primary cursor-pointer"
              />
            </ul>
          </div>
        ) : null}
      </div>

      <div
        ref={setNodeRef}
        className="overflow-auto flex-1 max-w-[290px] min-h-[50px] mx-auto"
      >
        <SortableContext
          items={cards.map((card) => card._id)}
          strategy={rectSortingStrategy}
        >
          {cards.map((card) => (
            <div key={card._id}>
              <Link to={`/projects/${projectId}/card/${card._id}`}>
                {activeId !== card._id && (
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
                      setProjectCards={setProjectCards}
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

export default List;

List.propTypes = {
  list: PropTypes.object,
  cards: PropTypes.array,
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
  setDropdownListId: PropTypes.func,
  activeId: PropTypes.string,
  onDeleteList: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  setProjectCards: PropTypes.func,
};
