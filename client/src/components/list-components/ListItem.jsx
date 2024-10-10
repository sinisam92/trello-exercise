import PropTypes from "prop-types";
import React from "react";

const ListItem = ({ onClick, text, className }) => (
  <li
    onClick={onClick}
    className={`flex items-center hover:bg-primary p-2 rounded ${className}`}
  >
    {text}
  </li>
);

export default ListItem;

ListItem.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
};
