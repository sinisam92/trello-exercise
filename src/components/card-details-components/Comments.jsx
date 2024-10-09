import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";

import CommentIcon from "../../assets/icons/comment.svg";
import DotsSmall from "../../assets/icons/dots-small.svg";
import { updateProject } from "../../reducers/projectSlice";
import Avatar from "../common/Avatar";
import ListItem from "../list-components/ListItem";

const Comments = ({
  thisCard,
  users,
  currentUser,
  toggleOptions,
  commentsIconRef,
  openOptions,
  commentsOptionsRef,
  currentProject,
}) => {
  const dispatch = useDispatch();

  const handleDeleteComment = (cardId, commentId) => {
    const updatedLists = currentProject.lists.map((list) => ({
      ...list,
      cards: list.cards.map((card) => {
        if (card.id === cardId) {
          const updatedComments = card.comments.filter(
            (comment) =>
              !(
                comment.user === currentUser.username &&
                comment.id === commentId
              ),
          );
          return { ...card, comments: updatedComments };
        }
        return card;
      }),
    }));

    const updatedProject = {
      ...currentProject,
      lists: updatedLists,
    };

    dispatch(updateProject(updatedProject));
  };

  return (
    <>
      <div className="flex-shrink-0">
        <img
          src={CommentIcon}
          alt="comment icon"
          className="w-[34px] h-[25px]"
        />
      </div>
      <div className="w-full">
        <h2 className="mb-3">Activity</h2>
        {thisCard.comments.length === 0 ? (
          <p>No activity yet.</p>
        ) : (
          <ul>
            {thisCard.comments.map((comment) => {
              const commentUser = users.find(
                (user) => user.username === comment.user,
              );
              return (
                <li key={comment.id} className="flex mb-4">
                  {commentUser && (
                    <Avatar
                      avatarUrl={commentUser.avatarUrl}
                      username={commentUser.username}
                      defaultAvatar={commentUser.defaultAvatar}
                      size={3}
                    />
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
                      <div
                        dangerouslySetInnerHTML={{ __html: comment.text }}
                        className="bg-slate-300 rounded-[4px] p-2"
                      ></div>
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
                          <ListItem
                            text="Delete"
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() =>
                              handleDeleteComment(thisCard.id, comment.id)
                            }
                          />
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
    </>
  );
};

export default Comments;

Comments.propTypes = {
  thisCard: PropTypes.object,
  users: PropTypes.array,
  currentUser: PropTypes.object,
  toggleOptions: PropTypes.func,
  commentsIconRef: PropTypes.object,
  currentProject: PropTypes.object,
  openOptions: PropTypes.string,
  commentsOptionsRef: PropTypes.object,
  handleDeleteComment: PropTypes.func,
};
