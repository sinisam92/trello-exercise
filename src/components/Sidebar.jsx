import { useContext, useState } from "react";
import Close from "../assets/icons/close.svg";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "wouter";
import ListItem from "./ListItem";
import SidebarMenu from "./SidebarMenu";
import { UsersContext } from "../contexts/UsersContext";
import Avatar from "./Avatar";

const Sidebar = ({ setIsChildMenuOpen, handleCloseSidebar, setIsMenuOpen }) => {
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  const { users, setUsers, currentUser } = useContext(UsersContext);

  const username = currentUser && currentUser.username;
  const defaultAvatar = currentUser && currentUser.defaultAvatar;
  const avatarUrl = currentUser ? currentUser.avatarUrl : "";
  const usernameForAt = username.toLowerCase().replace(" ", "-");
  const [_, navigate] = useLocation();

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

      const updatedUsers = users.map((user) =>
        user.id === userId ? updatedUser : user
      );
      setUsers(updatedUsers);
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

  return (
    <aside className="">
      <div className="bg-[#2A9D8F] pb-5">
        <div className="flex justify-between pt-11 px-1 items-start ">
          <div className="pb-[22px]">
            <Avatar
              avatarUrl={avatarUrl}
              username={username}
              defaultAvatar={defaultAvatar}
              onClick={openAvatarModal}
              size={20}
            />

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
                  <ul className="flex justify-end gap-4">
                    <ListItem
                      text="Save"
                      onClick={() => handleAvatarSubmit(currentUser.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    />
                    <ListItem
                      text="Cancel"
                      onClick={closeAvatarModal}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    />
                  </ul>
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
        <SidebarMenu
          currentUser={currentUser}
          handleLogout={handleLogout}
          handleCloseSidebar={handleCloseSidebar}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
