import React from "react";

const Avatar = ({ avatarUrl, username, defaultAvatar, onClick, size }) => {

  const circleSize = `${size}rem`;
  const contentSize = `${size * 0.7}rem`;
  
  const avatarContent = avatarUrl ? (
    <img
      src={avatarUrl}
      alt={`${username}'s Avatar`}
      className={`rounded-full  object-cover mr-2`}
      style={{ width: circleSize, height: circleSize }}
    />
  ) : (
    <div
      className={`bg-[#F4A261] rounded-full  flex items-center justify-center mr-2"`}
      style={{ width: circleSize, height: circleSize }}
    >
      <span className="text-white font-bold" style={{ fontSize: contentSize }}>
        {defaultAvatar}
      </span>
    </div>
  );

  return onClick ? (
    <button onClick={onClick} className="focus:outline-none">
      {avatarContent}
    </button>
  ) : (
    <div>{avatarContent}</div>
  );
};

export default Avatar;
