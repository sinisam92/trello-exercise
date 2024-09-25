import React from "react";

const Avatar = ({ avatarUrl, username, defaultAvatar, onClick, size }) => {
    const avatarContent = avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${username}'s Avatar`}
          className={`rounded-full min-w-${size} w-${size} h-${size} object-cover mr-2`}
        />
      ) : (
        <div className={`bg-[#F4A261] rounded-full min-w-${size} w-${size} h-${size} flex items-center justify-center mr-2`}>
          <span className="text-white text-4xl font-bold">
            {defaultAvatar}
          </span>
        </div>
      );
    
      return onClick ? (
        <button onClick={onClick} className="focus:outline-none">
          {avatarContent}
        </button>
      ) : (
        <div>
          {avatarContent}
        </div>
      );
    };

export default Avatar;