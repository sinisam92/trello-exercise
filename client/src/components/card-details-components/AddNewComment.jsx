import moment from "moment";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Post from "../../assets/icons/post.svg";
import { updateProject } from "../../reducers/projectSlice";
import Avatar from "../common/Avatar";

const AddNewComment = ({ currentUser, projects, project, list, thisCard }) => {
  const [commentText, setCommentText] = useState("");

  const quillRef = useRef(null);
  const dispatch = useDispatch();

  const handleSetCommentText = (text) => {
    setCommentText(text);
  };

  const handleAddComment = (projectId, listId, cardId, commentText) => {
    const updatedProject = projects.find((project) => project.id === projectId);

    if (!updatedProject) return;

    const updatedLists = updatedProject.lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map((card) => {
            if (card.id === cardId) {
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
        };
      }
      return list;
    });

    const updatedProjectData = {
      ...updatedProject,
      lists: updatedLists,
    };

    dispatch(updateProject(updatedProjectData));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() === "") return;
    handleAddComment(project.id, list.id, thisCard.id, commentText);
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
};
