import { useRef, useEffect } from "react";
import { Link } from "wouter";
import DotsTiel from "../assets/icons/menu-tile.svg";

const ProjectItem = ({
  project,
  isChildMenuOpen,
  openProjectMenuId,
  toggleProjectMenu,
  handleProjectEdit,
  handleProjectDelete,
  setOpenProjectMenuId,
}) => {
  const iconRef = useRef(null);
  const optionsRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target) &&
      iconRef.current &&
      !iconRef.current.contains(event.target)
    ) {
      setOpenProjectMenuId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${isChildMenuOpen ? "blur-sm" : ""} max-h-24 h-24 mt-4`}
      key={project.id}
    >
      <Link href={`projects/${project.id}`}>
        <div className="relative h-full">
          <img
            src={project.coverImage}
            alt="cover image"
            className="absolute -z-10 h-full w-full object-cover"
          />
          <div className="flex justify-between items-center h-full">
            <h1 className="relative z-10 text-white pl-4 tracking-widest flex items-center h-full drop-shadow-xl text-2xl">
              {project.name}
            </h1>
            <div className="w-10 h-full z-30 flex items-center">
              <button onClick={(e) => toggleProjectMenu(e, project.id)}>
                <img
                  ref={iconRef}
                  src={DotsTiel}
                  alt="menu icon"
                />
              </button>
            </div>

            {openProjectMenuId === project.id && (
              <div
                ref={optionsRef}
                className="absolute right-10 top-14 px-8 py-6 rounded-lg shadow-lg bg-primaryHover z-40"
              >
                <div>
                  <ul className="py-2 px-2 text-white text-lg">
                    <li>
                      <button
                        onClick={(e) => handleProjectEdit(e, project.id)}
                        className="text-white"
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={(e) => handleProjectDelete(e, project.id)}
                        className="text-danger"
                      >
                        Delete
                      </button>
                    </li>
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
