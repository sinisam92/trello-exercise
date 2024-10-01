import React, { useState, useContext } from "react";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";
import AlertModal from "./AlertModal";
import { useSearch } from "../../contexts/SearchContext";
import useProjects from "../../hooks/useProjects";
import AddNewProject from "./AddNewProject";
import { UsersContext } from "../../contexts/UsersContext";
import PropTypes from "prop-types";

const Projects = ({ isChildMenuOpen }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const [_, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { searchTerm } = useSearch();
  const { projects, setProjects, addProject } = useProjects();
  const { currentUser } = useContext(UsersContext);

  const userProjects = projects.filter(
    (project) =>
      project.members.includes(currentUser.username) ||
      project.createdBy === currentUser.username
  );

  const filteredProjects = userProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col">
      <div className={`relative ${isChildMenuOpen ? "blur-sm" : ""}`}>
        {/* Hndles filtering of projects based on search term and then shows the projects */}
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            return (
              <ProjectItem
                key={project.id}
                project={project}
                projects={projects}
                setProjects={setProjects}
                currentUser={currentUser}
                setNewProjectName={setNewProjectName}
                setCoverImageUrl={setCoverImageUrl}
                setIsAdding={setIsAdding}
                isChildMenuOpen={isChildMenuOpen}
                setEditingProjectId={setEditingProjectId}
                setIsEditing={setIsEditing}
                setModalMessage={setModalMessage}
                setIsModalOpen={setIsModalOpen}
              />
            );
          })
        ) : (
          <div className="flex justify-center">
            <h3>No Project with this name!</h3>
          </div>
        )}
        <AlertModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Permission Denied"
          message={modalMessage}
        />
      </div>
      <AddNewProject isAdding={isAdding} setIsAdding={setIsAdding} />
      {isAdding && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center items-center bg-primaryHover px-20 py-10 rounded-lg">
          <ProjectForm
            projects={projects}
            setProjects={setProjects}
            addProject={addProject}
            setNewProjectName={setNewProjectName}
            setCoverImageUrl={setCoverImageUrl}
            newProjectName={newProjectName}
            coverImageUrl={coverImageUrl}
            currentProject
            editingProjectId={editingProjectId}
            setIsEditing={setIsEditing}
            isEditing={editingProjectId !== null}
            setIsAdding={setIsAdding}
            setEditingProjectId={setEditingProjectId}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;

Projects.propTypes = {
  isChildMenuOpen: PropTypes.bool,
};
