import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "wouter";

import Comment from "../../assets/icons/comment.svg";
import Dots from "../../assets/icons/dots.svg";
import useClickOutside from "../../hooks/useClickOutside";
import { deleteCard } from "../../reducers/cardSlice";
import { fetchUsersByIds } from "../../reducers/userSlice";
import Tag from "../card-details-components/Tag";
import Avatar from "../common/Avatar";
import ListItem from "../list-components/ListItem";

const Card = ({
  card,
  userId,
  list,
  // setProjects,
  project,
  setSmallTags,
  smallTags,
  setSelectedList,
  setIsModalOpen,
  setIsCardEditing,
  setSelectedCard,
  className,
  setProjectCards,
  // projectId,
}) => {
  const dispatch = useDispatch();
  const { usersByIds } = useSelector((state) => state.users);

  const [openCardOptionsId, setOpenCardOptionsId] = useState(null);

  const [_, location] = useLocation();
  const cardOptionsRef = useRef(null);
  const optionsIconRef = useRef(null);

  const getAssignedUsers = useCallback(async () => {
    if (project && project.membersId) {
      try {
        await dispatch(fetchUsersByIds(project.membersId)).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, project]);

  useEffect(() => {
    getAssignedUsers();
    // if (project && project.membersId) {
    //   try {
    //     dispatch(fetchUsersByIds(project.membersId)).unwrap();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  }, [getAssignedUsers]);

  // console.log("card", card);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: card._id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  useClickOutside([cardOptionsRef, optionsIconRef], () =>
    setOpenCardOptionsId(null),
  );

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

  const handleDeleteCard = (e, cardId) => {
    e.preventDefault();
    setProjectCards((prev) => prev.filter((card) => card._id !== cardId));
    dispatch(deleteCard(cardId));

    setOpenCardOptionsId(null);
  };

  const handleSmallThingsToggle = (e) => {
    e.preventDefault();
    setSmallTags((prev) => !prev);
  };

  const isPastDue = moment(card.dueDate).isBefore(moment(), "day");
  return (
    <div
      key={card._id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      id={card._id}
      className={` bg-secundary min-w-[250px] max-w-[250px] text-white p-4 rounded-lg m-4 ${className}`}
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
            {usersByIds &&
              usersByIds.map((assignedUser) => {
                if (card.assigned.includes(assignedUser._id))
                  return (
                    <Avatar
                      key={assignedUser._id}
                      avatarUrl={assignedUser.avatarUrl}
                      username={assignedUser.username}
                      defaultAvatar={assignedUser.defaultAvatar}
                      size={2.3} // in rem
                    />
                  );
              })}
          </div>
        </div>
        {location === `/user/${userId}/cards` ? null : (
          <div className="relative h-full flex flex-col justify-between min-w-7">
            <button
              onClick={(e) => handleCardOptions(e, card._id)}
              className="flex flex-shrink-0"
            >
              <img
                ref={optionsIconRef}
                src={Dots}
                alt="option dots"
                className="w-7"
              />
            </button>
          </div>
        )}
        {openCardOptionsId === card._id && (
          <div
            ref={cardOptionsRef}
            className="absolute top-10 right-[80px] w-24 bg-primaryHover rounded-lg z-50"
          >
            <ul className="py-2 text-white text-lg">
              <ListItem onClick={(e) => openModal(e, card, list)} text="Edit" />
              <ListItem
                onClick={(e) => handleDeleteCard(e, card._id)}
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
    _id: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array,
    comments: PropTypes.array,
    dueDate: PropTypes.string,
    assigned: PropTypes.array,
  }),
  userId: PropTypes.string,
  projectMembers: PropTypes.array,
  list: PropTypes.object,
  setProjects: PropTypes.func,
  project: PropTypes.object,
  setSmallTags: PropTypes.func,
  smallTags: PropTypes.bool,
  setSelectedList: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  setIsCardEditing: PropTypes.func,
  setSelectedCard: PropTypes.func,
  className: PropTypes.string,
  projectId: PropTypes.string,
  setProjectCards: PropTypes.func,
};
