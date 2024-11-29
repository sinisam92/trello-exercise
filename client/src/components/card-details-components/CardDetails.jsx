import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useClickOutside from "../../hooks/useClickOutside";
import { fetchCommentsByCardCommentsIds } from "../../reducers/commentSlice";
import { fetchListById } from "../../reducers/listSlice";
import LifelineLoader from "../common/loaders/lifeline/LifelineLoader";
import AddNewComment from "./AddNewComment";
import Assigned from "./Assigned";
import Comments from "./Comments";
import Description from "./Description";
import Tags from "./Tags";
import Timestap from "./Timestap";

const CardDetails = () => {
  const [openOptions, setOpenOptions] = useState(null);
  const [updatedCurrentCard, setUpdatedCurrentCard] = useState(null);

  const commentsOptionsRef = useRef(null);
  const commentsIconRef = useRef(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { usersByIds } = useSelector((state) => state.users);
  const currentProject = useSelector((state) => state.projects.currentProject);
  const currentCard = useSelector((state) => state.cards.currentCard);
  const currentList = useSelector((state) => state.lists.currentList);
  const [loading, setLoading] = useState(true);
  const [_, setError] = useState(null);

  useEffect(() => {
    setUpdatedCurrentCard(currentCard);
    const fetchList = async () => {
      if (currentCard && currentCard.listId) {
        try {
          await dispatch(fetchListById(currentCard.listId));
          setLoading(false);
        } catch (err) {
          console.error("Error fetching list:", err);
          setError("Failed to load list data");
        }
      }
    };

    fetchList();
  }, [currentCard, dispatch]);

  useEffect(() => {
    const fetchComments = async () => {
      if (currentCard && currentCard.comments) {
        const commentsArray = currentCard.comments.flat();

        try {
          await dispatch(fetchCommentsByCardCommentsIds(commentsArray));
        } catch (err) {
          console.error("Error fetching comments:", err);
          setError("Failed to load comments data");
        }
      }
    };

    fetchComments();
  }, [currentCard]);

  const thisCardsAssigned = () =>
    usersByIds.filter((user) => currentCard?.assigned?.includes(user._id));

  const toggleOptions = (e, commentId) => {
    e.preventDefault();
    setOpenOptions((prevOpen) => (prevOpen === commentId ? null : commentId));
  };

  useClickOutside([commentsOptionsRef, commentsIconRef], () =>
    setOpenOptions(null),
  );

  if (loading) {
    return (
      <div>
        <LifelineLoader />
      </div>
    );
  }

  return (
    <>
      <section className="relative h-[150px] text-4xl bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 flex items-center pl-3 ">
        {currentCard.title}
        <div className="absolute bottom-2">
          <h3 className="text-sm">
            Project <span className="text-white">{currentProject.name}</span> in
            list <span className="text-white">{currentList.name}</span>
          </h3>
        </div>
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <Description thisCard={currentCard} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <Tags thisCard={currentCard} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <Assigned thisCardsAssigned={thisCardsAssigned()} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black">
        <Timestap thisCard={currentCard} />
      </section>
      <section className="flex p-4 border-b-[1px] border-black items-start">
        <Comments
          currentUser={user}
          toggleOptions={toggleOptions}
          openOptions={openOptions}
          commentsOptionsRef={commentsOptionsRef}
          commentsIconRef={commentsIconRef}
          thisCard={updatedCurrentCard}
          setUpdatedCurrentCard={setUpdatedCurrentCard}
          currentProject={currentProject}
          usersByIds={usersByIds}
        />
      </section>
      <section className="sticky bottom-0 bg-white">
        <AddNewComment
          currentUser={user}
          project={currentProject}
          list={currentList}
          thisCard={updatedCurrentCard}
          setUpdatedCurrentCard={setUpdatedCurrentCard}
        />
      </section>
    </>
  );
};

export default CardDetails;
