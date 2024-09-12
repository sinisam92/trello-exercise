import { useState } from "react";
import presentationData from "../../data/presentationData";
import Plus from "../../assets/icons/plus.svg";
import ProjectForm from "../ProjectForm";
import ProjectItem from "../ProjectItem";
import AlertModal from "../AlertModal";
import { v4 as uuidv4 } from "uuid";
import { useSearch } from "../../contexts/SearchContext";

const Projects = ({ isChildMenuOpen }) => {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem("projects")) || presentationData
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [isAdding, setIsAdding] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [openProjectMenuId, setOpenProjectMenuId] = useState(null);
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { searchTerm } = useSearch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userProjects = projects.filter(
    (project) =>
      project.members && project.members.includes(currentUser.username)
  );
  const filteredProjects = userProjects.filter(
    (project) => project.name.toLowerCase().includes(searchTerm.toLowerCase()) // {{ edit_3 }}
  );

  const dummyData = {
    id: uuidv4(),
    name: "Testing",
    slug: "testing",
    cards: [
      {
        id: uuidv4(),
        title: "Planning Task 1",
        description: "Description of task 1",
        dueDate: "2024-09-22",
        assigned: [],
        status: "planning",
        tags: ["important", "critical"],
        comments: [],
      },
      {
        id: uuidv4(),
        title: "Planning Task 2",
        description: "Description of task 2",
        dueDate: "2024-02-23",
        assigned: [],
        status: "planning",
        tags: ["urgent", "feature"],
        comments: [],
      },
    ],
  };
  const handleProjectNameInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  const handleImageUrlInputChange = (event) => {
    setCoverImageUrl(event.target.value);
  };

  const handleMemberChange = (event) => {
    const selectedMembers = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const updatedMembers = Array.from(
      new Set([currentUser.username, ...selectedMembers])
    );

    setMembers(updatedMembers);
  };
  const addNewProject = () => {

    if (projects.some((project) => project.name === newProjectName)) {
      setError("Project name already exists");
      return;
    }
    if (newProjectName !== "") {
      const newProject = {
        id: uuidv4(),
        name: newProjectName,
        coverImage: coverImageUrl || "/src/assets/images/project3.jpg",
        lists: [dummyData],
        members: members,
        createdBy: currentUser.username,
        slug: newProjectName.toLowerCase().replace(/\s/g, "-"),
      };
      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setIsAdding(false);
    }
    setCoverImageUrl("");
    setNewProjectName("");
    setError("");
  };

  const handleCancel = () => {
    setNewProjectName("");
    setIsAdding(false);
    setError("");
  };

  const toggleProjectMenu = (e, projectId) => {
    e.preventDefault();
    setOpenProjectMenuId((prev) => (prev === projectId ? null : projectId));
  };

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

  const handleSaveEditedProject = (e) => {
    e.preventDefault();

    if (editingProjectId !== null) {
      const updatedProjects = projects.map((project) =>
        project.id === editingProjectId
          ? {
              ...project,
              name: newProjectName,
              coverImage: coverImageUrl || "/src/assets/images/project3.jpg",
              members: members,
            }
          : project
      );
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setEditingProjectId(null);
    } else {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        coverImage: coverImageUrl,
      };
      setProjects([...projects, newProject]);
      localStorage.setItem(
        "projects",
        JSON.stringify([...projects, newProject])
      );
    }
    setIsEditing(false);
    setIsAdding(false);
    setNewProjectName("");
    setCoverImageUrl("");
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
          localStorage.setItem("projects", JSON.stringify(updatedProjects));
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

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col">
      <div className={`relative ${isChildMenuOpen ? "blur-sm" : ""}`}>
        { filteredProjects.length > 0 ? (filteredProjects.map((project) => {
          return (
            <ProjectItem
              key={project.id}
              project={project}
              isChildMenuOpen={isChildMenuOpen}
              openProjectMenuId={openProjectMenuId}
              toggleProjectMenu={toggleProjectMenu}
              handleProjectEdit={handleProjectEdit}
              handleProjectDelete={handleProjectDelete}
              setOpenProjectMenuId={setOpenProjectMenuId}
            />
          );
        })) : (
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
      <div className="fixed bottom-32 right-10 z-40">
        <button
          onClick={() => setIsAdding((prevState) => !prevState)}
          className=" text-white p-3 rounded-full h-[100px] w-[100px] flex justify-center items-center bg-success"
        >
          <img
            src={Plus}
            alt="add project"
            className={`w-[50px] ${isAdding ? "rotate-45 duration-150 delay-100 ease-in " : "rotate-0 duration-150 delay-100 ease-in"}`}
          />
        </button>
      </div>
      {isAdding && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center items-center bg-primaryHover px-20 py-10 rounded-lg">
          <ProjectForm
            newProjectName={newProjectName}
            coverImageUrl={coverImageUrl}
            members={members}
            handleMemberChange={handleMemberChange}
            users={users}
            projects={projects}
            editingProjectId={editingProjectId}
            handleProjectNameInputChange={handleProjectNameInputChange}
            handleImageUrlInputChange={handleImageUrlInputChange}
            handleSaveEditedProject={handleSaveEditedProject}
            handleCancel={handleCancel}
            addNewProject={addNewProject}
            isEditing={editingProjectId !== null}
            error={error}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
