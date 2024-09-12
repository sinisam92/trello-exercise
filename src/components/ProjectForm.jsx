const ProjectForm = ({
  newProjectName,
  coverImageUrl,
  handleProjectNameInputChange,
  handleImageUrlInputChange,
  handleSaveEditedProject,
  handleCancel,
  isEditing,
  addNewProject,
  error,
  members,
  projects,
  editingProjectId,
  users,
  handleMemberChange,
}) => {
  const currentProject = projects.find(
    (project) => project.id === editingProjectId
  );

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
      <select
        multiple
        value={members}
        onChange={handleMemberChange}
        className="border p-2 rounded"
      >
        {users
          // .filter((user) => user.username !== currentProject.createdBy)
          .map((user) => (
            <option key={user.id} value={user.username}>
              {user.username}
            </option>
          ))}
      </select>

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
