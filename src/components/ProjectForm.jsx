import { v4 as uuidv4 } from "uuid";
import { useState, useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";
import Select from 'react-select';


const ProjectForm = ({
  projects,
  setProjects,
  newProjectName,
  setNewProjectName,
  setCoverImageUrl,
  coverImageUrl,
  addProject,
  isEditing,
  setIsEditing,
  setIsAdding,
  editingProjectId,
  setEditingProjectId,
}) => {
  
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);

  const { users, currentUser } = useContext(UsersContext);

  /**
   *  Dummy data when new list is added
   */
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

  const usersArray = users.map((user) => ({
    value: user.username,
    label: user.username,
  }));

  /**
   * Handles the addition of a new project
   *
   */
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
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      // setProjects(updatedProjects);
      addProject(newProject);

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

  /**
   * Handles the saving of the edited(updated) project
   *
   */
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
   * Handles the input change for the project name
   *
   */
  const handleProjectNameInputChange = (event) => {
    setNewProjectName(event.target.value);
  };

  /**
   * Handles the input change for the image URL
   *
   */
  const handleImageUrlInputChange = (event) => {
    setCoverImageUrl(event.target.value);
  };

  /**
   * Handles the change in the members of the project
   *
   */

  const handleMemberChange = (selectedOptions) => {
    const updatedMembers = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setMembers(updatedMembers);
  };

  return (
    <div className=" flex flex-col gap-y-2 justify-center">
      <input
        type="text"
        value={newProjectName}
        onChange={handleProjectNameInputChange}
        placeholder="Enter project name"
        className={`border p-2 rounded placeholder:text-sm ${error ? "border-danger" : ""}`}
        required
      />
      {error && <div className="text-danger">{error}</div>}

      <input
        type="text"
        value={coverImageUrl}
        onChange={handleImageUrlInputChange}
        placeholder="Cover image(optional)"
        className="border p-2 rounded placeholder:text-sm"
      />
      
      <Select
    placeholder="Select members.."
    isMulti
    name="members"
    options={usersArray}
    onChange={handleMemberChange}
    className="basic-multi-select"
    classNamePrefix="select"
  />

      <button
        onClick={isEditing ? handleSaveEditedProject : addNewProject}
        className="bg-success text-white px-4 py-2 rounded"
      >
        {isEditing ? "Save" : "Add"}
      </button>
      <button
        onClick={handleCancel}
        className="bg-danger text-white px-4 py-2 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default ProjectForm;
