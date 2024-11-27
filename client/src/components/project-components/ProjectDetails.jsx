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
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ZoomIn from "../../assets/icons/zoomIn.svg";
import ZoomOut from "../../assets/icons/zoomOut.svg";
import useClickOutside from "../../hooks/useClickOutside";
import { fetchCardsByListsIds } from "../../reducers/cardSlice";
import { fetchListByProjectId } from "../../reducers/listSlice";
import { fetchProject, updateProject } from "../../reducers/projectSlice";
import AddCardModalContainer from "../card-components/AddCardModalContainer";
import Card from "../card-components/Card";
import LifelineLoader from "../common/loaders/lifeline/LifelineLoader";
import AddNewList from "../list-components/AddNewList";
import List from "../list-components/List";

const ProjectDetails = ({ projectId }) => {
  const dispatch = useDispatch();
  const { currentProject, loading, error } = useSelector(
    (state) => state.projects,
  );

  const { user } = useSelector((state) => state.auth);
  const [zoom, setZoom] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardEditing, setIsCardEditing] = useState(false);
  const [smallTags, setSmallTags] = useState(false);
  const [_, setCurrProject] = useState(null);
  const [projectsLists, setProjectsLists] = useState([]);
  const [projectCards, setProjectCards] = useState([]);
  const [dropdownListId, setDropdownListId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const listMenuRef = useRef(null);
  const listMenuIconRef = useRef(null);
  const zoomAreaRef = useRef(null);

  console.log("projectsCards", projectCards);

  const getProject = useCallback(async () => {
    if (projectId) {
      try {
        const action = await dispatch(fetchProject(projectId));
        const currProject = action.payload;
        setCurrProject(currProject);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  const getData = useCallback(async () => {
    if (projectId) {
      try {
        const lists = await dispatch(fetchListByProjectId(projectId)).unwrap();
        if (lists) {
          setProjectsLists(lists);
          const listIds = lists.map((list) => list._id);

          if (listIds.length > 0) {
            const cards = await dispatch(
              fetchCardsByListsIds(listIds),
            ).unwrap();
            if (cards) {
              setProjectCards(cards);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const areaToZoom = zoomAreaRef.current;
    if (areaToZoom) {
      areaToZoom.style.zoom = zoom ? "50%" : "100%";
    }

    return () => {
      if (areaToZoom) {
        areaToZoom.style.zoom = "100%";
      }
    };
  }, [zoom]);

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

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId !== overId) {
      const activeList = currentProject.lists.find((list) =>
        list.cards.some((card) => card._id === activeId),
      );
      const overList = currentProject.lists.find((list) => list.id === overId);

      if (!activeList || !overList) return;

      const activeIndex = activeList.cards.findIndex(
        (card) => card._id === activeId,
      );
      const overIndex = overList.cards.findIndex((card) => card._id === overId);

      const updatedProject = {
        ...currentProject,
        lists: currentProject.lists.map((list) => {
          if (list.id === activeList.id) {
            return {
              ...list,
              cards:
                list.id === overList.id
                  ? arrayMove(list.cards, activeIndex, overIndex)
                  : list.cards.filter((card) => card._id !== activeId),
            };
          } else if (list.id === overList.id && list.id !== activeList.id) {
            return {
              ...list,
              cards: [
                ...list.cards.slice(0, overIndex),
                activeList.cards[activeIndex],
                ...list.cards.slice(overIndex),
              ],
            };
          }
          return list;
        }),
      };

      dispatch(updateProject(updatedProject));
    }
  };
  /**
   * Handles closing the project menu when clicking outside of it
   * @param {Event} event
   */
  useClickOutside([listMenuRef, listMenuIconRef], () =>
    setDropdownListId(null),
  );

  const onDeleteList = (listId) => {
    const updatedLists = projectsLists.filter((list) => list._id !== listId);
    setProjectsLists(updatedLists);
  };

  const toggleDropdown = (listId) => {
    if (dropdownListId === listId && isOpen) {
      setIsOpen(false);
      setDropdownListId(null);
    } else {
      setDropdownListId((prevId) => (prevId === listId ? null : listId));
      setIsOpen(true);
    }
  };

  const renderCard = (cardId) => {
    const card = projectsLists
      .flatMap((list) => list.cards)
      .find((card) => card._id === cardId);

    if (!card) return null;

    const isDragging = activeId === cardId;

    return (
      <Card
        card={card}
        userId={user._id}
        list={projectsLists.find((list) =>
          list.cards.some((c) => c._id === cardId),
        )}
        project={currentProject}
        setSmallTags={setSmallTags}
        smallTags={smallTags}
        setSelectedList={setSelectedList}
        setIsModalOpen={setIsModalOpen}
        setIsCardEditing={setIsCardEditing}
        setSelectedCard={setSelectedCard}
        className={`overflow-visible ${isDragging ? "opacity-50 rotate-[7deg]" : ""}`}
      />
    );
  };

  if (loading) return <LifelineLoader />;
  if (error) return <div>Error: {error}</div>;
  if (!currentProject) return <div>No project found</div>;

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCorners}
    >
      <div>
        <div
          ref={zoomAreaRef}
          className="flex overflow-x-auto overscroll-y-none smooth-scroll"
        >
          {projectsLists.map((list) => (
            <SortableContext
              key={list._id}
              items={projectCards.map((card) => card._id)}
              strategy={verticalListSortingStrategy}
            >
              <List
                list={list}
                cards={projectCards.filter((card) => card.listId === list._id)}
                projectId={projectId}
                currentProject={currentProject}
                setSmallTags={setSmallTags}
                smallTags={smallTags}
                setSelectedList={setSelectedList}
                setIsModalOpen={setIsModalOpen}
                setIsCardEditing={setIsCardEditing}
                setSelectedCard={setSelectedCard}
                toggleDropdown={toggleDropdown}
                dropdownListId={dropdownListId}
                setDropdownListId={setDropdownListId}
                listMenuRef={listMenuRef}
                listMenuIconRef={listMenuIconRef}
                onDeleteList={onDeleteList}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setProjectCards={setProjectCards}
              />
            </SortableContext>
          ))}
          <DragOverlay dropAnimation={defaultDropAnimation}>
            {activeId ? renderCard(activeId) : null}
          </DragOverlay>

          <AddNewList
            projectId={projectId}
            user={user}
            currentProject={currentProject}
            setProjectsLists={setProjectsLists}
            projectsLists={projectsLists}
          />
        </div>
        <div className="fixed bottom-6 right-12">
          <button onClick={() => setZoom(!zoom)}>
            <img src={zoom ? ZoomOut : ZoomIn} alt="zoom" className="w-10" />
          </button>
        </div>
      </div>
      <AddCardModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // users={users}
        list={selectedList}
        projectId={currentProject._id}
        isCardEditing={isCardEditing}
        selectedCard={selectedCard}
        setIsCardEditing={setIsCardEditing}
        setProjectCards={setProjectCards}
        projectCards={projectCards}
        setProjectsLists={setProjectsLists}
      />
    </DndContext>
  );
};

export default ProjectDetails;

ProjectDetails.propTypes = {
  projectId: PropTypes.string.isRequired,
};
