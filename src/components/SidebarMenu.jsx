import Cards from "../assets/icons/cards.svg";
import Settings from "../assets/icons/settings.svg";
import Info from "../assets/icons/info.svg";
import Logout from "../assets/icons/logout.svg";
import { useLocation } from "wouter";



const SidebarMenu = ({ currentUser, handleLogout, handleCloseSidebar }) => {

    const [location, navigate] = useLocation();

    const sidebarItems = [
        { id: 1, icon: Cards, text: "My Cards", path: `/user/${currentUser.id}/cards` },
        { id: 2, icon: Settings, text: "Settings", path: "/settings" },
        { id: 3, icon: Info, text: "Info", path: "/info"},
        { id: 4, icon: Logout, text: "Logout", path: "/logout" },
     ];


     const handleLinkClick = (path) => {
        handleCloseSidebar();
        navigate(path);
      };
    

    return (
      <ul className="flex flex-col gap-y-2">
        {sidebarItems.map((item) => (
          <li key={item.id}>
            <button onClick={item.text === "Logout" ? handleLogout : () => handleLinkClick(item.path)}>
              <div className="flex items-center gap-x-2">
                <img src={item.icon} alt={item.text} />
                <span>{item.text}</span>
              </div>
            </button>
          </li>
        ))}
    
      </ul>
    );
  };
  
  export default SidebarMenu;
  