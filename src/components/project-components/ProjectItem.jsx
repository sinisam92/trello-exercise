import React, { useRef, useState } from "react";
import { Link } from "wouter";
import DotsTiel from "../../assets/icons/menu-tile.svg";
import useClickOutside from "../../hooks/useClickOutside";
import ListItem from "../list-components/ListItem";
import PropTypes from "prop-types";

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
}) => {
  const [openProjectMenuId, setOpenProjectMenuId] = useState(null);

  const iconRef = useRef(null);
  const optionsRef = useRef(null);

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
    const projectToEdit = projects.find((project) => project.id === projectId);
    if (projectToEdit) {
      setIsEditing(true);
      setNewProjectName(projectToEdit.name);
      setCoverImageUrl(projectToEdit.coverImage);
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
    const project = projects.find((project) => project.id === projectId);

    if (project.createdBy === currentUser.username) {
      let confirmeText = `Are you sure you want to delete project ${project.name}`;
      if (confirm(confirmeText) === true) {
        const deleteProject = (projectId) => {
          const updatedProjects = projects.filter(
            (project) => project.id !== projectId
          );
          setProjects(updatedProjects);
        };
        deleteProject(projectId);
      } else {
        setOpenProjectMenuId(null);
        return;
      }
    } else {
      setModalMessage(
        `You do not have permission to delete this project! Contact the project creator ${project.createdBy} for more information.`
      );
      setIsModalOpen(true);
    }
    setOpenProjectMenuId(null);
  };

  return (
    <div
      className={`${isChildMenuOpen ? "blur-sm" : ""} max-h-24 h-24 mb-4 `}
      key={project.id}
    >
      <Link href={`projects/${project.id}`}>
        <div className="relative h-full">
          <img
            src={project.coverImage}
            alt="cover image"
            className="absolute -z-10 h-full w-full object-cover"
          />
          <div className="flex justify-between items-center h-full md:pl-[20%]">
            <h1 className="relative z-10 text-white pl-4 tracking-widest flex items-center h-full drop-shadow-xl text-2xl md:text-center w-full">
              {project.name}
            </h1>
            <div className="w-10 h-full z-30 flex items-center mr-4">
              <button onClick={(e) => toggleProjectMenu(e, project.id)}>
                <img ref={iconRef} src={DotsTiel} alt="menu icon" />
              </button>
            </div>

            {openProjectMenuId === project.id && (
              <div
                ref={optionsRef}
                className="absolute right-10 top-14 py-6 rounded-lg shadow-lg bg-primaryHover z-50"
              >
                <div>
                  <ul className="py-2  text-white text-lg">
                    <ListItem
                      text="Edit"
                      onClick={(e) => handleProjectEdit(e, project.id)}
                      className="hover:bg-primary w-full px-8"
                    />
                    <ListItem
                      text="Delete"
                      onClick={(e) => handleProjectDelete(e, project.id)}
                      className="hover:bg-primary w-full px-8"
                    />
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>
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
};
