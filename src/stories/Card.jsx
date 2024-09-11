import { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import PropTypes from "prop-types";
import Dots from "../assets/icons/dots.svg";
import Move from "../assets/icons/move.svg";
import Comment from "../assets/icons/comment.svg";
import moment from "moment";

const Card = ({
  card,
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
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const [isMoveMenuOpen, setIsMoveMenuOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const assigned = card.assigned;
  // const assignedUsers = users.filter((user) =>
  //   assigned.includes(user.username)
  // );

  const { projectId, userId } = useParams();
  const [location, navigation] = useLocation();
  console.log(useParams());
  console.log(projectId);
  const cardOptionsRef = useRef(null);
  const optionsIconRef = useRef(null);
  const moveIconRef = useRef(null);
  const moveMenuRef = useRef(null);

  // const handleStatusChange = (newStatus) => {
  //   updateCardStatus(card.id, newStatus);
  // };

  const handleClickOutside = (event) => {
    if (
      cardOptionsRef.current &&
      !cardOptionsRef.current.contains(event.target) &&
      optionsIconRef.current &&
      !optionsIconRef.current.contains(event.target)
    ) {
      setOpenCardOptionsId(null);
    }
  };
  const handleMoveMenuClickOutside = (event) => {
    if (
      moveMenuRef.current &&
      !moveMenuRef.current.contains(event.target) &&
      moveIconRef.current &&
      !moveIconRef.current.contains(event.target)
    ) {
      setIsMoveMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleMoveMenuClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleMoveMenuClickOutside);
    };
  }, []);

  const colors = {
    urgent: "bg-myOrange",
    critical: "bg-danger",
    bug: "bg-myBlue",
    feature: "bg-success",
    important: "bg-myPurple",
    default: "bg-disabled",
  };

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
    setOpenCardOptionsId((prev) => (prev === cardId ? null : cardId));
  };

  const handleDeleteCard = (e, listId, cardId) => {
    e.preventDefault();
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            lists: project.lists.map((list) => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: list.cards.filter((card) => card.id !== cardId),
                };
              }
              return list;
            }),
          };
        }
        return project;
      });

      return updatedProjects;
    });
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
    console.log("Move card", cardId);
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
      className=" bg-primary min-w-[300px] text-white p-4 rounded-lg m-4 "
    >
      <div className=" flex justify-between items-center">
        <div>
          {card.tags && (
            <div className="flex gap-2 flex-wrap">
              {card.tags.map((tag) => {
                return (
                  <span
                    key={tag}
                    onClick={(e) => handleSmallThingsToggle(e)}
                    className={`text-white transition-transform duration-300 ease-in-out transform ${smallTags ? "scale-90 px-4 py-2" : "px-2 py-1"}  rounded-md text-xs mb-2 ${colors[tag]}`}
                  >
                    {smallTags ? null : tag}
                  </span>
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
            <button
              className="absolute -bottom-14"
              onClick={(e) => handleOpenMoveMenu(e, card.id)}
            >
              <img
                ref={moveIconRef}
                src={Move}
                alt="move dots"
                className=" mb-2"
              />
            </button>
          </div>
        )}
        {isMoveMenuOpen && (
          <div
            ref={moveMenuRef}
            className="absolute top-0 right-10 bg-white text-black border rounded "
          >
            <ul className="list-none px-2">
              {project.lists.map((list) => (
                <li
                  key={list.id}
                  className="px-2 py-1 cursor-pointer hover:bg-gray-200"
                  onClick={(e) => handleMoveCard(e, list.id)}
                >
                  {list.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {openCardOptionsId === card.id && (
          <div
            ref={cardOptionsRef}
            className="absolute top-10 right-0 w-24 bg-primaryHover rounded-lg z-50"
          >
            <ul className="py-2 text-white text-lg">
              <li
                onClick={(e) => openModal(e, card, list)}
                className="flex items-center hover:bg-primary p-2 rounded"
              >
                Edit
              </li>
              <li
                onClick={(e) => handleDeleteCard(e, list.id, card.id)}
                className="flex items-center hover:bg-primary p-2 rounded"
              >
                Delete
              </li>
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
  assigned: PropTypes.array,
  list: PropTypes.object,
  setProjects: PropTypes.func,
  setSmallTags: PropTypes.func,
  smallTags: PropTypes.bool,
  setSelectedList: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  setIsCardEditing: PropTypes.func,
  setSelectedCard: PropTypes.func,
};
