import PropTypes from "prop-types";
import { useState } from "react";

const Avatar = ({ avatarUrl, username, defaultAvatar, onClick, size }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const circleSize = `${size}rem`;
  const contentSize = `${size * 0.7}rem`;

  const avatarContent = avatarUrl ? (
    <img
      src={avatarUrl}
      alt={`${username}'s Avatar`}
      className={`rounded-full  object-cover mr-6`}
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

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {onClick ? (
        <button onClick={onClick} className="focus:outline-none">
          {avatarContent}
        </button>
      ) : (
        avatarContent
      )}

      {showTooltip && (
        <div
          className="absolute bg-black text-white text-xs rounded px-2 py-1"
          style={{
            bottom: `calc(${circleSize} + 0.5rem)`,
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          {username}
        </div>
      )}
    </div>
  );
};

export default Avatar;

Avatar.propTypes = {
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  defaultAvatar: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.number,
};
