import { Form, Formik, useField } from "formik";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import { createNewProject, updateProject } from "../../reducers/projectSlice";

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
  isEditing,
  setIsEditing,
  setIsAdding,
  editingProjectId,
  setEditingProjectId,
}) => {
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  // const currentProject = useSelector((state) =>
  //   state.projects.projects.find((project) => project.id === editingProjectId),
  // );
  const { currentProject } = useSelector((state) => state.projects);

  useEffect(() => {
    if (currentProject) {
      setNewProjectName(currentProject.name);
      setCoverImageUrl(currentProject.coverImage);
      setMembers(currentProject.members);
    }
  }, [currentProject, setNewProjectName, setCoverImageUrl]);

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
        _id: uuidv4(),
        name: newProjectName,
        coverImage: coverImageUrl || "/src/assets/images/project3.jpg",
        lists: [],
        members: members,
        createdByUserId: user._id,
        slug: projectSlug,
      };
      dispatch(createNewProject(newProject));
      setProjects([...projects, newProject]);
      setIsAdding(false);
    }

    setCoverImageUrl("");
    setNewProjectName("");
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewProjectName("");
    setCoverImageUrl("");
    setError("");
    setIsAdding(false);
  };

  /**
   * Handles the saving of the edited(updated) project
   *
   */
  const handleSaveEditedProject = (values) => {
    const { newProjectName, coverImageUrl } = values;

    if (editingProjectId && currentProject) {
      let projectSlug = newProjectName.toLowerCase().replace(/\s/g, "-");

      const updatedProject = {
        ...currentProject,
        name: newProjectName,
        slug: projectSlug,
        coverImage: coverImageUrl || "/src/assets/images/project3.jpg",
      };

      if (JSON.stringify(currentProject.members) !== JSON.stringify(members)) {
        updatedProject.members = members;
      }

      // if (user._id == updatedProject.createdByUserId) {
      dispatch(updateProject(updatedProject));

      // const updatedProjects = projects.map((project) =>
      //   project._id === editingProjectId ? updatedProject : project,
      // );
      // setProjects(updatedProjects);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project,
        ),
      );
      // } else {
      //   setError("You do not have permission to edit this project");
      //   return;
      // }

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

  // if (!currentProject) {
  //   return <div>Loading project...</div>;
  // }
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
            },
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
