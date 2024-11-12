import PropTypes from "prop-types";

const ListItem = ({ onClick, text, className }) => (
  <button
    onClick={onClick}
    className={`flex items-center hover:bg-primary p-2 rounded ${className}`}
  >
    {text}
  </button>
);

export default ListItem;

ListItem.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
};
