import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "wouter";

import ZoomIn from "../../assets/icons/zoomIn.svg";
import ZoomOut from "../../assets/icons/zoomOut.svg";
import useClickOutside from "../../hooks/useClickOutside";
import { updateProject } from "../../reducers/projectSlice";
import AddCardModalContainer from "../card-components/AddCardModalContainer";
import Card from "../card-components/Card";
import AddNewList from "../list-components/AddNewList";
import List from "../list-components/List";

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
  const [activeId, setActiveId] = useState(null);

  const { projectId } = useParams();
  const { users } = useSelector((state) => state.users);
  const { projects } = useSelector((state) => state.projects);

  const currentProject = useSelector((state) =>
    state.projects.projects.find((project) => project.id === projectId),
  );

  const dispatch = useDispatch();

  const listMenuRef = useRef(null);
  const listMenuIconRef = useRef(null);
  const zoomAreaRef = useRef(null);

  const dropAnimation = {
    ...defaultDropAnimation,
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 500 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeList = currentProject.lists.find((list) =>
      list.cards.some((card) => card.id === activeId),
    );
    const overList = currentProject.lists.find((list) =>
      list.cards.some((card) => card.id === overId),
    );

    if (!activeList || !overList || activeList === overList) {
      return null;
    }

    const updateCardPositions = () => {
      const activeItems = activeList.cards;
      const overItems = overList.cards;
      const activeIndex = activeItems.findIndex((i) => i.id === activeId);
      const overIndex = overItems.findIndex((i) => i.id === overId);

      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overItems.length - 1 && delta.y > 0;
        const modifier = putOnBelowLastItem ? 1 : 0;
        return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      };

      const updatedProject = {
        ...currentProject,
        lists: currentProject.lists.map((list) => {
          if (list.id === activeList.id) {
            return {
              ...list,
              cards: activeItems.filter((i) => i.id !== activeId),
            };
          } else if (list.id === overList.id) {
            return {
              ...list,
              cards: [
                ...overItems.slice(0, newIndex()),
                activeItems[activeIndex],
                ...overItems.slice(newIndex(), overItems.length),
              ],
            };
          } else {
            return list;
          }
        }),
      };

      return updatedProject;
    };
    dispatch(updateProject(updateCardPositions()));
  };

  // const handleDragEnd = (event) => {
  //   setActiveId(null);
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeId = String(active.id);
  //   const overId = String(over.id);
  //   if (activeId !== overId) {
  //     saveProjects((prevProjects) => {
  //       const activeList = currentProject.lists.find((list) =>
  //         list.cards.some((card) => card.id === activeId)
  //       );

  //       const overList = currentProject.lists.find(
  //         (list) => list.id === overId
  //       );

  //       if (!activeList || !overList) return prevProjects;

  //       const activeIndex = activeList.cards.findIndex(
  //         (card) => card.id === activeId
  //       );
  //       const overIndex = overList.cards.findIndex(
  //         (card) => card.id === overId
  //       );

  //       if (activeList.id === overList.id) {
  //         return prevProjects.map((project) => {
  //           if (project.id === currentProject.id) {
  //             return {
  //               ...project,
  //               lists: project.lists.map((list) => {
  //                 if (list.id === activeList.id) {
  //                   return {
  //                     ...list,
  //                     cards: arrayMove(list.cards, activeIndex, overIndex),
  //                   };
  //                 }
  //                 return list;
  //               }),
  //             };
  //           }
  //           return project;
  //         });
  //       } else {
  //         const activeCard = activeList.cards[activeIndex];
  //         return prevProjects.map((project) => {
  //           if (project.id === currentProject.id) {
  //             return {
  //               ...project,
  //               lists: project.lists.map((list) => {
  //                 if (list.id === activeList.id) {
  //                   return {
  //                     ...list,
  //                     cards: list.cards.filter((card) => card.id !== activeId),
  //                   };
  //                 } else if (list.id === overList.id) {
  //                   return {
  //                     ...list,
  //                     cards: [
  //                       ...list.cards.slice(0, overIndex),
  //                       activeCard,
  //                       ...list.cards.slice(overIndex),
  //                     ],
  //                   };
  //                 }
  //                 return list;
  //               }),
  //             };
  //           }
  //           return project;
  //         });
  //       }
  //     });
  //   }
  // };
  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId !== overId) {
      const activeList = currentProject.lists.find((list) =>
        list.cards.some((card) => card.id === activeId),
      );
      const overList = currentProject.lists.find((list) => list.id === overId);

      if (!activeList || !overList) return;

      const activeIndex = activeList.cards.findIndex(
        (card) => card.id === activeId,
      );

      const overIndex = overList.cards.findIndex((card) => card.id === overId);

      let updatedProject;

      // Same list: Move the card within the same list
      console.log("activeList", activeList.id);
      console.log("overList", overList.id);

      if (activeList.id === overList.id) {
        const updatedCards = arrayMove(
          activeList.cards,
          activeIndex,
          overIndex,
        );

        const updatedProject = {
          ...currentProject,
          lists: currentProject.lists.map((list) => {
            if (list.id === activeList.id) {
              return {
                ...list,
                cards: updatedCards,
              };
            }
            return list;
          }),
        };

        dispatch(updateProject(updatedProject));
      }
      // Different lists: Move the card to another list
      else {
        const activeCard = activeList.cards[activeIndex];
        updatedProject = {
          ...currentProject,
          lists: currentProject.lists.map((list) => {
            if (list.id === activeList.id) {
              return {
                ...list,
                cards: list.cards.filter((card) => card.id !== activeId),
              };
            } else if (list.id === overList.id) {
              return {
                ...list,
                cards: [
                  ...list.cards.slice(0, overIndex),
                  activeCard,
                  ...list.cards.slice(overIndex),
                ],
              };
            }
            return list;
          }),
        };
      }

      // Dispatch the updated project to Redux
      dispatch(updateProject(updatedProject));
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

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
    setDropdownListId(null),
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

  useEffect(() => {
    const preventScroll = (e) => {
      if (e.key === " " || e.keyCode === 32) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", preventScroll);

    return () => {
      window.removeEventListener("keydown", preventScroll);
    };
  }, []);
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

  /*
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

  const renderCard = (cardId) => {
    const card = currentProject.lists
      .flatMap((list) => list.cards)
      .find((card) => card.id === cardId);

    if (!card) return null;

    const isDragging = activeId === cardId;

    return (
      <Card
        card={card}
        users={users}
        assigned={card.assigned}
        list={currentProject.lists.find((list) =>
          list.cards.some((c) => c.id === cardId),
        )}
        project={currentProject}
        // setProjects={setProjects}
        setSmallTags={setSmallTags}
        smallTags={smallTags}
        setSelectedList={setSelectedList}
        setIsModalOpen={setIsModalOpen}
        setIsCardEditing={setIsCardEditing}
        setSelectedCard={setSelectedCard}
        className={`overflow-visible ${isDragging ? "opacity-50 rotate-[7deg]" : ""} `}
      />
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCorners}
    >
      <div>
        <div
          ref={zoomAreaRef}
          className="flex overflow-x-auto overscroll-y-none smooth-scroll"
        >
          {currentProject.lists.map((list) => (
            <SortableContext
              key={list.id}
              items={currentProject.lists.map((list) => list.id)}
              strategy={verticalListSortingStrategy}
            >
              <List
                key={list.id}
                list={list}
                projects={projects}
                projectId={projectId}
                currentProject={currentProject}
                users={users}
                // setProjects={setProjects}
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
                activeId={activeId}
              />
            </SortableContext>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId ? renderCard(activeId) : null}
          </DragOverlay>

          <AddCardModalContainer
            isOpen={isModalOpen}
            onClose={closeModal}
            users={users}
            list={selectedList}
            projects={projects}
            // setProjects={setProjects}
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
            // setProjects={setProjects}
          />
        </div>
        <div className="fixed bottom-6 right-12">
          <button onClick={() => setZoom(!zoom)}>
            <img src={zoom ? ZoomOut : ZoomIn} alt="zoom" className="w-10" />
          </button>
        </div>
      </div>
    </DndContext>
  );
};

export default ProjectDetails;
