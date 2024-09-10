import { useState } from "react";
import Close from "../stories/assets/icons/close.svg";
import Info from "../stories/assets/icons/info.svg";
import Logout from "../stories/assets/icons/logout.svg";
import Settings from "../stories/assets/icons/settings.svg";
import Cards from "../stories/assets/icons/cards.svg";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "wouter";


const Sidebar = ({setIsChildMenuOpen, handleCloseSidebar, setIsMenuOpen }) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser ? currentUser.username : "Guest";
  const defaultAvatar = currentUser ? currentUser.defaultAvatar : "👤";
  const avatarUrl = currentUser ? currentUser.avatarUrl : "";
  const usernameForAt = username.toLowerCase().replace(" ", "-");
  const [location, navigate] = useLocation();

  const { logout } = useAuth();


  const openAvatarModal = () => {
    setIsAvatarModalOpen(true);
  };

  const closeAvatarModal = () => {
    setIsAvatarModalOpen(false);
    setNewAvatarUrl("");
  };

  const handleAvatarUrlChange = (e) => {
    setNewAvatarUrl(e.target.value);
  };

  const handleAvatarSubmit = (userId) => {
    if (currentUser && currentUser.id === userId) {
      const updatedUser = { ...currentUser, avatarUrl: newAvatarUrl };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) =>
        user.id === userId ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      closeAvatarModal();
    } else {
      console.error("You can only change your own avatar.");
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    setIsChildMenuOpen(false);
    logout();
    navigate("/login");
  };

  const handleLinkClick = (path) => {
    handleCloseSidebar();
    navigate(path);
  };

  return (
    <aside className="">
      <div className="bg-[#2A9D8F] pb-5">
        <div className="flex justify-between pt-11 px-1 items-start ">
          <div className="pb-[22px]">
            {avatarUrl ? (
              <button onClick={openAvatarModal}>
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="rounded-full w-20 h-20 object-cover "
                />
              </button>
            ) : (
              <div
                className="bg-[#F4A261] rounded-full w-20 h-20 flex items-center justify-center"
                onClick={openAvatarModal}
              >
                <span className="text-white text-4xl font-bold">
                  {defaultAvatar}
                </span>
              </div>
            )}

            {isAvatarModalOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Change Avatar</h2>
                  <input
                    type="text"
                    value={newAvatarUrl}
                    onChange={handleAvatarUrlChange}
                    placeholder="Enter new avatar URL"
                    className="border p-2 w-full mb-4"
                  />
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleAvatarSubmit(currentUser.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={closeAvatarModal}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
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
  );
};

export default Sidebar;
