import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    return localStorage.getItem("animationsEnabled") === "true";
  });

  useEffect(() => {
    localStorage.setItem("animationsEnabled", animationsEnabled);
  }, [animationsEnabled]);

  return (
    <AnimationContext.Provider
      value={{ animationsEnabled, setAnimationsEnabled }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => useContext(AnimationContext);

AnimationProvider.propTypes = {
  children: PropTypes.node,
};
