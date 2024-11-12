import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const AnimationContext = createContext();

const AnimationProvider = ({ children }) => {
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

const useAnimation = () => useContext(AnimationContext);

export { AnimationProvider, useAnimation };

AnimationProvider.propTypes = {
  children: PropTypes.node,
};
