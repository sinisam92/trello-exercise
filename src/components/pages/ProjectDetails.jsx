import { useState, useEffect, useRef } from "react";
import { useParams } from "wouter";
import ZoomIn from "../../assets/icons/zoomIn.svg";
import ZoomOut from "../../assets/icons/zoomOut.svg";
import AddCardModal from "../AddCardModal";
import useProjects from "../../hooks/useProjects";
import useUsers from "../../hooks/useUsers";
import useClickOutside from "../../hooks/useClickOutside";
import List from "../List";
import AddNewList from "../AddNewList";

const ProjectDetails = () => {
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
  const [zoom, setZoom] = useState(false);

  const { projectId } = useParams();
  const { users } = useUsers();
  const { projects, currentProject, setProjects } = useProjects(projectId);

  const listMenuRef = useRef(null);
  const listMenuIconRef = useRef(null);
  const zoomAreaRef = useRef(null);

  /**
   * Handles closing the modal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedList(null);
  };

  /**
   * Handles closing the dropdown menu when clicking outside of it
   *
   */
  useClickOutside([listMenuRef, listMenuIconRef], () =>
    setDropdownListId(null)
  );

  /**
   * Scroll to top when component mounts, this fixed the problem with scroll beheviour
   * when navigating form CardDetails page back to ProjectDetails page
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Handles zooming in and out of the secific area
   */
  //TODO: Refactor this to get full height lists when zoomed
  useEffect(() => {
    const areaToZoom = zoomAreaRef.current;
    areaToZoom.style.zoom = zoom ? "50%" : "100%";

    return () => {
      areaToZoom.style.zoom = "100%";
    };
  }, [zoom]);

  /**
   * Handles selecting the list that is to be edited
   *
   * @param {string} listId - The id of the list to edit
   */
  const handleEditList = (listId) => {
    const listToEdit = currentProject.lists.find((list) => list.id === listId);
    if (listToEdit) {
      setIsEditing(true);
      setNewListName(listToEdit.name);
      setOpenListId(listId);
      setDropdownListId(null);
    }
  };
  
  /**
   * Handles cancelling the editing or adding of the list
   */
  const handleCancel = () => {
    setNewListName("");
    setIsAdding(false);
    setIsEditing(false);
    setOpenListId(null);
  };

  const handleInputChange = (event) => {
    setNewListName(event.target.value);
  };

  const toggleDropdown = (listId) => {
    setDropdownListId((prevId) => (prevId === listId ? null : listId));
  };

  return (
    <div>
      <div
        ref={zoomAreaRef}
        className="flex overflow-x-auto overscroll-y-none  h-screen"
      >
        {currentProject.lists.map((list, index) => {
          return (
            <List
              key={list.id}
              list={list}
              projects={projects}
              projectId={projectId}
              currentProject={currentProject}
              users={users}
              setProjects={setProjects}
              setSmallTags={setSmallTags}
              smallTags={smallTags}
              setSelectedList={setSelectedList}
              setIsModalOpen={setIsModalOpen}
              setIsCardEditing={setIsCardEditing}
              setSelectedCard={setSelectedCard}
              toggleDropdown={toggleDropdown}
              dropdownListId={dropdownListId}
              handleEditList={handleEditList}
              setDropdownListId={setDropdownListId}
              listMenuIconRef={listMenuIconRef}
              listMenuRef={listMenuRef}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              openListId={openListId}
              setOpenListId={setOpenListId}
              newListName={newListName}
              setNewListName={setNewListName}
              handleInputChange={handleInputChange}
            />
          );
        })}
        <AddCardModal
          isOpen={isModalOpen}
          onClose={closeModal}
          users={users}
          list={selectedList}
          projects={projects}
          setProjects={setProjects}
          projectId={currentProject.id}
          isCardEditing={isCardEditing}
          selectedCard={selectedCard}
          setIsCardEditing={setIsCardEditing}
        />
        <AddNewList
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          newListName={newListName}
          setNewListName={setNewListName}
          handleInputChange={handleInputChange}
          handleCancel={handleCancel}
          setProjects={setProjects}
        />
      </div>
      <div className="fixed bottom-6 right-12">
        <button onClick={() => setZoom(!zoom)}>
          <img src={zoom ? ZoomOut : ZoomIn} alt="zoom" className="w-10" />
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
