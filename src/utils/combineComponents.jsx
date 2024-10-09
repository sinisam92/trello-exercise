import PropTypes from "prop-types";
import React from "react";

const combineComponents = (...components) => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      const CombinedComponent = ({ children }) => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };

      CombinedComponent.propTypes = { children: PropTypes.node };
      return CombinedComponent;
    },
    ({ children }) => <>{children}</>,
  );
};

export default combineComponents;

combineComponents.propTypes = {
  components: PropTypes.arrayOf(PropTypes.element),
};
