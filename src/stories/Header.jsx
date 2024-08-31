import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Bell from "./assets/icons/bell.svg";
import BellFilled from "./assets/icons/bell-filled.svg";
import Menu from "./assets/icons/menu.svg";
import Return from "./assets/icons/return.svg";
import Search from "./assets/icons/search.svg";
import { Button } from "./Button";
import { useLocation } from "wouter";
import presentationData from "../data/presentationData";
import { dynamicFontForLongStrings } from "../utils/helperFunctions";

export const Header = ({ username, hasNotification }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);

  const [location] = useLocation();
 
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
    setIsMenuOpen((prevState) => !prevState);
  };

  const onBellClick = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  const onSearchClick = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  return (
    <header className="border-b px-2 py-5 h-[104px] relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-4 flex-grow">
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
        <div className="flex-grow flex-end text-right">
          <button onClick={onMenuClick}>
            <img src={Menu} alt="Menu Icon" />
          </button>
        </div>
      </div>
      {/* <section>
        <aside>
          <nav>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </aside>
      </section> */}
    </header>
  );
};
Header.propTypes = {
  username: PropTypes.string.isRequired,
  hasNotification: PropTypes.bool,
  onClick: PropTypes.func,
};

// Header.defaultProps = {
//   user: null,
// };
