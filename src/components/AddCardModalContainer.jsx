import AddCardModal from "./AddCardModal";

const AddCardModalContainer = ({
  isOpen,
  onClose,
  users,
  list,
  projects,
  setProjects,
  projectId,
  selectedCard,
  isCardEditing,
  setIsCardEditing,
}) => {

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <AddCardModal 
          onClose={onClose}
          users={users}
          list={list}
          projects={projects}
          setProjects={setProjects}
          projectId={projectId}
          selectedCard={selectedCard}
          isCardEditing={isCardEditing}
          setIsCardEditing={setIsCardEditing}
        />
      </div>
    </div>
  );
};

export default AddCardModalContainer;
