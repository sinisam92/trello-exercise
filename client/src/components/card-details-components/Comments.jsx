import moment from "moment";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import CommentIcon from "../../assets/icons/comment.svg";
import DotsSmall from "../../assets/icons/dots-small.svg";
import { deleteComment } from "../../reducers/commentSlice";
import Avatar from "../common/Avatar";
import ListItem from "../list-components/ListItem";

const Comments = ({
  thisCard,
  currentUser,
  toggleOptions,
  commentsIconRef,
  openOptions,
  commentsOptionsRef,
  usersByIds,
  setUpdatedCurrentCard,
}) => {
  const dispatch = useDispatch();

  const handleDeleteComment = (commentId) => {
    setUpdatedCurrentCard((prevState) => {
      return {
        ...prevState,
        comments: prevState.comments.filter(
          (comment) => comment._id !== commentId,
        ),
      };
    });
    dispatch(deleteComment(commentId));
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
              const commentUser = usersByIds.find(
                (user) => user._id === comment.createdByUserId,
              );
              return (
                <li key={comment._id} className="flex mb-4">
                  {commentUser ? (
                    <Avatar
                      avatarUrl={commentUser.avatarUrl}
                      username={commentUser.username}
                      defaultAvatar={commentUser.defaultAvatar}
                      size={3}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full aspect-square mr-4">
                      <span className="text-3xl text-black font-bold">?</span>
                    </div>
                  )}
                  <div className="flex w-full justify-between items-start">
                    <div className="break-words">
                      <h3>{commentUser?.username || "Unknown user"}</h3>

                      {comment.createdAt && (
                        <p className="text-black text-sm">
                          {moment(comment.createdAt).format("DD.MMM.Y") +
                            " at " +
                            moment(comment.createdAt).format("HH:mm")}
                        </p>
                      )}
                      <div
                        dangerouslySetInnerHTML={{ __html: comment.text }}
                        className="bg-slate-300 rounded-[4px] p-2"
                      ></div>
                    </div>
                    {currentUser._id === comment.createdByUserId && (
                      <div className="flex flex-shrink-0 mt-8">
                        <button
                          onClick={(e) => toggleOptions(e, comment._id)}
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
                    {openOptions === comment._id && (
                      <div
                        ref={commentsOptionsRef}
                        className="absolute right-12 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10"
                      >
                        <ul>
                          <ListItem
                            text="Delete"
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleDeleteComment(comment._id)}
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
  usersByIds: PropTypes.array,
  updatedCurrentCard: PropTypes.object,
  setUpdatedCurrentCard: PropTypes.func,
};
