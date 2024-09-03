import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Bell from "./assets/icons/bell.svg";
import BellFilled from "./assets/icons/bell-filled.svg";
import Menu from "./assets/icons/menu.svg";
import Return from "./assets/icons/return.svg";
import Search from "./assets/icons/search.svg";
import Close from "./assets/icons/close.svg";
import Info from "./assets/icons/info.svg";
import Logout from "./assets/icons/logout.svg";
import Settings from "./assets/icons/settings.svg";
import Cards from "./assets/icons/cards.svg";
import profilImage from "../stories/assets/images/profile.jpg";
import { Button } from "./Button";
import { useLocation } from "wouter";
import presentationData from "../data/presentationData";
import { dynamicFontForLongStrings } from "../utils/helperFunctions";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export const Header = ({ hasNotification, setIsChildMenuOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);

  const [location, navigate] = useLocation();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser.username;
  const usernameForAt = username.toLowerCase().replace(" ", "-");

  const { logout } = useAuth();

  useEffect(() => {
    const pathParts = location.split("/");
    const idFromUrl = pathParts[pathParts.length - 1];
    setId(idFromUrl);

    const project = presentationData.find(
      (project) => project.id === parseInt(idFromUrl, 10)
    );
    if (project) {
      setTitle(project.name);
    } else {
      const formattedTitle =
        location.replace("/", "").charAt(0).toUpperCase() + location.slice(2);
      setTitle(formattedTitle);
    }
  }, [location]);

  const onMenuClick = () => {
    setIsMenuOpen(true);
    setIsChildMenuOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsMenuOpen(false);
    setIsChildMenuOpen(false);
  };

  const onBellClick = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  const onSearchClick = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  const handleReturn = () => {
    navigate("/projects");
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsChildMenuOpen(false);
    logout();
    navigate(path);
  };

  const handleLinkClick = (path) => {
    handleCloseSidebar(); 
    navigate(path); 
  };
  const openSidebarVariant = {
    open: {
      opacity: 1,
      x: 1,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
    closed: {
      opacity: 0,
      x: "100%",
    },
  };

  return (
    <>
      <header className="relative border-b px-2 py-5 h-[104px]">
        <div
          className={`flex justify-between items-center ${isMenuOpen ? " blur-sm" : ""}`}
        >
          <div className="flex items-center gap-x-4 flex-grow">
            {location === "/projects" ? (
              <>
                <div>
                  <button>
                    <img
                      onClick={onBellClick}
                      src={hasNotification ? BellFilled : Bell}
                      alt="Notification Bell"
                    />
                  </button>
                </div>
                <div>
                  <button onClick={onSearchClick}>
                    <img src={Search} alt="Search Icon" />
                  </button>
                </div>
              </>
            ) : (
              <div>
                <button>
                  <img onClick={handleReturn} src={Return} alt="Return" />
                </button>
              </div>
            )}
          </div>
          <div className="flex-grow-[2] w-1/2 text-center">
            {isSearchOpen ? (
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-disabled w-full h-5 py-5 rounded-md px-4 focus:border-primary focus:outline-none"
                />
              </div>
            ) : (
              <h1
                className={`${dynamicFontForLongStrings(title, 20, 15)} absolute left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2 `}
              >
                {title}
              </h1>
            )}
          </div>
          <div className={`flex-grow flex-end text-right `}>
            {location === "/projects" ? (
              <button onClick={onMenuClick}>
                <img src={Menu} alt="Menu Icon" />
              </button>
            ) : (
              <div>
                <button>
                  <img
                    onClick={onBellClick}
                    src={hasNotification ? BellFilled : Bell}
                    alt="Notification Bell"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className={
            isMenuOpen ? "absolute top-0 left-0 h-screen w-screen z-20" : ""
          }
          onClick={handleCloseSidebar}
        ></div>
        <motion.section
          className={`${!isMenuOpen && "hidden"} absolute z-40 right-0 top-0 w-[330px] h-screen bg-white border-l border-primary`}
          animate={isMenuOpen ? "open" : "closed"}
          variants={openSidebarVariant}
          style={{ overflow: "hidden" }}
        >
          <aside className="">
            <div className="bg-[#2A9D8F] pb-5">
              <div className="flex justify-between pt-11 px-1 items-start ">
                <div className="pb-[22px]">
                  <img
                    src={profilImage}
                    alt="Avatar"
                    className="rounded-full w-20 h-20 object-cover "
                  />
                </div>
                <button onClick={handleCloseSidebar}>
                  <img src={Close} alt="close button" />
                </button>
              </div>
              <div className="px-1">
                <h3>{username}</h3>
                <h3>@{usernameForAt}</h3>
              </div>
            </div>
            <nav className="px-1 ">
              <ul className="flex flex-col gap-y-2">
                <li>
                  <button onClick={() => handleLinkClick("#")}>
                    <div className="flex items-center gap-x-2">
                      <img src={Cards} alt="cards" />
                      <span>My Cards</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick("/settings")}>
                    <div className="flex items-center gap-x-2">
                      <img src={Settings} alt="setting" />
                      <span>Settings</span>
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick("#")}>
                    <div className="flex items-center gap-x-2">
                      <img src={Info} alt="info" />
                      <span>Info</span>
                    </div>
                  </button>
                </li>
                <li className="py-1">
                  <button onClick={handleLogout}>
                    <div className="flex items-center gap-x-2">
                      <img src={Logout} alt="logout" />
                      <span>Logout</span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
        </motion.section>
      </header>
    </>
  );
};
Header.propTypes = {
  username: PropTypes.string,
  hasNotification: PropTypes.bool,
  onClick: PropTypes.func,
};

// Header.defaultProps = {
//   user: null,
// };
