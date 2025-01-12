import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "wouter";

import Bell from "../../assets/icons/bell.svg";
import Menu from "../../assets/icons/menu.svg";
import Return from "../../assets/icons/return.svg";
import Search from "../../assets/icons/search.svg";
import { useAnimation } from "../../contexts/AnimationContext";
import { useSearch } from "../../contexts/SearchContext";
import { dynamicFontForLongStrings } from "../../utils/helperFunctions";
import Sidebar from "./Sidebar";

const Header = ({ setIsChildMenuOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [setIsNotificationOpen] = useState(false);
  const [title, setTitle] = useState("");

  const [location, navigate] = useLocation();

  const currentUser = useSelector((state) => state.auth.user);

  const { searchTerm, setSearchTerm } = useSearch();
  const { currentProject } = useSelector((state) => state.projects);
  const { animationsEnabled } = useAnimation();

  const getParamsFromUrl = () => {
    const parts = location.split("/");
    const projectId = parts[2];
    const cardId = parts[4];
    return { projectId, cardId };
  };
  const { projectId, cardId } = getParamsFromUrl();

  useEffect(() => {
    if (currentProject && location === `/projects/${currentProject?._id}`) {
      setTitle(currentProject.name);
    } else if (location === `/user/${currentUser?._id}/cards`) {
      setTitle(`${currentUser.username}'s Cards`);
    } else {
      setTitle("Projects");
    }
  }, [location, currentProject, currentUser]);

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
    if (!cardId) {
      navigate("/projects");
    } else {
      navigate(`/projects/${projectId}`);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
      <header className="relative border-b px-2 py-5 h-[80px] items-center w-full text-primaryTextColor ">
        <div
          className={`flex justify-between items-center min-h-[42px] ${isMenuOpen ? " blur-sm" : ""}`}
        >
          <div className="flex items-center gap-x-4 flex-grow">
            {location === "/projects" ? (
              <>
                <button onClick={onBellClick} aria-label="Notification Bell">
                  <img src={Bell} alt="Notification Bell" className="w-5" />
                </button>
                <div>
                  <button onClick={onSearchClick}>
                    <img src={Search} alt="Search Icon" className="w-5" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={handleReturn}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleReturn();
                }}
                aria-label="Return"
              >
                <img src={Return} alt="Return" className="w-5" />
              </button>
            )}
          </div>
          <div className="flex-grow-[2] w-1/2 text-center">
            {isSearchOpen ? (
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-disabled w-full text-black h-5 py-5 rounded-md px-4 focus:border-primary focus:outline-none"
                  value={searchTerm}
                  onChange={handleSearchChange}
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
                <img src={Menu} alt="Menu Icon" className="w-5" />
              </button>
            ) : (
              <button onClick={onBellClick} aria-label="Notification Bell">
                <img src={Bell} alt="Notification Bell" className="w-5" />
              </button>
            )}
          </div>
        </div>
        <button
          className={
            isMenuOpen ? "absolute top-0 left-0 h-screen w-screen z-20" : ""
          }
          onClick={handleCloseSidebar}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCloseSidebar();
            }
          }}
          aria-label="Close Sidebar"
        ></button>
        <motion.section
          className={`${!isMenuOpen && "hidden"} absolute z-40 right-0 top-0 w-[320px] h-screen bg-primary border-l border-primaryTextColor `}
          animate={
            animationsEnabled ? (isMenuOpen ? "open" : "closed") : undefined
          }
          variants={openSidebarVariant}
          style={{ overflow: "hidden" }}
        >
          <Sidebar
            setIsChildMenuOpen={setIsChildMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            handleCloseSidebar={handleCloseSidebar}
          />
        </motion.section>
      </header>
    </>
  );
};

export default Header;

Header.propTypes = {
  hasNotification: PropTypes.bool,
  setIsChildMenuOpen: PropTypes.func,
};
