import moment from "moment";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Post from "../../assets/icons/post.svg";
import { createNewComment } from "../../reducers/commentSlice";
import Avatar from "../common/Avatar";

const AddNewComment = ({ currentUser, thisCard, setUpdatedCurrentCard }) => {
  const [commentText, setCommentText] = useState("");

  const quillRef = useRef(null);
  const dispatch = useDispatch();

  const handleSetCommentText = (text) => {
    setCommentText(text);
  };

  const handleAddComment = (commentText) => {
    const newComment = {
      _id: uuidv4(),
      createdByUserId: currentUser._id,
      cardId: thisCard._id,
      text: commentText,
      createdAt: moment().format(),
    };

    const updatedCardData = {
      ...thisCard,
      comments: [...thisCard.comments, newComment],
    };
    setUpdatedCurrentCard(updatedCardData);
    dispatch(createNewComment(newComment));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    handleAddComment(commentText);
    setCommentText("");
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="flex gap-x-2 p-3 items-center">
      <Avatar
        avatarUrl={currentUser.avatarUrl}
        username={currentUser.username}
        defaultAvatar={currentUser.defaultAvatar}
        size={3}
      />
      <form
        onSubmit={(e) => handleFormSubmit(e)}
        className="flex items-center w-full h-[50px] border border-black rounded-full p-4"
      >
        <ReactQuill
          ref={quillRef}
          theme="bubble"
          value={commentText}
          onChange={handleSetCommentText}
          placeholder="Comment"
          className="block w-full h-[40px] focus:outline-none resize-none"
        />
        <button type="submit" className="text-white rounded-full">
          <img src={Post} alt="sent comment" />
        </button>
      </form>
    </div>
  );
};

export default AddNewComment;

AddNewComment.propTypes = {
  currentUser: PropTypes.object,
  projects: PropTypes.array,
  project: PropTypes.object,
  list: PropTypes.object,
  thisCard: PropTypes.object,
  setUpdatedCurrentCard: PropTypes.func,
};
