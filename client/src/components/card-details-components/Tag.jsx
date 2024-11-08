import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Tag = ({ tag, handleSmallThingsToggle, smallTags, className }) => {
  const colors = {
    urgent: "bg-myOrange",
    critical: "bg-danger",
    bug: "bg-myBlue",
    feature: "bg-success",
    important: "bg-myPurple",
    default: "bg-disabled",
  };

  const tagClasses = twMerge(
    `text-white transition-transform duration-300 ease-in-out transform ${smallTags ? "scale-90 px-4 py-2" : "px-2 py-1"}  rounded-md text-xs mb-2 ${colors[tag]} ${className}`,
  );

  return (
    <button
      key={tag}
      onClick={handleSmallThingsToggle}
      className={tagClasses}
      aria-label={`Toggle ${tag}`}
    >
      {smallTags ? null : tag}
    </button>
  );
};

export default Tag;

Tag.propTypes = {
  tag: PropTypes.string,
  handleSmallThingsToggle: PropTypes.func,
  smallTags: PropTypes.bool,
  className: PropTypes.string,
};
