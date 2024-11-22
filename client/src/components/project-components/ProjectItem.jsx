import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "wouter";

import DotsTiel from "../../assets/icons/menu-tile.svg";
import useClickOutside from "../../hooks/useClickOutside";
import { deleteProject, setCurrentProject } from "../../reducers/projectSlice";
import ListItem from "../list-components/ListItem";

const ProjectItem = ({
  project,
  projects,
  setProjects,
  currentUser,
  setNewProjectName,
  setCoverImageUrl,
  setIsEditing,
  setIsAdding,
  setEditingProjectId,
  isChildMenuOpen,
  setIsModalOpen,
  setModalMessage,
  setShowBanner,
  setAlertTheme,
  setBannerMessage,
}) => {
  const [openProjectMenuId, setOpenProjectMenuId] = useState(null);

  const iconRef = useRef(null);
  const optionsRef = useRef(null);
  const dispatch = useDispatch();

  /**
   * Handles closing the project menu when clicking outside of it
   * @param {Event} event
   */
  useClickOutside([optionsRef, iconRef], () => setOpenProjectMenuId(null));

  /**
   *  Toggles the project menu(edit, delete)
   * @param {Event} e
   * @param {number} projectId
   */
  const toggleProjectMenu = (e, projectId) => {
    e.preventDefault();
    setOpenProjectMenuId((prev) => (prev === projectId ? null : projectId));
  };

  /**
   *
   * Sents all nessesary data to the form for editing
   * @param {Number} projectId
   */
  const handleProjectEdit = (e, projectId) => {
    e.preventDefault();
    const projectToEdit = projects.find((project) => project._id === projectId);

    dispatch(setCurrentProject(projectId));
    if (projectToEdit) {
      setIsEditing(true);
      setNewProjectName(project.name);
      setCoverImageUrl(project.coverImage);
      setIsAdding(true);
      setEditingProjectId(projectId);
      setOpenProjectMenuId(null);
    } else {
      console.error(`Project with ID ${projectId} not found.`);
    }
  };

  /**
   * Handles the deletion of a project
   *
   * @param {Event} e - The event object
   * @param {string} projectId - The ID of the project to delete
   */
  const handleProjectDelete = (e, projectId) => {
    e.preventDefault();
    // TODO: Fix confirmation and error handling
    if (project.createdByUserId === currentUser._id) {
      let confirmeText = `Are you sure you want to delete project ${project.name}`;
      if (confirm(confirmeText) === true) {
        dispatch(deleteProject(projectId));
        setProjects(projects.filter((project) => project._id !== projectId));
        const storedErrors =
          JSON.parse(sessionStorage.getItem("triggeredErrors")) || [];
        const updatedErrors = storedErrors.filter((id) => id !== projectId);
        sessionStorage.setItem(
          "triggeredErrors",
          JSON.stringify(updatedErrors),
        );
      } else {
        setOpenProjectMenuId(null);
        return;
      }
    } else {
      setModalMessage(
        `You do not have permission to delete this project! Contact the project creator ${project.createdBy} for more information.`,
      );
      setIsModalOpen(true);
    }
    setOpenProjectMenuId(null);
  };

  const triggerAlert = (theme, message) => {
    setAlertTheme(theme);
    setBannerMessage(message);
    setShowBanner(true);
  };

  const handleError = (e, projectName) => {
    e.target.src = "/src/assets/images/project3.jpg";
    const storedErrors =
      JSON.parse(sessionStorage.getItem("triggeredErrors")) || [];
    if (!storedErrors.includes(project._id)) {
      triggerAlert(
        "warning",
        `Image URL is not existant or not reachable! We applied our default cover image to project ${projectName}. You can always edit project and replace it with valid image url. 😉`,
      );
      storedErrors.push(project._id);
      sessionStorage.setItem("triggeredErrors", JSON.stringify(storedErrors));
    }
  };

  return (
    <div
      className={`${isChildMenuOpen ? "blur-sm" : ""} max-h-24 h-24 mb-4 `}
      key={project._id}
    >
      <div className="relative h-full">
        <img
          src={project.coverImage}
          onError={(e) => handleError(e, project.name)}
          alt={project.name}
          className="absolute -z-10 h-full w-full object-cover"
        />
        <div className="flex justify-between items-center h-full md:pl-[20%]">
          <Link
            href={`projects/${project._id}`}
            className="w-full flex justify-between"
          >
            <h1 className="relative z-10 text-white pl-4 tracking-widest flex items-center h-full drop-shadow-xl text-2xl md:text-center w-full">
              {project.name}
            </h1>
            <div className="w-10 h-full z-30 flex items-center mr-4">
              <button onClick={(e) => toggleProjectMenu(e, project._id)}>
                <img ref={iconRef} src={DotsTiel} alt="menu icon" />
              </button>
            </div>
          </Link>
          {openProjectMenuId === project._id && (
            <div
              ref={optionsRef}
              className="absolute right-10 top-14 py-6 rounded-lg shadow-lg bg-primaryHover z-50"
            >
              <div>
                <ul className="py-2  text-white text-lg">
                  <ListItem
                    text="Edit"
                    onClick={(e) => handleProjectEdit(e, project._id)}
                    className="hover:bg-primary w-full px-8"
                  />
                  <ListItem
                    text="Delete"
                    onClick={(e) => handleProjectDelete(e, project._id)}
                    className="hover:bg-primary w-full px-8"
                  />
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;

ProjectItem.propTypes = {
  project: PropTypes.object,
  projects: PropTypes.array,
  setProjects: PropTypes.func,
  currentUser: PropTypes.object,
  setNewProjectName: PropTypes.func,
  setCoverImageUrl: PropTypes.func,
  setIsEditing: PropTypes.func,
  setIsAdding: PropTypes.func,
  setEditingProjectId: PropTypes.func,
  isChildMenuOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  setModalMessage: PropTypes.func,
  setShowBanner: PropTypes.func,
  setAlertTheme: PropTypes.func,
  setBannerMessage: PropTypes.func,
};
