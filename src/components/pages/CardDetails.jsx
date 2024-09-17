import { useState, useRef } from "react";
import { useParams } from "wouter";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Description from "../../assets/icons/description.svg";
import Tags from "../../assets/icons/tags.svg";
import Assigned from "../../assets/icons/assigned.svg";
import Clock from "../../assets/icons/clock2.svg";
import Comment from "../../assets/icons/comment.svg";
import Post from "../../assets/icons/post.svg";
import DotsSmall from "../../assets/icons/dots-small.svg";
import useProjects from "../../hooks/useProjects";
import useUsers from "../../hooks/useUsers";
import useClickOutside from "../../hooks/useClickOutside";
import Tag from "../Tag";

const CardDetails = () => {
  const [commentText, setCommentText] = useState("");
  const [openOptions, setOpenOptions] = useState(null);

  const commentsOptionsRef = useRef(null);
  const commentsIconRef = useRef(null);

  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { projects, setProjects } = useProjects();
  const { users, currentUser } = useUsers();

  const { cardId, projectId } = useParams();

  const allCards = projects.flatMap((project) =>
    project.lists.flatMap((list) => list.cards)
  );
  const thisCard = allCards.find((card) => card.id === cardId);

  const project = projects.find((project) =>
    project.lists.some((list) => list.cards.includes(thisCard))
  );
  const list = project.lists.find((list) => list.cards.includes(thisCard));

  const thisCardsAssigned = thisCard.assigned
    .map((person) => {
      const user = users.find((user) => user.username === person);
      return user;
    })
    .filter((user) => user !== undefined);

  const toggleOptions = (e, commentId) => {
    e.preventDefault();
    setOpenOptions((prevOpen) => (prevOpen === commentId ? null : commentId));
  };

  const handleAddComment = (projectId, listId, cardId, commentText) => {
    const updatedProjects = projects.map((project) => ({
      ...project,
      lists: project.lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) => {
          if (
            project.id === projectId &&
            list.id === listId &&
            card.id === cardId
          ) {
            const newComment = {
              id: uuidv4(),
              text: commentText,
              user: currentUser.username,
              dateAdded: moment().toISOString(),
            };

            return {
              ...card,
              comments: [...(card.comments || []), newComment],
            };
          }
          return card;
        }),
      })),
    }));

    setProjects(updatedProjects);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    handleAddComment(project.id, list.id, thisCard.id, commentText);
    e.target[0].value = "";
    window.scrollTo(0, document.body.scrollHeight);
  };

  useClickOutside([commentsOptionsRef, commentsIconRef], () =>
    setOpenOptions(null)
  );

  const handleDeleteComment = (cardId, commentId) => {
    const updatedProjects = projects.map((project) => ({
      ...project,
      lists: project.lists.map((list) => ({
        ...list,
        cards: list.cards.map((card) => {
          if (card.id !== cardId) return card;

          const updatedComments = card.comments.filter(
            (comment) =>
              !(
                comment.user === currentUser.username &&
                comment.id === commentId
              )
          );
          return { ...card, comments: updatedComments };
        }),
      })),
    }));

    setProjects(updatedProjects);
  };

  // const colors = {
  //   urgent: "bg-myOrange",
  //   critical: "bg-danger",
  //   bug: "bg-myBlue",
  //   feature: "bg-success",
  //   important: "bg-myPurple",
  //   default: "bg-disabled",
  // };

  return (
    <div className="md:w-1/2 md:mx-auto border border-primary bg-[#EDEADE] my-10 drop-shadow-lg shadow-lg">
      <section className="relative h-[150px] text-4xl bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 flex items-center pl-3 ">
        {thisCard.title}
        <div className="absolute bottom-2">
          <h3 className="text-sm">
            Project <span className="text-white">{project.name}</span> in list
            <span className="text-white">{list.name}</span>
          </h3>
        </div>
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <div className="flex-shrink-0">
          <img src={Description} alt="description icon" />
        </div>
        <div>
          <h2 className="mb-3">Description</h2>
          {thisCard.description ? (
            <p>{thisCard.description}</p>
          ) : (
            <p>No description.</p>
          )}
        </div>
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <div className="flex-shrink-0">
          <img src={Tags} alt="tags icon" />
        </div>
        <div>
          <h2 className="mb-3">Tags</h2>
          {thisCard.tags.length === 0 ? (
            <p>No tags added.</p>
          ) : (
            <div className="flex flex-wrap gap-y-2">
              {thisCard.tags.map((tag) => {
                return (
                  // <span
                  //   key={tag}
                  //   className={`text-white ${colors[tag]} p-2 rounded-lg mr-2 `}
                  // >
                  //   {tag}
                  // </span>
                  <Tag key={tag} tag={tag} className="p-2 rounded-lg mr-2" />
                );
              })}
            </div>
          )}
        </div>
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <div className="flex-shrink-0">
          <img src={Assigned} alt="assigned icon" />
        </div>
        <div>
          <h2 className="mb-3">Assigned</h2>
          {thisCardsAssigned.length === 0 ? (
            <p>No one assigned yet.</p>
          ) : (
            <div className="flex gap-x-3">
              {thisCardsAssigned.map((person) =>
                person.avatarUrl ? (
                  <div key={person.id}>
                    <img
                      src={person.avatarUrl}
                      alt="Avatar"
                      className="rounded-full w-16 h-16 object-cover "
                    />
                  </div>
                ) : (
                  <div
                    key={person.id}
                    className="bg-[#F4A261] rounded-full w-16 h-16 flex items-center justify-center"
                  >
                    <span className="text-white text-4xl font-bold">
                      {person.defaultAvatar}
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <div className="flex-shrink-0">
          <img src={Clock} alt="clock icon" />
        </div>
        <div>
          <h2 className="mb-3">Timestamps</h2>

          <p>Created: {moment(thisCard.dateAdded).format("llll")}</p>
          {thisCard.dueDate && (
            <p>Duo Date: {moment(thisCard.dueDate).format("llll")}</p>
          )}
        </div>
      </section>
      <section className="flex p-4 border-b-[1px] border-black items-start">
        <div className="flex-shrink-0">
          <img src={Comment} alt="comment icon" className="w-[34px] h-[25px]" />
        </div>
        <div className="w-full">
          <h2 className="mb-3">Activity</h2>
          {thisCard.comments.length === 0 ? (
            <p>No activity yet.</p>
          ) : (
            <ul>
              {thisCard.comments.map((comment) => {
                const commentUser = users.find(
                  (user) => user.username === comment.user
                );
                return (
                  <li key={comment.id} className="flex  mb-4">
                    {commentUser && commentUser.avatarUrl ? (
                      <img
                        src={commentUser.avatarUrl}
                        alt="Avatar"
                        className="rounded-full w-12 h-12 object-cover mr-4"
                      />
                    ) : (
                      <div className="bg-[#F4A261] rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <span className="text-white text-2xl font-bold w-[50px] h-[50px] flex items-center justify-center">
                          {commentUser.defaultAvatar}
                        </span>
                      </div>
                    )}
                    <div className="flex w-full justify-between items-start">
                      <div className="break-words">
                        <h3>{commentUser.username}</h3>

                        {comment.dateAdded && (
                          <p className="text-black text-sm">
                            {moment(comment.dateAdded).format("DD.MMM.Y") +
                              " at " +
                              moment(comment.dateAdded).format("HH:mm")}
                          </p>
                        )}
                        <p className="bg-slate-300 rounded-[4px] p-2">
                          {comment.text}
                        </p>
                      </div>
                      {currentUser.username === comment.user && (
                        <div className="flex flex-shrink-0 mt-8">
                          <button
                            onClick={(e) => toggleOptions(e, comment.id)}
                            className="cursor-pointer"
                          >
                            <img
                              ref={commentsIconRef}
                              src={DotsSmall}
                              alt="small dots icon"
                            />
                          </button>
                        </div>
                      )}
                      {openOptions === comment.id && (
                        <div
                          ref={commentsOptionsRef}
                          className="absolute right-12 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                        >
                          <ul>
                            <li
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleDeleteComment(thisCard.id, comment.id)
                              }
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
      <section className="sticky bottom-0 bg-white">
        <div className="flex gap-x-2 p-3">
          {currentUser.avatarUrl ? (
            <img
              src={currentUser.avatarUrl}
              alt={`${currentUser.username}'s Avatar`}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          ) : (
            <div className="bg-[#F4A261] rounded-full  flex items-center justify-center mr-4">
              <span className="text-white text-2xl font-bold w-[50px] h-[50px] flex items-center justify-center">
                {currentUser.defaultAvatar}
              </span>
            </div>
          )}
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className="flex items-center w-full h-[50px] border border-black rounded-full p-4"
          >
            <textarea
              className="w-full h-[25px] focus:outline-none resize-none"
              placeholder="Write your comment here..."
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button type="submit" className="text-white rounded-full">
              <img src={Post} alt="sent comment" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CardDetails;
