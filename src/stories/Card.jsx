// import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import moment from "moment";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useLocation, useParams } from "wouter";
import Comment from "../assets/icons/comment.svg";
import Dots from "../assets/icons/dots.svg";
import Move from "../assets/icons/move.svg";
import ListItem from "../components/ListItem";
import Tag from "../components/Tag";
import useClickOutside from "../hooks/useClickOutside";

//TODO: move this to components folder

const Card = ({
  card,
  users,
  list,
  setProjects,
  project,
  setSmallTags,
  smallTags,
  setSelectedList,
  setIsModalOpen,
  setIsCardEditing,
  setSelectedCard,
}) => {
  const [openCardOptionsId, setOpenCardOptionsId] = useState(null);
  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const { projectId, userId } = useParams();
  const [location, navigation] = useLocation();
  const cardOptionsRef = useRef(null);
  const optionsIconRef = useRef(null);
  const moveIconRef = useRef(null);
  const moveMenuRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  useClickOutside([cardOptionsRef, optionsIconRef], () =>
    setOpenCardOptionsId(null)
  );
  useClickOutside([moveMenuRef, moveIconRef], () => setIsMoveMenuOpen(false));

  const openModal = (e, card, list) => {
    e.preventDefault();
    setIsCardEditing(true);
    setSelectedCard(card);
    setSelectedList(list);
    setIsModalOpen(true);
    setOpenCardOptionsId(null);
  };

  const handleCardOptions = (e, cardId) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenCardOptionsId((prev) => (prev === cardId ? null : cardId));
  };

  const handleDeleteCard = (e, listId, cardId) => {
    e.preventDefault();

    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              lists: project.lists.map((list) =>
                list.id === listId
                  ? {
                      ...list,
                      cards: list.cards.filter((card) => card.id !== cardId),
                    }
                  : list
              ),
            }
          : project
      )
    );

    setOpenCardOptionsId(null);
  };

  const handleSmallThingsToggle = (e) => {
    e.preventDefault();
    setSmallTags((prev) => !prev);
  };
  const handleOpenMoveMenu = (e, cardId) => {
    e.preventDefault();
    setSelectedCardId(cardId);
    setIsMoveMenuOpen(true);
  };

  const handleMoveCard = (e, listId) => {
    e.preventDefault();
    if (selectedCardId) {
      setProjects((prevProjects) => {
        return prevProjects.map((proj) => {
          if (proj.id === projectId) {
            let cardToMove;
            let sourceListId;

            const updatedLists = proj.lists.map((list) => {
              const cardIndex = list.cards.findIndex(
                (card) => card.id === selectedCardId
              );
              if (cardIndex !== -1) {
                cardToMove = list.cards[cardIndex];
                sourceListId = list.id;
                return {
                  ...list,
                  cards: list.cards.filter((_, index) => index !== cardIndex),
                };
              }
              return list;
            });

            const targetList = updatedLists.find((list) => list.id === listId);
            if (targetList) {
              targetList.cards.push({ ...cardToMove, status: targetList.name });
            }

            return { ...proj, lists: updatedLists };
          }
          return proj;
        });
      });
      setIsMoveMenuOpen(false);
      setSelectedCardId(null);
    }
  };

  const isPastDue = moment(card.dueDate).isBefore(moment(), "day");
  return (
    <div
      key={card.id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      id={card.id}
      className=" bg-primary min-w-[260px] max-w-[260px] text-white p-4 rounded-lg m-4"
    >
      <div className=" flex justify-between items-center">
        <div>
          {card.tags && (
            <div className="flex gap-2 flex-wrap">
              {card.tags.map((tag) => {
                return (
                  <Tag
                    key={tag}
                    tag={tag}
                    smallTags={smallTags}
                    handleSmallThingsToggle={handleSmallThingsToggle}
                  />
                );
              })}
            </div>
          )}

          <h1 className="text-white text-xl tracking-wide">{card.title}</h1>
          <div className="flex gap-x-4 mt-2">
            {card.comments && (
              <div className="flex gap-x-1">
                <img src={Comment} alt="comment icon" />
                <span className="text-black">{card.comments.length}</span>
              </div>
            )}
            {card.dueDate && (
              <div
                className={`flex gap-x-1 ${isPastDue ? "bg-danger" : "bg-disabled"} px-2 rounded-md`}
              >
                <span>{moment(card.dueDate).format("DD.MMM")}</span>
              </div>
            )}
          </div>
          <div className="flex gap-x-2 mt-6">
            {card.assigned &&
              card.assigned.map((username) => {
                const assignedUser = users.find(
                  (user) => user.username === username
                );
                if (!assignedUser) {
                  console.warn(`No user found for username: ${username}`);
                  return null;
                }
                return assignedUser.avatarUrl ? (
                  <img
                    key={assignedUser.id}
                    src={assignedUser.avatarUrl}
                    alt={assignedUser.username}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ) : (
                  <div
                    key={assignedUser.id}
                    className="bg-[#F4A261] rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <span className="text-white text-2xl font-bold">
                      {assignedUser.defaultAvatar ||
                        assignedUser.username.charAt(0)}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        {location === `/user/${userId}/cards` ? null : (
          <div className="relative h-full flex flex-col justify-between">
            <button
              onClick={(e) => handleCardOptions(e, card.id)}
              className="flex flex-shrink-0"
            >
              <img
                ref={optionsIconRef}
                src={Dots}
                alt="option dots"
                className="w-7"
              />
            </button>
            {/* <button
              className="absolute -bottom-12"
              onClick={(e) => handleOpenMoveMenu(e, card.id)}
            >
              <img
                ref={moveIconRef}
                src={Move}
                alt="move dots"
                className="mb-2"
              />
            </button> */}
          </div>
        )}
        {isMoveMenuOpen && (
          <div
            ref={moveMenuRef}
            className="absolute top-0 right-10 bg-white text-black border rounded "
          >
            <ul className="list-none px-2">
              {project.lists.map((list) => (
                <ListItem
                  key={list.id}
                  text={list.name}
                  onClick={(e) => handleMoveCard(e, list.id)}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                />
              ))}
            </ul>
          </div>
        )}

        {openCardOptionsId === card.id && (
          <div
            ref={cardOptionsRef}
            className="absolute top-10 right-[80px] w-24 bg-primaryHover rounded-lg z-50"
          >
            <ul className="py-2 text-white text-lg">
              <ListItem onClick={(e) => openModal(e, card, list)} text="Edit" />
              <ListItem
                onClick={(e) => handleDeleteCard(e, list.id, card.id)}
                text="Delete"
              />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array,
    comments: PropTypes.array,
    dueDate: PropTypes.string,
    assigned: PropTypes.array,
  }),
};
