import { useState, useRef, useContext } from "react";
import { useParams } from "wouter";
import useProjects from "../hooks/useProjects";
import useClickOutside from "../hooks/useClickOutside";
import { UsersContext } from "../contexts/UsersContext";
import Timestap from "./cardDetailsComponents/Timestap";
import Comments from "./cardDetailsComponents/Comments";
import AddNewComment from "./cardDetailsComponents/AddNewComment";
import Assigned from "./cardDetailsComponents/Assigned";
import Tags from "./cardDetailsComponents/Tags";
import Description from "./cardDetailsComponents/Description";

const CardDetails = () => {
  const [openOptions, setOpenOptions] = useState(null);

  const commentsOptionsRef = useRef(null);
  const commentsIconRef = useRef(null);

  const { projects, setProjects } = useProjects();
  const { users, currentUser } = useContext(UsersContext);

  const { cardId } = useParams();

  const allCards = projects.flatMap((project) => {
    return project.lists.flatMap((list) => list.cards);
  });
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

  return (
    <>
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
        <Description thisCard={thisCard} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <Tags thisCard={thisCard} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <Assigned thisCardsAssigned={thisCardsAssigned} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <Timestap thisCard={thisCard} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black items-start">
        <Comments
          users={users}
          currentUser={currentUser}
          handleDeleteComment={handleDeleteComment}
          toggleOptions={toggleOptions}
          openOptions={openOptions}
          commentsOptionsRef={commentsOptionsRef}
          commentsIconRef={commentsIconRef}
          thisCard={thisCard}
        />
      </section>
      <section className="sticky bottom-0 bg-white">
        <AddNewComment
          currentUser={currentUser}
          projects={projects}
          project={project}
          setProjects={setProjects}
          list={list}
          thisCard={thisCard}
        />
      </section>
    </>
  );
};

export default CardDetails;
