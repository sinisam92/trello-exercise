const ListItem = ({ onClick, text, className }) => (
  <li
    onClick={onClick}
    className={`flex items-center hover:bg-primary p-2 rounded ${className}`}
  >
    {text}
  </li>
);

export default ListItem;
