import React from 'react';
import CommentIcon from '../../assets/icons/comment.svg';
import DotsSmall from '../../assets/icons/dots-small.svg';
import moment from 'moment';
import Avatar from '../Avatar';
import ListItem from '../ListItem';



const Comments = ({
    thisCard,
    users,
    currentUser,
    toggleOptions,
    commentsIconRef,
    openOptions,
    commentsOptionsRef,
    handleDeleteComment,
}) => {
  return (
    <>
        <div className="flex-shrink-0">
          <img src={CommentIcon} alt="comment icon" className="w-[34px] h-[25px]" />
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
                        {/* <p className="bg-slate-300 rounded-[4px] p-2">
                          {comment.text}
                        </p> */}
                        <div dangerouslySetInnerHTML={{ __html: comment.text }} className="bg-slate-300 rounded-[4px] p-2"></div>
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
  )
}

export default Comments;