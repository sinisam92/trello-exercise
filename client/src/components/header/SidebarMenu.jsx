import PropTypes from "prop-types";
import React from "react";
import { useLocation } from "wouter";

import Cards from "../../assets/icons/cards.svg";
import Info from "../../assets/icons/info.svg";
import Logout from "../../assets/icons/logout.svg";
import Settings from "../../assets/icons/settings.svg";

const SidebarMenu = ({ currentUser, handleLogout, handleCloseSidebar }) => {
  const [_, navigate] = useLocation();

  const sidebarItems = [
    {
      id: 1,
      icon: Cards,
      text: "My Cards",
      path: `/user/${currentUser.id}/cards`,
    },
    { id: 2, icon: Settings, text: "Settings", path: "/settings" },
    { id: 3, icon: Info, text: "Info", path: "/info" },
    { id: 4, icon: Logout, text: "Logout", path: "/logout" },
  ];

  const handleLinkClick = (path) => {
    handleCloseSidebar();
    navigate(path);
  };

  return (
    <ul className="flex flex-col gap-y-2 mt-4">
      {sidebarItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={
              item.text === "Logout"
                ? handleLogout
                : () => handleLinkClick(item.path)
            }
          >
            <div className="flex items-center gap-x-2">
              <img src={item.icon} alt={item.text} className="w-10" />
              <span>{item.text}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SidebarMenu;

SidebarMenu.propTypes = {
  currentUser: PropTypes.object,
  handleLogout: PropTypes.func,
  handleCloseSidebar: PropTypes.func,
};
