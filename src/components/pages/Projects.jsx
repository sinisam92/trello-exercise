import React from "react";
import presentationData from "../../data/presentationData";
import { Link } from "wouter";
import { useAuth } from "../../contexts/AuthContext";

const Projects = () => {
  const {logout} = useAuth();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      {presentationData.map((project) => {
        return (
          <div key={project.id} className="max-h-20 h-20">
            <Link href={`projects/${project.id}`}>
              <div className="relative h-full">
                <img
                  src={project.coverImage}
                  alt="cover image"
                  className="absolute -z-10 h-full w-full object-cover filter blur-[1px]"
                />
                <h1 className="relative z-10 text-white text-xl pl-4 tracking-widest flex items-center h-full">
                  {project.name}
                </h1>
              </div>
            </Link>
          </div>
        );
      })}
      {/* <Header username={currentUser.username} />  */}
      <h2>Hello,{currentUser.username} </h2>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Projects;
