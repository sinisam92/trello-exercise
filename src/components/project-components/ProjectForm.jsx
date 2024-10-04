import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import PropTypes from "prop-types";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name} className="mt-4 w-full">
        {label}
      </label>
      <input
        className={`${meta.error ? "border border-red-600 focus:ring-danger" : null} border p-2  mt-1 rounded w-full placeholder:text-sm shadow-md appearance-none h-12 py-2 px-3 text-gray-700 leading-tight mb-2 focus:outline-none focus:shadow-outline`}
        id={props.id || props.name}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 mt-2 text-sm">{meta.error}</div>
      ) : null}
    </>
  );
};

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

  const { users, currentUser } = useSelector((state) => state.users);

  const formRef = useRef(null);

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

  const handleProjectAction = (values) => {
    if (isEditing) {
      handleSaveEditedProject(values);
    } else {
      addNewProject(values);
    }
  };
  /**
   * Handles the addition of a new project
   *
   */
  const addNewProject = (values) => {
    const { newProjectName, coverImageUrl } = values;

    if (projects.some((project) => project.name === newProjectName)) {
      setError("Project name already exists");
      return;
    }
    if (newProjectName == "") {
      setError("Project name cannot be empty");
      return;
    }
    if (newProjectName !== "") {
      let projectSlug = newProjectName.toLowerCase().replace(/\s/g, "-");
      const newProject = {
        id: uuidv4(),
        name: newProjectName,
        coverImage: coverImageUrl || "/src/assets/images/project3.jpg",
        lists: [dummyData],
        members: members,
        createdBy: currentUser.username,
        slug: projectSlug,
      };

      const updatedProjects = [...projects, newProject];
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      addProject(newProject);

      setIsAdding(false);
    }

    setCoverImageUrl("");
    setNewProjectName("");
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewProjectName("");
    setError("");
    setIsAdding(false);
  };

  /**
   * Handles the saving of the edited(updated) project
   *
   */
  const handleSaveEditedProject = (values) => {
    const { newProjectName, coverImageUrl } = values;

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
    }
    setIsEditing(false);
    setIsAdding(false);
    setNewProjectName("");
    setCoverImageUrl("");
  };

  const handleMemberChange = (selectedOptions) => {
    const updatedMembers = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setMembers(updatedMembers);
  };

  return (
    <div className="flex flex-col gap-y-2 justify-center">
      <Formik
        initialValues={{
          newProjectName: isEditing ? newProjectName : "",
          coverImageUrl: isEditing ? coverImageUrl : "",
        }}
        validationSchema={Yup.object({
          newProjectName: Yup.string().required("Required"),
          coverImageUrl: Yup.string().test(
            "is-valid-or-exact-match",
            "Cover image URL must match valid image URL or our default image URL",
            (value) => {
              return (
                Yup.string().url().isValidSync(value) ||
                value === "/src/assets/images/project3.jpg"
              );
            }
          ),
        })}
        onSubmit={handleProjectAction}
      >
        {({ handleSubmit, resetForm }) => (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TextInput
              label="Project Name"
              name="newProjectName"
              type="text"
              placeholder="Enter project name"
              className={`${error && "border border-red-500 focus:ring-danger"} border p-2  mt-1 rounded w-full placeholder:text-sm shadow-md appearance-none h-12 py-2 px-3 text-gray-700 leading-tight mb-2 focus:outline-none focus:shadow-outline`}
            />
            {error && <div className="text-danger mt-2 text-sm">{error}</div>}
            <TextInput
              label="Cover Image URL"
              name="coverImageUrl"
              type="text"
              placeholder="Enter image URL"
            />
            <label className="mt-2" htmlFor="members">
              Members
              <Select
                placeholder="Select members.."
                isMulti
                name="members"
                options={usersArray}
                onChange={handleMemberChange}
                className="basic-multi-select mb-4 w-full"
                classNamePrefix="select"
              />
            </label>
            <div className="flex justify-evenly gap-x-1">
              <button
                className="bg-success w-full text-white px-4 py-2 rounded"
                type="submit"
              >
                {isEditing ? "Save" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setIsEditing(false);
                  handleCancel();
                }}
                className="bg-danger w-full text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProjectForm;

ProjectForm.propTypes = {
  projects: PropTypes.array.isRequired,
  setProjects: PropTypes.func.isRequired,
  newProjectName: PropTypes.string.isRequired,
  setNewProjectName: PropTypes.func.isRequired,
  setCoverImageUrl: PropTypes.func.isRequired,
  coverImageUrl: PropTypes.string.isRequired,
  addProject: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  setIsAdding: PropTypes.func.isRequired,
  editingProjectId: PropTypes.string,
  setEditingProjectId: PropTypes.func.isRequired,
};

TextInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
