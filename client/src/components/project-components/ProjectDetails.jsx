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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ZoomIn from "../../assets/icons/zoomIn.svg";
import ZoomOut from "../../assets/icons/zoomOut.svg";
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

  const zoomAreaRef = useRef(null);

  const getProjects = useCallback(async () => {
    if (projectId) {
      await dispatch(fetchProject(projectId)).unwrap();
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

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
        list.cards.some((card) => card.id === activeId),
      );
      const overList = currentProject.lists.find((list) => list.id === overId);

      if (!activeList || !overList) return;

      const activeIndex = activeList.cards.findIndex(
        (card) => card.id === activeId,
      );
      const overIndex = overList.cards.findIndex((card) => card.id === overId);

      const updatedProject = {
        ...currentProject,
        lists: currentProject.lists.map((list) => {
          if (list.id === activeList.id) {
            return {
              ...list,
              cards:
                list.id === overList.id
                  ? arrayMove(list.cards, activeIndex, overIndex)
                  : list.cards.filter((card) => card.id !== activeId),
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

  const renderCard = (cardId) => {
    const card = currentProject.lists
      .flatMap((list) => list.cards)
      .find((card) => card._id === cardId);
    console.log("card", card);

    if (!card) return null;

    const isDragging = activeId === cardId;

    return (
      <Card
        card={card}
        userId={user._id}
        list={currentProject.lists.find((list) =>
          list.cards.some((c) => c.id === cardId),
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
          {currentProject.lists.map((list) => (
            <SortableContext
              key={list.id}
              items={list.cards.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              <List
                list={list}
                projectId={projectId}
                currentProject={currentProject}
                // users={users}
                setSmallTags={setSmallTags}
                smallTags={smallTags}
                setSelectedList={setSelectedList}
                setIsModalOpen={setIsModalOpen}
                setIsCardEditing={setIsCardEditing}
                setSelectedCard={setSelectedCard}
              />
            </SortableContext>
          ))}
          <DragOverlay dropAnimation={defaultDropAnimation}>
            {activeId ? renderCard(activeId) : null}
          </DragOverlay>

          <AddNewList projectId={projectId} />
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
        projectId={currentProject.id}
        isCardEditing={isCardEditing}
        selectedCard={selectedCard}
        setIsCardEditing={setIsCardEditing}
      />
    </DndContext>
  );
};

export default ProjectDetails;

ProjectDetails.propTypes = {
  projectId: PropTypes.string.isRequired,
};
