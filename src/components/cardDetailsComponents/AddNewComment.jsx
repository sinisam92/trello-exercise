import React, { useState, useRef } from "react";
import Avatar from "../Avatar";
import Post from "../../assets/icons/post.svg";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const AddNewComment = ({
  currentUser,
  projects,
  project,
  setProjects,
  list,
  thisCard,
}) => {
  const [commentText, setCommentText] = useState("");

  const quillRef = useRef(null);

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
        {/* <textarea
          className="w-full h-[25px] focus:outline-none resize-none"
          placeholder="Write your comment here..."
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea> */}

        <ReactQuill
          ref={quillRef}
          theme="bubble"
          value={commentText}
          onChange={setCommentText}
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
