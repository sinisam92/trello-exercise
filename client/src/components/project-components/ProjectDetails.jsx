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
  const [currProject, setCurrProject] = useState(null);
  const [projectsLists, setProjectsLists] = useState([]);
  const [projectCards, setProjectCards] = useState([]);

  // const [listsWithCards, setListsWithCards] = useState([]);
  // const [isDataFetched, setIsDataFetched] = useState(false);

  const zoomAreaRef = useRef(null);

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
              console.log("cards", cards);
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

  // const getProject = useCallback(async () => {
  //   if (!projectId) return;
  //   try {
  //     const action = await dispatch(fetchProject(projectId));
  //     setCurrProject(action.payload);
  //   } catch (err) {
  //     console.error("Error fetching project:", err);
  //   }
  // }, [dispatch, projectId]);

  // const getData = useCallback(async () => {
  //   if (!projectId) return;
  //   try {
  //     const lists = await dispatch(fetchListByProjectId(projectId)).unwrap();
  //     setProjectsLists(lists);

  //     const listIds = lists.map((list) => list._id);
  //     console.log("listIds", listIds);

  //     if (listIds.length > 0) {
  //       const cards = await dispatch(fetchCardsByListsIds(listIds)).unwrap();
  //       console.log("cardsPROJECT CARDS", cards);

  //       setProjectCards(cards);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }, [dispatch, projectId]);

  // const combineListsAndCards = useCallback(() => {
  //   const cardsById = Object.fromEntries(
  //     projectCards.map((card) => [card._id, card]),
  //   );

  //   const combined = projectsLists.map((list) => ({
  //     ...list,
  //     cards: list.cardIds.map((cardId) => cardsById[cardId]).filter(Boolean),
  //   }));

  //   setListsWithCards(combined);
  //   setIsDataFetched(true);
  // }, [projectsLists, projectCards]);

  // useEffect(() => {
  //   getProject();
  //   getData();
  // }, [getProject, getData]);

  // useEffect(() => {
  //   if (projectsLists.length > 0 && projectCards.length > 0) {
  //     combineListsAndCards();
  //   }
  // }, [projectsLists, projectCards, combineListsAndCards]);

  // useEffect(() => {
  //   console.log("Current Project:", currProject);
  //   console.log("Projects Lists:", projectsLists);
  //   console.log("Project Cards:", projectCards);
  //   console.log("Combined Lists With Cards:", listsWithCards);
  // }, [currProject, projectsLists, projectCards, listsWithCards]);

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
    const card = projectsLists
      .flatMap((list) => list.cards)
      .find((card) => card._id === cardId);

    if (!card) return null;

    const isDragging = activeId === cardId;

    return (
      <Card
        card={card}
        userId={user._id}
        // list={currentProject.lists.find((list) =>
        //   list.cards.some((c) => c.id === cardId),
        // )}
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

  // if (!isDataFetched) {
  //   return <div>Loading...</div>;
  // }

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

          <AddNewList
            projectId={projectId}
            user={user}
            currentProject={currentProject}
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
