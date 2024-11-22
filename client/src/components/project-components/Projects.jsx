import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { useSearch } from "../../contexts/SearchContext";
import Banner from "../common/Banner";
import AddNewProject from "./AddNewProject";
import AlertModal from "./AlertModal";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";

const Projects = ({ isChildMenuOpen }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [showBanner, setShowBanner] = useState(false);
  const [alertTheme, setAlertTheme] = useState("");
  const [bannerMessage, setBannerMessage] = useState("");
  const [allCurrentUsersProjects, setAllCurrentUsersProjects] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { searchTerm } = useSearch();

  const currentUser = useSelector((state) => state.auth.user);
  const currentProjects = useSelector((state) => state.projects.projects);

  useEffect(() => {
    if (!currentUser) {
      setAllCurrentUsersProjects([]);
      return;
    }

    const uniqueProjects = new Map();
    currentUser.createdProjects.forEach((project) => {
      uniqueProjects.set(project._id, project);
    });

    currentUser.memberProjects.forEach((project) => {
      uniqueProjects.set(project._id, project);
    });

    setAllCurrentUsersProjects(Array.from(uniqueProjects.values()));
  }, [currentUser]);

  const filteredProjects = useMemo(() => {
    return allCurrentUsersProjects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [allCurrentUsersProjects, searchTerm]);

  useEffect(() => {
    if (showBanner) {
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showBanner]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const bannerContainer = {
    show: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeIn",
      },
    },
    hidden: {
      opacity: 0,
      x: 200,
    },
    onExit: {
      x: 200,
      opacity: 0,
      transition: { ease: "easeOut", duration: 0.4 },
    },
  };

  return (
    <div className="relative flex flex-col">
      <div className={`relative ${isChildMenuOpen ? "blur-sm" : ""}`}>
        {/* Hndles filtering of projects based on search term and then shows the projects */}
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => {
            return (
              <ProjectItem
                key={project._id}
                project={project}
                projects={filteredProjects}
                setProjects={setAllCurrentUsersProjects}
                currentUser={currentUser}
                setNewProjectName={setNewProjectName}
                setCoverImageUrl={setCoverImageUrl}
                setIsAdding={setIsAdding}
                isChildMenuOpen={isChildMenuOpen}
                setEditingProjectId={setEditingProjectId}
                setIsEditing={setIsEditing}
                setModalMessage={setModalMessage}
                setIsModalOpen={setIsModalOpen}
                setShowBanner={setShowBanner}
                setAlertTheme={setAlertTheme}
                setBannerMessage={setBannerMessage}
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
      <AddNewProject
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        setIsEditing={setIsEditing}
      />
      {isAdding && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center items-center bg-primaryHover px-20 py-10 rounded-lg">
          <ProjectForm
            project={currentProjects}
            projects={allCurrentUsersProjects}
            setProjects={setAllCurrentUsersProjects}
            setNewProjectName={setNewProjectName}
            setCoverImageUrl={setCoverImageUrl}
            newProjectName={newProjectName}
            coverImageUrl={coverImageUrl}
            currentProject
            editingProjectId={editingProjectId}
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            setIsAdding={setIsAdding}
            setEditingProjectId={setEditingProjectId}
          />
        </div>
      )}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            variants={bannerContainer}
            initial="hidden"
            animate="show"
            exit="onExit"
            className="absolute -top-24 right-5 z-50 max-w-[350px]"
          >
            <Banner theme={alertTheme}>{bannerMessage}</Banner>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;

Projects.propTypes = {
  isChildMenuOpen: PropTypes.bool,
};
